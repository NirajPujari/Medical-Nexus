// /pages/api/appointment/complete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';

export async function POST(req: NextRequest) {
  const { appointmentId } = await req.json();
  const contract = initContract();

  try {
    await contract.updateAppointmentStatus(Number(appointmentId), "Completed");
    return NextResponse.json({ message: 'Appointment completed successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error completing appointment', error }, { status: 500 });
  }
}
