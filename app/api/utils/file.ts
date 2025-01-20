import fs from 'fs';
import { FileType } from '@/types/api/patient';
import path from 'path';


const UPLOAD_DIR = path.join(process.cwd(), 'uploads', "patients");

// Ensure the upload directory exists
export const ensureUploadDirExists = (uploadDir: string) => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

// Helper function to save file to the local server
export const saveFile = async (fileBuffer: Buffer, filename: string) => {
  const filePath = path.join(UPLOAD_DIR, filename);
  await fs.promises.writeFile(filePath, fileBuffer);
  return filePath;
};

// Helper function to retrieve all files in a directory
export const getAllFiles = async (dir: string = UPLOAD_DIR): Promise<FileType[]> => {
  if (!fs.existsSync(dir)) return [];

  const items = await fs.promises.readdir(dir);
  const files: FileType[] = [];

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = await fs.promises.stat(itemPath);

    if (stats.isDirectory()) {
      files.push(...await getAllFiles(itemPath));
    } else {
      const data = await fs.promises.readFile(itemPath);
      files.push({
        fileName: item,
        filePath: itemPath.replace(process.cwd(), '').replace(/\\/g, '/'),
        fileStats: stats,
        fileData: data,
      });
    }
  }

  return files;
};

export function deleteFilesAndFolder(filesPath: string[]) {
  filesPath.map((file) => {
    const fullPath = path.join(process.cwd(), file);
    try {
      if (fs.existsSync(fullPath)) {
        const stats = fs.lstatSync(fullPath);
        if (stats.isDirectory()) {
          fs.rmSync(fullPath, { recursive: true, force: true });
          console.log(`Deleted directory: ${fullPath}`);
        } else {
          fs.unlinkSync(fullPath);
          console.log(`Deleted file: ${fullPath}`);
        }
      } else {
        console.log(`Path not found: ${fullPath}`);
      }
    } catch (error) {
      console.error(`Error deleting path: ${fullPath}`, error);
    }
  });
}