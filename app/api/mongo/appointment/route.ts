import { NextResponse } from "next/server";
import { getDatabase } from "@api/utils/mongo";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const db = await getDatabase();
    const collection = db.collection("appointment");

    const query = id ? { id: id } : {}; // Filter by ID if provided
    const data = await collection.find(query).toArray();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch appointments", error },
      { status: 500 }
    );
  }
}


// export async function POST(req: NextResponse) {
//   const { name, email, id, aId, timeSlots, day } = await req.json();
//   try {
//     const db = await getDatabase();
//     const collection = db.collection("patient");
//     const data = await collection.insertOne({ name, email, id, aId, timeSlots, day });
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to fetch doctors", error }, { status: 500 });
//   }
// }
