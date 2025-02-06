import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';


// Helper function to get MIME type based on file extension
const getMimeType = (filePath: string): string => {
  const extname = path.extname(filePath).toLowerCase();
  
  const mimeTypes: { [key: string]: string } = {
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.bmp': 'image/bmp',
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mp3',
    '.json': 'application/json',
    '.csv': 'text/csv',
    // Add more as needed
  };

  return mimeTypes[extname] || 'application/octet-stream'; // Default to binary stream for unknown types
};

export async function GET(req: Request) {
  try {

    const url = new URL(req.url);
    const { filename, id } = Object.fromEntries(url.searchParams);

    if (!filename || typeof filename !== 'string') {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(),'uploads', 'patients', String(id), filename);
    console.log(filePath)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = getMimeType(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `inline; filename=${filename}`,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error',error }, { status: 500 });
  }
}
