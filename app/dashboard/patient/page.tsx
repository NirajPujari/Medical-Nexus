/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useCallback } from "react";
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
import { batchApiRequests } from "@/utils/api";
import { Loader2 } from "lucide-react";

interface Doctor {
  _id: number;
  id: number;
  name: string;
  specialty: string;
}

const timeSlots = ["8am-10am", "11am-12pm", "1pm-3pm", "3pm-5pm"];

export default function PatientDashboard() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState({ appointmentC: false, appointmentP: false, file: false, });
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
      setLoading(true);

      try {
        const userPayload = JSON.stringify({ patientId: userId, accessorId: userId });

        const responses = await batchApiRequests([
          {
            url: "/api/patient/fetch",
            method: "POST",
            data: userPayload,
          },
          {
            url: "/api/mongo/doctor",
            method: "GET"
          },
          {
            url: "/api/patient/appointment",
            method: "POST",
            data: JSON.stringify({ patientId: userId }),
          },
          {
            url: "/api/mongo/appointment",
            method: "GET"
          },
          {
            url: "/api/patient/file/fetch",
            method: "POST",
            data: userPayload,
          },
        ]);

        // Extract responses safely
        const patientData = responses[0]?.data;
        if (patientData) setPatientData(patientData.data);

        const doctorData = responses[1]?.data || [];
        setDoctors(doctorData);

        const appointment1Data = responses[2]?.data || { appointments: [] };
        const appointment2Data = responses[3]?.data || [];

        const ids = appointment1Data.appointments.map((item: any) => ({ id: item.id }));
        const appointments = appointment2Data.map((item: any, index: number) => ({
          ...item,
          ...ids[index],
        }));

        setAppointments(appointments.reverse());

        const fileData = responses[4]?.data.data || [];
        const filesData = fileData.map((file: PatientFileType) => ({
          ...file,
          url: `/api/files?filename=${file.fileName}&id=${userId}`,
        }));

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
    setSubmit({ ...submit, file: true })
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
    } finally {
      setSubmit({ ...submit, file: false })
    }
  };

  // File Deletion Function
  const handleFileDelete = async (index: number) => {
    setSubmit({ ...submit, file: true })
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
    } finally {
      setSubmit({ ...submit, file: false })
    }
  };

  const handleCancel = async (id: number) => {
    setSubmit({ ...submit, appointmentC: true })
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
    } finally {
      setSubmit({ ...submit, appointmentC: false })
    }
  }

  const handleConfirmBooking = useCallback(async () => {
    setSubmit({ ...submit, appointmentP: true });
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
          body: JSON.stringify(appointmentData),
        }),
        fetch("/api/mongo/appointment", {
          method: "POST",
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
      // alert("An error occurred. Please try again later.");
    } finally {
      setSubmit({ ...submit, appointmentP: true })
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
                <ul className="divide-y divide-gray-300 space-y-2">
                  {doctors.map((doctor) => (
                    <li
                      key={doctor.id}
                      className="py-3 cursor-pointer hover:bg-primary transition rounded-md p-2"
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setIsModalOpen(true);
                      }}
                    >
                      <h3 className="text-lg font-medium text-highlight2">{doctor.name}</h3>
                      <p className="text-sm text-card">{doctor.specialty}</p>
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
                      <p className="text-sm text-card">
                        Date: {appointment.date} | Time: {appointment.timeSlots}
                      </p>
                      <p className="text-sm font-semibold text-blue-600">
                        Status: {appointment.status}
                      </p>
                    </div>
                    {appointment.status !== "Cancelled" ?
                      <button
                        className={`transition-500 font-semibold text-sm px-4 py-2 ${!submit.appointmentC ? "bg-red-700 text-primary hover:text-red-800 hover:bg-primary" : "bg-primary text-red-700"} rounded-2xl  `}
                        disabled={submit.appointmentC}
                        onClick={() => handleCancel(Number(appointment.id))}
                      >
                        {!submit.appointmentC ? "Cancel" : <Loader2 className="animate-spin" />}
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
            <p className="text-sm text-primary">No files uploaded.</p>
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
                    className="flex items-center justify-between rounded-lg bg-highlight1 p-3 shadow-md"
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
                      <span className="text-md font-semibold text-card">
                        {file.fileName.charAt(0).toUpperCase() + file.fileName.substr(1).toLowerCase()}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-500 font-semibold px-4 py-2 bg-secondary rounded-2xl text-sm text-primary hover:text-highlight2 hover:bg-primary"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleFileDelete(index)}
                        disabled={submit.file}
                        className={`transition-500 font-semibold text-sm px-4 py-2 ${!submit.file ? "bg-red-700 text-primary hover:text-red-800 hover:bg-primary" : "bg-primary text-red-700"} rounded-2xl  `}
                      >
                        {!submit.file ? "Delete" : <Loader2 className="animate-spin " />}
                      </button>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
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
            {submit.appointmentP && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <Loader2 className="text-white animate-spin" size={50} />
              </div>
            )}
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
                Book
              </button>
            </div>
          </MotionUI>
        </MotionUI>
      )}
    </div>
  );
}
