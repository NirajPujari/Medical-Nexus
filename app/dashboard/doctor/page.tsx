"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { PatientType } from "@/types/api/patient";
import { AppointmentDisplayType } from "@/types/api/appointment";
import Link from "next/link";

export default function DoctorDashboard() {
  const { user, isLoaded } = useUser();
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [patients, setPatients] = useState<PatientType[]>([]);
  const [appointments, setAppointments] = useState<AppointmentDisplayType[]>([]);

  const videos = [
    {
      id: 1,
      title: "The Importance of Sleep for Health",
      url: "https://www.youtube.com/embed/J-D8QGqOZVU?si=S0K-7mnP3W4yHdD2",
    },
    {
      id: 2,
      title: "Advances in Cancer Immunotherapy",
      url: "https://www.youtube.com/embed/88E7CjtBae4?si=WcSuGWw5H-tnBkEF",
    },
    {
      id: 3,
      title: "Understanding Neurodegenerative Diseases",
      url: "https://www.youtube.com/embed/RImBxfVH9H4?si=T-_THRohsqudzcOh",
    },
    {
      id: 4,
      title: "Gene Editing: CRISPR Technology and Its Impact",
      url: "https://www.youtube.com/embed/UKbrwPL3wXE?si=ZSvfXZ5MiuAqQOOt",
    },
    {
      id: 5,
      title: "The Role of Artificial Intelligence in Healthcare",
      url: "https://www.youtube.com/embed/uvqDTbusdUU?si=vf_1z0X0sJjz3MRA",
    },
    {
      id: 6,
      title: "Exploring the Human Microbiome and Its Effect on Health",
      url: "https://www.youtube.com/embed/VzPD009qTN4si=mUbIG5aHDISd0K7g",
    },
    {
      id: 7,
      title: "The Future of Personalized Medicine",
      url: "https://www.youtube.com/embed/Z7iLYHvqMAQ?si=HpTTjlJWDZDtrruo",
    },
    {
      id: 8,
      title: "Deep Dive into Immunology: The Immune System Explained",
      url: "https://www.youtube.com/embed/k9QAyP3bYmc?si=37JW4TOTKnttYO6t",
    },
    {
      id: 9,
      title: "Chronic Pain Management: New Therapeutic Approaches",
      url: "https://www.youtube.com/embed/kYK7utae7Cg?si=7434UM81h_5L-erc",
    },
    {
      id: 10,
      title: "The Gut-Brain Axis: How Your Gut Influences Mental Health",
      url: "https://www.youtube.com/embed/_PLD5RLLvfQ?si=t0zSiRPr18KlGCWX",
    },
    {
      id: 11,
      title: "The Science Behind Stem Cell Therapy",
      url: "https://www.youtube.com/embed/lUtdGVxsnlk?si=PbLg0A9LoytC1Tkl",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        // Fetch doctor info
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
          fetch("/api/mongo/appointment", { signal }),
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
