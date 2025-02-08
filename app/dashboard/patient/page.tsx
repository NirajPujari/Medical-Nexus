"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PatientDashboard() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Alice Johnson", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Bob Smith", specialty: "Dermatologist" },
    { id: 3, name: "Dr. Carol Williams", specialty: "Neurologist" },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Alice Johnson",
      date: "2025-02-10",
      time: "09:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      doctorName: "Dr. Bob Smith",
      date: "2025-02-15",
      time: "11:00 AM",
      status: "Completed",
    },
  ]);

  const [patientData, setPatientData] = useState({
    id: 0,
    name: "",
    age: 35,
    bloodGroup: "O+",
    medicalHistory: "Hypertension, Diabetes",
  });

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setPatientData({
      ...patientData,
      name: user?.fullName ? String(user?.fullName) : "",
    });
  }, [user]);

  useEffect(() => {
    setLoading(true);
    setLoading(false);
    setDoctors([
      { id: 1, name: "Dr. Alice Johnson", specialty: "Cardiologist" },
      { id: 2, name: "Dr. Bob Smith", specialty: "Dermatologist" },
      { id: 3, name: "Dr. Carol Williams", specialty: "Neurologist" },
    ])
    setAppointments([
      {
        id: 1,
        doctorName: "Dr. Alice Johnson",
        date: "2025-02-10",
        time: "09:00 AM",
        status: "Scheduled",
      },
      {
        id: 2,
        doctorName: "Dr. Bob Smith",
        date: "2025-02-15",
        time: "11:00 AM",
        status: "Completed",
      },
    ])
    // const fetchPatientData = async () => {
    //   try {
    //     const response = await fetch("/api/patient-data", {
    //       method: "POST",
    //     });
    //     const data = await response.json();
    //     setPatientData(data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error(error);
    //     setLoading(false);
    //   }
    // };
    
    // Fetch real data for doctors, appointments, and patient info
    // Example: fetch("/api/doctors").then(res => res.json()).then(setDoctors);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const handleFileDelete = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

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
          {/* Patient Info */}
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
            <ul className="divide-y divide-gray-300">
              {doctors.map((doctor) => (
                <li key={doctor.id} className="py-3">
                  <h3 className="text-lg font-medium text-highlight2">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Appointments */}
        <div className="rounded-lg border-l-4 border-highlight2 bg-highlight1 p-6 shadow-xl">
          <h2 className="mb-4 text-2xl font-semibold text-highlight2">
            Your Appointments
          </h2>
          <ul className="divide-y divide-gray-300">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="py-3">
                <h3 className="text-lg font-medium text-highlight2">
                  Doctor: {appointment.doctorName}
                </h3>
                <p className="text-sm text-gray-500">
                  Date: {appointment.date} | Time: {appointment.time}
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  Status: {appointment.status}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* File Upload Section */}
        <div className="rounded-lg border-l-4 border-highlight2 bg-highlight1 p-6 shadow-xl">
          <h2 className="mb-4 text-2xl font-semibold text-highlight2">
            Upload Medical Files
          </h2>
          <input
            type="file"
            multiple
            accept=".pdf, .png, .jpg, .jpeg"
            onChange={handleFileUpload}
            className="w-full cursor-pointer rounded-lg border bg-secondary p-2 text-primary"
          />
          <h3 className="mt-4 text-lg font-medium text-highlight2">
            Uploaded Files:
          </h3>
          {files.length === 0 ? (
            <p className="text-sm text-gray-400">No files uploaded.</p>
          ) : (
            <ul className="mt-2 space-y-3">
              {files.map((file, index) => {
                const fileURL = URL.createObjectURL(file);
                const isImage = file.type.startsWith("image");
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-secondary p-3 shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      {isImage && (
                        <Image
                          src={fileURL}
                          alt="Preview"
                          className="h-10 w-10 rounded-md object-cover"
                          width={100}
                          height={100}
                        />
                      )}
                      <span className="text-sm text-primary">{file.name}</span>
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={fileURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-700"
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
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
