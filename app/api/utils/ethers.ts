import { JsonRpcProvider, Wallet, Contract } from "ethers";
import CONTRACT_ABI from '@/contractABC.json';

// Initialize Ethereum contract
export const initContract = () => {
  const provider = new JsonRpcProvider(process.env.API_URL);
  const signer = new Wallet(process.env.PRIVATE_KEY || "", provider);
  return new Contract(process.env.CONTRACT_ADDRESS || "", CONTRACT_ABI, signer);
};