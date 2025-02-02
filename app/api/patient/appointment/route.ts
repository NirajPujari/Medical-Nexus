// /app/api/patient/appointment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';
import { AppointmentType } from '@/types/api/appointment';
import { mapAppointments } from '../../utils/appointment';

export async function POST(req: NextRequest) {
  const { patientId } = await req.json();
  const contract = initContract();

  try {
    if (!patientId || isNaN(Number(patientId))) {
      return NextResponse.json({ message: 'Invalid patientId provided' }, { status: 400 });
    }

    const resAppointments = await contract.fetchAppointments(
      Number(patientId),
      'Patient'
    );

    const appointments: AppointmentType[] = mapAppointments(resAppointments);

    return NextResponse.json({
      message: 'Appointments fetched successfully',
      appointments
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching appointments', error }, { status: 500 });
  }
}
