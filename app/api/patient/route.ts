// /pages/api/patient/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';

export async function POST(req: NextRequest) {
  const { name, age, bloodGroup, medicalHistory } = await req.json();
  const contract = initContract();

  try {
    const IDS = await contract.fetchLatestID()
    const id = Number(IDS[0])

    const tx = await contract.addPatient(id, name, age, bloodGroup, medicalHistory, [], []);
    await tx.wait();
    return NextResponse.json({ message: "Patient added successfully", id });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding patient', error }, { status: 500 });
  }
}
