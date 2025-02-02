// /app/api/doctor/patients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';

export async function POST(req: NextRequest) {
  const { patientId, doctorId, accessorId } = await req.json();
  const contract = initContract();

  try {
    const tx = await contract.assignPatientToDoctor(Number(patientId), String(doctorId), String(accessorId));
    await tx.wait();
    return NextResponse.json({ message: 'Patient assigned to doctor successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error assigning patient to doctor', error }, { status: 500 });
  }
}
