// /app/api/doctor/appointment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initContract } from '@api/utils';
import { AppointmentType } from '@/types/api/appointment';
import { mapAppointments } from '../../utils/appointment';

export async function POST(req: NextRequest) {
  const { doctorId } = await req.json();
  const contract = initContract();

  try {
    if (!doctorId || isNaN(Number(doctorId))) {
      return NextResponse.json({ message: 'Invalid doctorId provided' }, { status: 400 });
    }

    const resAppointments = await contract.fetchAppointments(
      Number(doctorId),
      'Doctor'
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
