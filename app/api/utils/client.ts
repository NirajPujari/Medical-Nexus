  import { create } from '@web3-storage/w3up-client';
  import path from 'path';
  import { ensureUploadDirExists } from './file';
  import { executeCommand } from './command';

  // Helper function to initialize the Web3 Storage client with the current space
  const initializeClient = async () => {
    const client = await create();
    const key = process.env.WEB3_KEY;

    if (!key) {
      throw new Error('WEB3_KEY environment variable is missing.');
    }

    await client.setCurrentSpace(`did:key:${key}`);
    return client;
  };

  /**
   * Initializes the Web3 Storage client.
   * @returns A configured Web3 Storage client instance.
   */
  // export const initWeb3Client = async () => {
  //   return initializeClient();
  // };



  export const fetchWeb3Client = async () => {
    const client = await initializeClient();
    const uploadList = await client.capability.upload.list();

    if (!uploadList.results.length) {
      throw new Error("No uploads found in the capability list.");
    }

    // Get the shard root for fetching files
    const shard = uploadList.results[0].root.toString();
    console.log(`Shard Root: ${shard}`);

    // Fetch the list of file paths
    const res = await fetch(`https://${shard}.ipfs.w3s.link/entries.txt`);
    if (!res.ok) {
      throw new Error("Failed to fetch file entries from IPFS.");
    }

    const filesPath = (await res.text()).split(",");
    if (!filesPath.length) {
      throw new Error("No file paths found in entries.");
    }
    console.log(`File paths: ${filesPath.join(", ")}`);

    // Define the download directory
    const downloadDir = path.join(process.cwd(), "temps");

    // Download files concurrently
    await Promise.all(
      filesPath.map((file) => {
        const folder = file.slice(0, file.replace(/\\/g, '/').lastIndexOf("/"))
        ensureUploadDirExists(path.join(downloadDir, folder));
        executeCommand(
          `curl https://${shard}.ipfs.w3s.link${file} -o ./${path.join("temps", file).replace(/\\/g, '/')}`
        )
      }
      )
    );

    return downloadDir
  }

  /**
   * Uploads a directory of files to Web3 Storage and removes old uploads.
   * @param files - Array of File objects to upload.
   * @returns The CID of the newly uploaded directory.
   */
  export const uploadWeb3Client = async (files: File[]) => {
    if (!files || files.length === 0) {
      throw new Error('No files provided for upload.');
    }

    const client = await initializeClient();
    const CID = await client.uploadDirectory(files);
    const hash = CID.toString();

    // Fetch the list of uploaded directories and remove unused ones
    const uploadList = await client.capability.upload.list();
    const unusedCIDs = uploadList.results
      .filter((result) => result.root.toString() !== hash)
      .map((result) => result.root);

    await Promise.all(unusedCIDs.map((cid) => client.remove(cid)));

    return hash;
  };
