"use client";
import { useState, useEffect,useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  PatientType,
  PatientFileTypeT,
  PatientFileType,
} from "@/types/api/patient";
import { MotionUI } from "@/components/ui/motion";
import { AppointmentDisplayType } from "@/types/api/appointment";

interface Doctor {
  _id: number;
  id: number;
  name: string;
  specialty: string;
}

const timeSlots = ["8am-10am", "11am-12pm", "1pm-3pm", "3pm-5pm"];

export default function PatientDashboard() {
  const { user,  isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      _id: 0,
      id: 1,
      name: "",
      specialty: "",
    },
  ]);
  const [userId, setUserId] = useState<string>();

  const [appointments, setAppointments] = useState<AppointmentDisplayType[]>([]);
  const [patientData, setPatientData] = useState<PatientType>({
    id: 0,
    name: "",
    age: 35,
    bloodGroup: "O+",
    medicalHistory: "Hypertension, Diabetes",
    files: [],
    authorizedPersons: [],
  });
  const [files, setFiles] = useState<PatientFileTypeT[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Update patient data with the user's full name when available
  useEffect(() => {
    if (user?.fullName) {
      setPatientData((prevData) => ({
        ...prevData,
        name: String(user.fullName),
      }));
    }
  }, [user]);

  // Fetch patient data from the API
  useEffect(() => {
    setDoctors([]);
    const fetchPatientData = async (userId: number) => {
      try {
        setLoading(true);

        const [patientRes, doctorRes, fileRes, appointment1Res, appointment2Res] = await Promise.all([
          fetch("/api/patient/fetch", {
            method: "POST",
            body: JSON.stringify({ patientId: userId, accessorId: userId }),
          }),
          fetch("/api/mongo/doctor"),
          fetch("/api/patient/file/fetch", {
            method: "POST",
            body: JSON.stringify({ patientId: userId, accessorId: userId }),
          }),
          fetch("/api/patient/appointment", {
            method: "POST",
            body: JSON.stringify({ patientId: userId })
          }),
          fetch("/api/mongo/appointment"),
        ]);

        if (!patientRes.ok || !doctorRes.ok || !fileRes.ok || !appointment1Res.ok || !appointment2Res.ok) {
          throw new Error("Failed to fetch patient data");
        }

        const [patientData, doctorData, fileData, appointment1Data, appointment2Data] = await Promise.all([
          patientRes.json(),
          doctorRes.json(),
          fileRes.json(),
          appointment1Res.json(),
          appointment2Res.json(),
        ]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ids = appointment1Data.appointments.map((item: any) => ({ id: item.id }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const appointment = appointment2Data.map((item: any, index: number) => ({ ...item, ...ids[index] }));
        setPatientData(patientData.data);
        setDoctors(doctorData);
        const filesData = fileData.data.map((file: PatientFileType) => ({
          ...file,
          url: `/api/files?filename=${file.fileName}&id=${userId}`,
        }));
        setAppointments(appointment)
        setFiles(filesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user?.unsafeMetadata?.clientId) {
      const userID = String(user.unsafeMetadata.clientId);
      setUserId(userID);
      fetchPatientData(Number(userID));
    }
  }, [isLoaded, user]);

  // Handle File Uploads
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !userId) return;

    const file = e.target.files[0]; // Only select the first file
    if (!file) return;

    // Create a temporary file entry
    const tempFile = {
      fileName: file.name,
      filePath: file.name, // Placeholder, will be updated after upload
      timestamp: new Date().toISOString(),
      fileType: file.type,
      fileHash: "",
      localFile: file,
      url: `/api/files?filename=${file.name}&id=${userId}`,
    };

    // Update state with the new file
    setFiles((prevFiles) => [...prevFiles, tempFile]);

    console.log("Uploading file:", file.name);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientId", String(userId));
    formData.append("accessorId", String(userId));
    formData.append("fileName", file.name);
    formData.append("fileType", file.type);

    try {
      const response = await fetch("/api/patient/file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();

      // Update the uploaded file's filePath
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.fileName === file.name ? { ...f, filePath: String(data.filePath) } : f
        )
      );

      console.log("Uploaded file:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // File Deletion Function
  const handleFileDelete = async (index: number) => {
    const payload = {
      patientId: userId,
      fileIndex: index,
      filePath: files[index].filePath,
      accessorId: userId,
    };
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    try {
      const response = await fetch("/api/patient/file/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      console.log("File deleted");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleCancel = async (id: number) => {
    const newAppointments = appointments.map((appointment) => {
      if (appointment.id == id) {
        appointment.status = "Cancelled";
        return appointment
      }
      return appointment
    })
    setAppointments(newAppointments)
    
    const updateAppointments = appointments.filter((appointment) => appointment.id == id)
    try {
      const response1 = await fetch("/api/appointment/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: id }),
      });
      
      if (!response1.ok) {
        throw new Error("Failed to cancel appointment");
      }
      const response2 = await fetch("/api/mongo/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updateAppointments }),
      });
      
      if (!response2.ok) {
        throw new Error("Failed to cancel appointment");
      }
      console.log("Cancel appointment");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  const handleConfirmBooking = useCallback(async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      return alert("Please select a doctor, date, and time slot.");
    }
  
    if (!userId) {
      return alert("Invalid user ID. Please log in.");
    }
  
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDateObj.setHours(0, 0, 0, 0);
  
    if (selectedDateObj <= today) {
      return alert("Invalid date. Please select a future date.");
    }
  
    if (selectedDateObj.getDay() === 0) {
      return alert("Appointments cannot be scheduled on Sundays.");
    }
  
    const appointmentData = {
      patientId: Number(userId),
      doctorName: selectedDoctor.name,
      patientName: patientData.name,
      doctorId: selectedDoctor.id,
      timeSlots: selectedTime,
      dayOfWeek: selectedDateObj.getDay() - 1,
      date: selectedDate,
      status: "Scheduled",
      _id: "0" // Default value
    };
  
    try {
      const [res1, res2] = await Promise.all([
        fetch("/api/appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentData),
        }),
        fetch("/api/mongo/appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentData),
        }),
      ]);
      if (!res1.ok || !res2.ok) throw new Error("Booking failed.");
  
      const data = await res1.json();
  
      const newAppointment = {
        ...appointmentData,
        id: Number(data.id), // Assign the returned ID from the response
      };
  
      setAppointments((prev) => [...prev, newAppointment]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred. Please try again later.");
    }
  }, [selectedDoctor, selectedDate, selectedTime, userId]);
  

  return (
    <div className="flex min-h-screen flex-col items-center bg-primary p-8">
      <div className="w-full max-w-screen-lg space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-3xl font-bold text-highlight2"
        >
          Welcome, {user?.firstName}!
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Patient Information */}
          <div className="rounded-lg border-l-4 border-highlight2 bg-highlight1 p-6 shadow-xl">
            <h2 className="mb-4 text-2xl font-semibold text-highlight2">
              Your Information
            </h2>
            <p className="text-highlight2">
              <strong>Name:</strong>{" "}
              <span className={loading ? "animate-pulse blur-[2px]" : ""}>
                {patientData.name}
              </span>
            </p>
            <p className="text-highlight2">
              <strong>Age:</strong>{" "}
              <span className={loading ? "animate-pulse blur-[2px]" : ""}>
                {patientData.age}
              </span>
            </p>
            <p className="text-highlight2">
              <strong>Blood Group:</strong>{" "}
              <span className={loading ? "animate-pulse blur-[2px]" : ""}>
                {patientData.bloodGroup}
              </span>
            </p>
            <p className="text-highlight2">
              <strong>Medical History:</strong>{" "}
              <span className={loading ? "animate-pulse blur-[2px]" : ""}>
                {patientData.medicalHistory}
              </span>
            </p>
          </div>

          {/* Doctors List */}
          <div className="rounded-lg border-l-4 border-highlight2 bg-highlight1 p-6 shadow-xl">
            <h2 className="mb-4 text-2xl font-semibold text-highlight2">
              Available Doctors
            </h2>
            <div className="max-h-[13.5rem] space-y-3 overflow-y-auto">
              {loading ? (
                // Skeleton loader while fetching data
                <ul className="divide-y divide-gray-300">
                  {Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <li key={index} className="py-3 animate-pulse">
                        <div className="h-4 w-3/4 bg-gray-300 rounded-md"></div>
                        <div className="mt-2 h-3 w-1/2 bg-gray-300 rounded-md"></div>
                      </li>
                    ))}
                </ul>
              ) : doctors.length > 0 ? (
                // Render doctors if available
                <ul className="divide-y divide-gray-300">
                  {doctors.map((doctor) => (
                    <li
                      key={doctor.id}
                      className="py-3 cursor-pointer hover:bg-gray-100 transition rounded-md p-2"
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setIsModalOpen(true);
                      }}
                    >
                      <h3 className="text-lg font-medium text-highlight2">{doctor.name}</h3>
                      <p className="text-sm text-gray-500">{doctor.specialty}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                // Fallback when no doctors are found
                <p className="text-center text-gray-500">No doctors available</p>
              )}
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="rounded-lg border-l-4 border-highlight2 bg-highlight1 p-6 shadow-xl">
          <h2 className="mb-4 text-2xl font-semibold text-highlight2">
            Your Appointments
          </h2>
          <div className="max-h-[13.5rem] space-y-3 overflow-y-auto">
            {loading ? (
              // Skeleton loader while fetching data
              <ul className="divide-y divide-gray-300">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <li key={index} className="py-3 animate-pulse">
                      <div className="h-4 w-3/4 bg-gray-300 rounded-md"></div>
                      <div className="mt-2 h-3 w-1/2 bg-gray-300 rounded-md"></div>
                      <div className="mt-2 h-3 w-1/3 bg-gray-300 rounded-md"></div>
                    </li>
                  ))}
              </ul>
            ) : appointments.length > 0 ? (
              // Render appointments if available
              <ul className="divide-y divide-gray-300">
                {appointments.map((appointment) => (
                  <li
                    key={appointment._id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-highlight2">
                        Doctor: Dr. {appointment.doctorName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Date: {appointment.date} | Time: {appointment.timeSlots}
                      </p>
                      <p className="text-sm font-semibold text-blue-600">
                        Status: {appointment.status}
                      </p>
                    </div>
                    {appointment.status !== "Cancelled" ? 
                      <button
                        className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                        onClick={() => handleCancel(Number(appointment.id))}
                      >
                        Cancel
                      </button> : ""
                    }
                  </li>
                ))}
              </ul>
            ) : (
              // Fallback when no appointments are found
              <p className="text-center text-gray-500">No appointments available</p>
            )}
          </div>
        </div>

        {isModalOpen && selectedDoctor && (
          <MotionUI
            Tag="div"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MotionUI
              Tag="div"
              className="w-[350px] rounded-lg bg-primary p-6 shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-secondary">
                Book Appointment
              </h2>
              <p className="text-sm text-highlight2">
                {selectedDoctor.name}{" "}
                <span className="text-xs">({selectedDoctor.specialty})</span>
              </p>

              <label className="mt-4 block text-sm font-medium text-card">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-md p-2 text-highlight2 bg-primary focus:outline-none"
                min={new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0]}
              />

              <label className="mt-4 block text-sm font-medium text-card">
                Select Time Slot
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full rounded-md p-2 text-highlight2 bg-primary focus:outline-none"
              >
                <option value="">Choose a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="transition-500 rounded-md bg-gray-400 px-4 py-2 text-primary hover:bg-black"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="transition-500 rounded-md bg-secondary px-4 py-2 text-primary hover:bg-highlight2"
                >
                  Confirm
                </button>
              </div>
            </MotionUI>
          </MotionUI>
        )}

        {/* File Upload Section */}
        <div className="rounded-lg border-l-4 border-highlight2 bg-highlight1 p-6 shadow-xl">
          <h2 className="mb-4 text-2xl font-semibold text-highlight2">
            Upload Medical Files
          </h2>
          <label className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-dashed bg-secondary p-4 text-primary hover:bg-opacity-75">
            <input
              type="file"
              accept=".pdf, .png, .jpg, .jpeg"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="text-sm">Click or drag files to upload</span>
          </label>
          <h3 className="mt-4 text-lg font-medium text-highlight2">
            Uploaded Files:
          </h3>
          {files.length === 0 ? (
            <p className="text-sm text-gray-400">No files uploaded.</p>
          ) : (
            <ul className="mt-2 space-y-3">
              {files.map((file, index) => {
                const isImage = file.fileType.startsWith("image");
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between rounded-lg bg-secondary p-3 shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      {isImage && (
                        <Image
                          src={file.url}
                          alt="Preview"
                          className="h-10 w-10 rounded-md object-cover"
                          width={100}
                          height={100}
                        />
                      )}
                      <span className="text-sm text-primary">
                        {file.fileName}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-500 text-sm text-highlight2 hover:text-highlight1"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleFileDelete(index)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
