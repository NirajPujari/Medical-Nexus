export type AppointmentType = {
  id: number;
  patientId: number;
  doctorId: number;
  timestamp: string;
  status: string;
}

export type AppointmentDisplayType ={
  _id: string;
  id: number,
  patientName: string,
  date: string,
  timeSlots: string;
  dayOfWeek: number;
  doctorId: number;
  doctorName: string;
  patientId: number;
  status: string;
}