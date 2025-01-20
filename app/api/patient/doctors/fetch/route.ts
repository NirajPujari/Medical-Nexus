// /pages/api/patient/doctors/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';
import { PatientAuthorizedPersonsType } from '@/types/api/patient';

export async function POST(req: NextRequest) {
  const { patientId, accessorId } = await req.json();
  const contract = initContract();

  try {
    const patientData = await contract.getPatient(Number(patientId), String(accessorId));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authPerson: PatientAuthorizedPersonsType = patientData[6].map((personData: any) => {
      return {
        personAddress: personData[0],
        role: personData[1]
      }
    })

    return NextResponse.json({ doctor: authPerson });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding doctor information', error }, { status: 500 });
  }
}
