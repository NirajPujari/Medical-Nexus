import { exec } from 'child_process';

export const executeCommand = (command: string) => {
  exec(command, (error, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return new Error(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return new Error(`Stderr: ${stderr}`);
    }
  });
}