import { AppointmentType } from "@/types/api/appointment";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapAppointments(rawAppointments: any[]): AppointmentType[] {
  return rawAppointments.map((appointment) => ({
    id: Number(appointment[0]),
    patientId: Number(appointment[1]),
    doctorId: Number(appointment[2]),
    timestamp: appointment[3],
    status: appointment[4],
  }));
}