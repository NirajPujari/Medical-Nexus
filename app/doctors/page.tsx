"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

const defaultDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Alice Johnson",
    specialty: "Cardiologist",
    image: "/images/placeholder/placeholder.jpg",
  },
  {
    id: 2,
    name: "Dr. Bob Smith",
    specialty: "Dermatologist",
    image: "/images/placeholder/placeholder.jpg",
  },
  {
    id: 3,
    name: "Dr. Carol Williams",
    specialty: "Neurologist",
    image: "/images/placeholder/placeholder.jpg",
  },
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

export default function DoctorsList() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const [doctors, setDoctors] = useState<Doctor[]>(defaultDoctors);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Fetch doctors data
  useEffect(() => {
    setViewMode(
      typeof window !== "undefined" && window.innerWidth > 500
        ? "grid"
        : "list",
    );
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/mongo/doctor");
        if (!res.ok) throw new Error("Failed to fetch doctors");
        const data = await res.json();
        console.log(data)
        setDoctors(data);
      } catch (error) {
        console.error(error);
      }
    };

    setTimeout(fetchDoctors);
  }, []);

  const openModal = useCallback(
    (doctor: Doctor) => {
      if (!isSignedIn) {
        router.push("/login");
        return;
      }
      setSelectedDoctor(doctor);
      setIsModalOpen(true);
    },
    [isSignedIn, router],
  );

  const handleConfirmBooking = useCallback(async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert("Please select a date and time slot.");
      return;
    }

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: "",
          doctorId: selectedDoctor.id,
          date: selectedDate,
          timeSlot: selectedTime,
        }),
      });

      if (!res.ok) throw new Error("Failed to book appointment.");

      alert("Appointment booked successfully!");
      setIsModalOpen(false);
      setSelectedDate("");
      setSelectedTime("");
    } catch (error) {
      console.error(error);
      alert("Error booking appointment.");
    }
  }, [selectedDoctor, selectedDate, selectedTime]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* View Toggle */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="mr-2 text-primary font-bold">View</span>
          <button
            className={`transition-300 rounded p-2 ${
              viewMode === "grid" ? "bg-primary text-secondary" : ""
            }`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid View"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            className={`transition-300 rounded p-2 ${
              viewMode === "list" ? "bg-primary text-secondary" : ""
            }`}
            onClick={() => setViewMode("list")}
            aria-label="List View"
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Doctors Grid/List View */}
      <div
        className={`flex flex-wrap justify-center gap-6 ${
          viewMode === "list" ? "flex-col items-center" : ""
        }`}
      >
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="transition-300 min-w-[300px] rounded-lg bg-card p-4 shadow-md hover:shadow-lg"
          >
            <Image
              src={doctor.image}
              alt={doctor.name}
              className="mb-4 h-48 w-full rounded-md object-cover"
              width={300}
              height={200}
            />
            <h3 className="text-center text-xl font-semibold text-primary">
              {doctor.name}
            </h3>
            <p className="text-center text-sm text-primary">
              {doctor.specialty}
            </p>

            <button
              onClick={() => openModal(doctor)}
              className="transition-300 mt-4 w-full rounded-lg bg-primary py-2 text-secondary hover:bg-highlight1 hover:text-primary"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[350px] rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-secondary">
              Book Appointment
            </h2>
            <p className="text-sm text-gray-700">{selectedDoctor.name}</p>

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-md border p-2 text-gray-700 focus:outline-none"
            />

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Select Time Slot
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full rounded-md border p-2 text-gray-700 focus:outline-none"
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
                className="transition-300 rounded-md bg-gray-400 px-4 py-2 text-primary hover:bg-black"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="transition-300 rounded-md bg-secondary px-4 py-2 text-primary hover:bg-highlight2"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
