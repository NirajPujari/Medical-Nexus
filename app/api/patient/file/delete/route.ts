// /pages/api/patient/file/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { deleteFilesAndFolder, getAllFiles, initContract, uploadWeb3Client } from '@api/utils';

export async function DELETE(req: NextRequest) {
  const { patientId, fileIndex, filePath, accessorId } = await req.json();
  const contract = initContract();

  try {
    setTimeout(async () => {
      deleteFilesAndFolder([filePath])
      const files = await getAllFiles();
      const fileObjects = files.map(f => new File([f.fileData], f.filePath));
      fileObjects.push(new File([files.map(f => f.filePath).join(",")], "entries.txt"))

      await uploadWeb3Client(fileObjects);
    }, 1);
    const tx = await contract.deleteFileFromPatient(Number(patientId), Number(fileIndex), String(accessorId));
    await tx.wait();
    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting file', error }, { status: 500 });
  }
}
