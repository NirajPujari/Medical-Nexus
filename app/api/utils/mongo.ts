import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDatabase(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local");
  }

  if (!client) {
    try {
      console.log("⏳ Connecting to MongoDB...");
      client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }); // 5s timeout
      await client.connect();
      db = client.db("Medical-Nexus");
      console.log("✅ Connected to MongoDB");
    } catch (error) {
      console.error("❌ MongoDB Connection Failed:", error);
      throw new Error("Failed to connect to MongoDB");
    }
  }
  return db!;
}