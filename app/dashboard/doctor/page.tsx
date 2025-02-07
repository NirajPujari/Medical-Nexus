"use client";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PatientType } from "@/types/api/patient";
import { AppointmentDisplayType } from "@/types/api/appointment";
import { videos } from "@/app/data";

export default function DoctorDashboard() {
  const { user, isLoaded } = useUser();
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [patients, setPatients] = useState<PatientType[]>([]);
  const [appointments, setAppointments] = useState<AppointmentDisplayType[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const doctorRes = await fetch("/api/mongo/doctor", { signal });
        if (!doctorRes.ok) throw new Error("Failed to fetch doctors");

        const doctorsData = await doctorRes.json();
        const doctor = doctorsData.find(
          (doc: { name: string; id: string }) => doc.name === user?.fullName,
        );

        if (!doctor) throw new Error("Doctor not found");

        // Fetch patients and appointments concurrently
        const [patientsRes, appointmentsRes] = await Promise.all([
          fetch("/api/doctor/patients/fetch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              doctorId: doctor.id,
              accessorId: doctor.id,
            }),
            signal,
          }),
          fetch(`/api/mongo/appointment?id=${doctor.id}`, { signal }),
        ]);

        if (!patientsRes.ok) throw new Error("Failed to fetch patients");
        if (!appointmentsRes.ok)
          throw new Error("Failed to fetch appointments");

        const [patientsData, appointmentsData] = await Promise.all([
          patientsRes.json(),
          appointmentsRes.json(),
        ]);
        console.log(patientsData)

        setPatients(patientsData?.doctor || []);
        setAppointments(appointmentsData?.reverse() || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }

      return () => controller.abort(); // Cleanup request on unmount
    };

    if (isLoaded) {
      fetchData();
    }
  }, [isLoaded]);

  // Open Modal with Patient Details
  const openModal = (patient: PatientType) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center bg-primary p-6">
      <div className="w-full max-w-screen-2xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-2xl font-semibold text-highlight2"
        >
          Welcome to your Dashboard, Dr. {user?.firstName ? user?.firstName: <span className="blur-md">######</span>}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Patients List */}
          <div className="overflow-hidden rounded-lg bg-highlight1 p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-highlight2">
              Patients
            </h2>
            <div className="relative">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="h-16 animate-pulse rounded-lg bg-primary"
                    ></div>
                  ))}
                </div>
              ) : (
                <ul className="flex max-h-[300px] flex-col gap-4 overflow-y-auto">
                  {patients.map((patient) => (
                    <li
                      key={patient.id}
                      onClick={() => openModal(patient)}
                      className="cursor-pointer rounded-2xl border-b border-highlight2 p-4 text-highlight2 transition-all duration-300 hover:bg-highlight2 hover:text-highlight1 focus:outline-none focus:ring-2 focus:ring-highlight2 md:basis-1/2 lg:basis-1/3"
                      role="button"
                      aria-label={`View details for ${patient.name}`}
                    >
                      <h3 className="text-lg font-medium">{patient.name}</h3>
                      <p className="text-sm">Age: {patient.age}</p>
                      <p className="text-sm">
                        Blood Group: {patient.bloodGroup}
                      </p>
                      <p className="text-sm">
                        Medical History: {patient.medicalHistory}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Appointments List */}
          <div className="overflow-hidden rounded-lg bg-highlight1 p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-highlight2">
              Appointments
            </h2>
            <div className="relative">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="h-16 animate-pulse rounded-lg bg-primary"
                    ></div>
                  ))}
                </div>
              ) : (
                <ul className="flex max-h-[300px] flex-col gap-4 overflow-y-auto">
                  {appointments.map((appointment) => (
                    <li
                      key={appointment.id}
                      className="cursor-pointer rounded-2xl border-b border-highlight2 p-4 text-highlight2 transition-all duration-300 hover:bg-highlight2 hover:text-highlight1 focus:outline-none focus:ring-2 focus:ring-highlight2 md:basis-1/2 lg:basis-1/3"
                      role="listitem"
                      aria-label={`Appointment with ${appointment.patientName} on ${appointment.date} at ${appointment.time}`}
                    >
                      <h3 className="text-lg font-medium">
                        Patient: {appointment.patientName}
                      </h3>
                      <p className="text-sm">Date: {appointment.date}</p>
                      <p className="text-sm">Time: {appointment.time}</p>
                      <p className="text-sm">Status: {appointment.status}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Modal for Patient Details */}
        {isModalOpen && selectedPatient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-[400px] rounded-lg bg-primary p-6 shadow-lg"
            >
              <h2 className="mb-4 text-xl font-semibold text-highlight2">
                {selectedPatient.name}
              </h2>
              <p className="text-sm text-card">
                <strong>Age:</strong> {selectedPatient.age}
              </p>
              <p className="text-sm text-card">
                <strong>Blood Group:</strong> {selectedPatient.bloodGroup}
              </p>
              <p className="text-sm text-card">
                <strong>Medical History:</strong>{" "}
                {selectedPatient.medicalHistory}
              </p>

              {/* Files Section */}
              <h3 className="mt-4 text-lg font-medium text-highlight2">
                Medical Files
              </h3>
              <ul className="mt-2 space-y-2">
                {selectedPatient.files.length === 0 ? (
                  <p className="text-sm text-card">No files available.</p>
                ) : (
                  selectedPatient.files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-secondary p-2"
                    >
                      <span className="text-sm text-primary">
                        {file.fileName.length >18 ?file.fileName.slice(0,18)+"...": file.fileName}
                      </span>
                      <div className="flex gap-2 justify-center items-center">
                      <Link
                        href={`/api/files?filename=${file.fileName}&id=${selectedPatient.id}`}
                        target="_blank"
                        className="text-sm text-highlight1 bg-highlight2 hover:text-highlight2 hover:bg-highlight1 transition-500 px-4 py-1 rounded-md"
                      >
                        View
                      </Link>
                      <Link
                        href={`/api/files?filename=${file.fileName}&id=${selectedPatient.id}`}
                        download
                        className="px-4 py-1 text-sm text-highlight1 bg-highlight2 hover:text-highlight2 hover:bg-highlight1 transition-500 rounded-md"
                      >
                          Download
                       </Link>
                      </div>
                    </li>
                  ))
                )}
              </ul>

              {/* Authorized Persons */}
              <h3 className="mt-4 text-lg font-medium text-highlight2">
                Authorized Persons
              </h3>
              <ul className="mt-2 space-y-2">
                {selectedPatient.authorizedPersons.length === 0 ? (
                  <p className="text-sm text-card">No authorized persons.</p>
                ) : (
                  selectedPatient.authorizedPersons.map((person, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {person.personAddress} - <strong>{person.role}</strong>
                    </li>
                  ))
                )}
              </ul>

              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-6 w-full rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-700"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}

        {/* Education Videos Section */}
        <div className="rounded-lg bg-highlight1 p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-highlight2">
            Educational Videos
          </h2>
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselPrevious className="bg-secondary" />
            <CarouselNext className="bg-secondary" />

            <CarouselContent>
              {videos.map((video) => (
                <CarouselItem
                  key={video.id}
                  className="space-y-2 md:basis-1/2 lg:basis-1/3"
                >
                  <h3 className="text-lg font-medium text-highlight2">
                    {video.title}
                  </h3>
                  <iframe
                    className="h-60 w-full rounded-lg"
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share; clipboard-write;"
                    allowFullScreen
                  ></iframe>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
