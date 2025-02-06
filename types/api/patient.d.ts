import { Stats } from "node:fs";

export type PatientFileType = {
  fileName: string;
  timestamp: string;
  filePath: string;
  fileType: string;
  fileHash: string;
  localFile?: FileType
}

export type PatientAuthorizedPersonsType = {
  personAddress: string,
  role: string,
}

export type PatientType = {
  id: number;
  name: string;
  age: number;
  bloodGroup: string,
  medicalHistory: string,
  files: patientFileType[];
  authorizedPersons: patientAuthorizedPersonsType[]
}

export type FileType = {
  fileName: string;
  filePath: string;
  fileStats: Stats;
  fileData: BlobPart;
};