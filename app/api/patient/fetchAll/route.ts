// /app/api/patient/fetchAll/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';
import { PatientAuthorizedPersonsType, PatientFileType, PatientType } from '@/types/api/patient';

export async function POST(req: NextRequest) {
  const { accessorId } = await req.json()
  const contract = initContract();

  try {
    const patients = await contract.getAllPatients(String(accessorId));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serializedPatient: PatientType[] = patients.map((patient: any) => {
      return {
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
      }
    })

    return NextResponse.json({ data: serializedPatient });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error retrieving patient data', error: error },
      { status: 500 }
    );
  }
}
