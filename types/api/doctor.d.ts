export type DoctorType = {
  id: number;
  name: string;
  doctorAddress: string;
  specialization: string;
  availability: string[][];
  assignedPatients: number[];
}