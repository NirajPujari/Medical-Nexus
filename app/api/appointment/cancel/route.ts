// /app/api/appointment/cancel/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';

export async function POST(req: NextRequest) {
  const { appointmentId } = await req.json();
  const contract = initContract();

  try {
    const temp = await contract.updateAppointmentStatus(Number(appointmentId), "Cancelled");
    return NextResponse.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error cancelling appointment', error }, { status: 500 });
  }
}
