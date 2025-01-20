// /pages/api/patient/doctors/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';

export async function POST(req: NextRequest) {
  const { patientId, accessorId } = await req.json();
  const contract = initContract();

  try {
    setTimeout(async () => {
      const tx = await contract.addAuthorizedPerson(Number(patientId), String(accessorId), "Doctor");
      tx.wait()
    }, 1);
    return NextResponse.json({ message: "Doctor Added successfully" });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding doctor information', error }, { status: 500 });
  }
}
