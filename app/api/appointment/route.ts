// /app/api/appointment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';

export async function POST(req: NextRequest) {
  const { patientId, doctorId, timeSlots, dayOfWeek } = await req.json();
  const contract = initContract();

  try {
    const IDS = await contract.fetchLatestID()
    const id = Number(IDS[2])

    const tx1 = await contract.bookAppointment(id, Number(patientId), Number(doctorId), timeSlots, dayOfWeek);
    await tx1.wait()
    const tx2 = await contract.assignPatientToDoctor(Number(patientId), String(doctorId), String(doctorId));
    await tx2.wait();
    return NextResponse.json({ message: 'Appointment booked successfully', id });
  } catch (error) {
    return NextResponse.json({ message: 'Error booking appointment', error }, { status: 500 });
  }
}
