// /app/api/patient/file/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ensureUploadDirExists, getAllFiles, initContract, uploadWeb3Client, saveFile } from '@api/utils';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const patientId = formData.get("patientId") as string;
  const fileName = (formData.get('fileName') as string).replaceAll(" ", "_");
  const fileType = (formData.get("fileType") as string).replaceAll(" ", "_");
  const accessorId = formData.get("accessorId") as string;

  if (!file || !fileName) {
    return NextResponse.json({ message: 'Filename and file are required' }, { status: 400 });
  }

  const contract = initContract();

  try {
    const filePath = path.join('uploads', "patients", patientId, fileName);
    const localFilePath = path.join(process.cwd(), 'uploads', "patients", patientId)
    ensureUploadDirExists(localFilePath);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const saveFilePromise = saveFile(fileBuffer, path.join(patientId, fileName));

    const filesPromise = getAllFiles();

    const [_, files] = await Promise.all([saveFilePromise, filesPromise]);
    console.log(_)
    const fileObjects = files.map(f => new File([f.fileData], f.filePath));
    fileObjects.push(new File([files.map(f => f.filePath).join(",")], "entries.txt"))

    const hash = await uploadWeb3Client(fileObjects);
    const tx = await contract.manageFileInPatient(Number(patientId), -1, fileName, Date(), filePath, fileType, hash, accessorId);
    await tx.wait();

    return NextResponse.json({ message: 'File added successfully', filePath });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding file', error }, { status: 500 });
  }
}
