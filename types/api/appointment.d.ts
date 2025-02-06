export type AppointmentType = {
  id: number;
  patientId: number;
  doctorId: number;
  timestamp: string;
  status: string;
}

export type AppointmentDisplayType ={
  id: number,
  patientName: string,
  date: string,
  time: string,
  status: string, 
}