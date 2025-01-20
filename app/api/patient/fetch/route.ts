import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';
import { EventEmitter } from 'events';
import { PatientAuthorizedPersonsType, PatientFileType, PatientType } from '@/types/api/patient';

export async function POST(req: NextRequest) {
  EventEmitter.defaultMaxListeners = 20;
  const { patientId, accessorId } = await req.json()
  const contract = initContract();

  try {
    // const temp = await contract.addAuthorizedPerson(Number(patientId), String(accessorId), "Doctor");
    // await temp.wait()
    const patient = await contract.getPatient(Number(patientId), String(accessorId));

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

    return NextResponse.json({ data: serializedPatient });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error retrieving patient data', error: error },
      { status: 500 }
    );
  }
}
