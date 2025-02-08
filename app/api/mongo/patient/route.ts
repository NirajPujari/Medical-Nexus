import { NextRequest, NextResponse } from "next/server";
import {getDatabase} from "@api/utils/mongo";

export async function POST(req:NextRequest) {
  const { name, email,id } = await req.json();
  try {
    const db = await getDatabase();
    const collection = db.collection("patient");
    const data = await collection.insertOne({ name, email,id });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch doctors",error }, { status: 500 });
  }
}
