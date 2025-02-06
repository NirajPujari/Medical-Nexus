import { NextResponse } from "next/server";
import { getDatabase } from "@api/utils/mongo";

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection("appointment");
    const data = await collection.find({}).toArray();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch doctors", error }, { status: 500 });
  }
}

export async function POST(req: NextResponse) {
  const { name, email, id, aId, timeSlots, day } = await req.json();
  try {
    const db = await getDatabase();
    const collection = db.collection("patient");
    const data = await collection.insertOne({ name, email, id, aId, timeSlots, day });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch doctors", error }, { status: 500 });
  }
}
