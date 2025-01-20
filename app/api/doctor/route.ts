// /pages/api/doctor/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';

export async function POST(req: NextRequest) {
  const { name, doctorAddress, specialization, accessorId } = await req.json();
  const contract = initContract();

  try {
    const IDS = await contract.fetchLatestID()
    const id = Number(IDS[1])

    const tx = await contract.addDoctor(id, name, doctorAddress, specialization, [], [], String(accessorId));
    await tx.wait();
    return NextResponse.json({ message: "Doctor added successfully", id });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding doctor', error }, { status: 500 });
  }
}
