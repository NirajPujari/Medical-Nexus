import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

export const client: MongoClient = await new MongoClient(uri).connect();

const db: Db = client.db("Medical-Nexus");

export default db;