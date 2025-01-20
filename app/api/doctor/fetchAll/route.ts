/* eslint-disable @typescript-eslint/no-explicit-any */
// /pages/api/doctor/fetch/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';
import { DoctorType } from '@/types/api/doctor';

export async function POST(req: NextRequest) {
  const { accessorId } = await req.json();
  const contract = initContract();

  try {
    const resDoctors = await contract.getAllDoctor(String(accessorId));

    const doctor: DoctorType[] = resDoctors.map((resDoctor: any) => {
      return {
        id: Number(resDoctor[0]),
        name: String(resDoctor[1]),
        doctorAddress: String(resDoctor[2]),
        specialization: String(resDoctor[3]),
        availability: resDoctor[4].map((weekAva: any) => weekAva.map(String)),
        assignedPatients: resDoctor[5].map(Number),
      }
    });

    return NextResponse.json({ doctor });
  } catch (error) {
    console.error('Error fetching doctor details:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.';

    return NextResponse.json(
      { message: 'Error retrieving doctor details', error: errorMessage },
      { status: 500 }
    );
  }
}
