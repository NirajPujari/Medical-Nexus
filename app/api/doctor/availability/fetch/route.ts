// /app/api/doctor/availability/fetch/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';

export async function POST(req: NextRequest) {
  const { doctorId, accessorId } = await req.json();
  const contract = initContract();

  try {
    const doctorData = await contract.getDoctor(Number(doctorId), String(accessorId));
    const availability = doctorData[4]
    return NextResponse.json({ availability });
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving doctor availability', error }, { status: 500 });
  }
}
