// /app/api/patient/file/fetch/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import {
  deleteFilesAndFolder,
  fetchWeb3Client,
  getAllFiles,
  initContract,
} from "@api/utils";
import { PatientFileType } from "@/types/api/patient";

/**
 * API endpoint to fetch patient files from Web3 storage.
 * @param req - The incoming request containing patientId and accessorId.
 * @returns A response containing fetched patient files.
 */
export async function POST(req: NextRequest) {
  const { patientId, accessorId } = await req.json();

  if (!patientId || !accessorId) {
    return NextResponse.json(
      { message: "Patient ID and Accessor ID are required." },
      { status: 400 }
    );
  }

  const contract = initContract();

  try {
    const downloadDir = await fetchWeb3Client();
    const localFiles = await getAllFiles(path.join(downloadDir, "uploads", "patients", String(patientId)));

    // Schedule cleanup after processing
    setTimeout(() => deleteFilesAndFolder(["/temps"]), 2000);

    const patientData = await contract.getPatient(Number(patientId), String(accessorId));
    const patientFiles = patientData[5]

    console.log(patientData, patientFiles)


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const files: PatientFileType[] = patientFiles.map((file: any) => {
      const localFile = localFiles.find((local) => local.fileName === file[0]);

      return {
        fileName: file[0],
        timeStamp: file[1],
        filePath: file[2],
        fileType: file[3],
        fileHash: file[4],
        localFile: localFile || null,
      };
    });

    return NextResponse.json({ message: "Files fetched successfully.", data: files });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { message: "Error fetching files.", error: error },
      { status: 500 }
    );
  }
}
