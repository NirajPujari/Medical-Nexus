import { NextRequest, NextResponse } from 'next/server';
import { ensureUploadDirExists, getAllFiles, initContract, uploadWeb3Client, saveFile, deleteFilesAndFolder } from '@api/utils';
import path from 'path';

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const patientId = formData.get('patientId') as string;
  const fileIndex = formData.get('fileIndex') as string; // Index of the file to update
  const fileName = (formData.get('fileName') as string).replaceAll(' ', '_');
  const fileType = (formData.get('fileType') as string).replaceAll(' ', '_');
  const accessorId = formData.get('accessorId') as string;

  if (!file || !fileName || !fileIndex) {
    return NextResponse.json({ message: 'File, fileName, and fileIndex are required' }, { status: 400 });
  }

  const contract = initContract();

  try {
    const newFilePath = path.join('uploads', 'patients', patientId, fileName);
    setTimeout(async () => {
      // Fetch patient data
      const patientData = await contract.getPatient(Number(patientId), accessorId);
      const fileToChange = patientData[5][fileIndex];

      if (!fileToChange) {
        // Remove the file from the patient's records (Web3 side)
        try {
          const response = await fetch('/api/patient/file', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          if (response.ok) {
            return NextResponse.json(data);
          }
        } catch (error) {
          return NextResponse.json({ message: 'Error updating file', error }, { status: 500 });
        }
      }

      // Now add the new file
      const localFilePath = path.join(process.cwd(), 'uploads', 'patients', patientId);
      ensureUploadDirExists(localFilePath);
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      await saveFile(fileBuffer, path.join(patientId, fileName));

      if (fileToChange[0] != fileName) {
        deleteFilesAndFolder([fileToChange[2]])
      }
      const files = await getAllFiles();
      const fileObjects = files.map(f => new File([f.fileData], f.filePath));
      fileObjects.push(new File([files.map(f => f.filePath).join(',')], 'entries.txt'));

      const hash = await uploadWeb3Client(fileObjects);

      const tx = await contract.manageFileInPatient(
        Number(patientId),
        Number(fileIndex), // Assuming this index still applies for the new file or the same file position
        fileName,
        Date(),
        newFilePath,
        fileType,
        hash,
        accessorId
      );
      await tx.wait();
    }, 1);

    return NextResponse.json({ message: 'File updated successfully', filePath: newFilePath });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating file', error }, { status: 500 });
  }
}
