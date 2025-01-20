// /pages/api/patient/doctors/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';
import { PatientAuthorizedPersonsType, PatientFileType, PatientType } from '@/types/api/patient';

export async function POST(req: NextRequest) {
  const { doctorId, accessorId } = await req.json();
  const contract = initContract();

  try {
    const doctorData = await contract.getDoctor(Number(doctorId), String(accessorId));
    console.log(doctorData)
    const patientIds = doctorData[6].map(Number)

    const patientsData: PatientType[] = patientIds.map(async (id: number) => {
      const patient = await contract.getPatient(id, String(accessorId));
      const serializedPatient: PatientType = {
        id: Number(patient[0]),
        name: patient[1],
        age: Number(patient[2]),
        bloodGroup: patient[3],
        medicalHistory: patient[4],
        files: patient[5].map((file: PatientFileType) => ({
          fileName: file.fileName,
          timestamp: file.timestamp.toString(),
          filePath: file.filePath,
          fileType: file.fileType,
          fileHash: file.fileHash,
        })),
        authorizedPersons: patient[6].map((person: PatientAuthorizedPersonsType) => ({
          personAddress: person.personAddress,
          role: person.role,
        })),
      };
      return serializedPatient;
    })

    return NextResponse.json({ doctor: patientsData });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetch patient information', error }, { status: 500 });
  }
}
