import { NextResponse } from "next/server";
import { getDatabase } from "@api/utils/mongo";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const db = await getDatabase();
    const collection = db.collection("appointment");

    const query = id ? { doctorId: id } : {}; // Filter by ID if provided
    const data = await collection.find(query).toArray();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch appointments", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { patientId, doctorId, timeSlots, dayOfWeek, date, doctorName, patientName, status } = await req.json();

    const db = await getDatabase();
    const collection = db.collection("appointment");

    const data = await collection.insertOne({
      patientId,
      doctorId,
      patientName,
      timeSlots,
      dayOfWeek,
      date,
      doctorName,
      status,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to add appointment", error }, { status: 500 });
  }
}

// PATCH method to update an appointment
export async function PATCH(req: Request) {
  try {
    const { _id, ...updateData } = await req.json(); // Extract ID and fields to update

    if (!_id) {
      return NextResponse.json({ message: "Missing appointment ID" }, { status: 400 });
    }

    const db = await getDatabase();
    const collection = db.collection("appointment");

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) }, // Match the appointment by ID
      { $set: updateData } // Update provided fields dynamically
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Appointment updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update appointment", error }, { status: 500 });
  }
}
