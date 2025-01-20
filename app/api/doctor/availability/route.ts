// /pages/api/doctor/availability/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';

export async function POST(req: NextRequest) {
  const { doctorId, dayOfWeek, timeSlots, accessorId } = await req.json();
  const contract = initContract();

  try {
    setTimeout(async () => {
      const tx = await contract.setDoctorAvailability(Number(doctorId), Number(dayOfWeek), timeSlots, String(accessorId));
      await tx.wait()
    }, 1);
    return NextResponse.json({ message: 'Doctor availability set successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error setting doctor availability', error }, { status: 500 });
  }
}
