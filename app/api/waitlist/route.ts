import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      email,
      diagnosis,
      primaryWearable,
      otherWearable,
      trackingDuration,
      openToContact,
      interestReason
    } = body;

    if (!email || !diagnosis || !primaryWearable) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const sanitize = (str: string | null | undefined): string | null => {
      if (!str) return null;
      return str.slice(0, 500);
    };

    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      console.error('DATABASE_URL environment variable is not set');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    const sql = neon(databaseUrl);

    await sql`
      INSERT INTO waitlist (
        email,
        diagnosis,
        primary_wearable,
        other_wearable,
        tracking_duration,
        open_to_contact,
        interest_reason,
        created_at
      ) VALUES (
        ${email.toLowerCase().trim()},
        ${sanitize(diagnosis)},
        ${sanitize(primaryWearable)},
        ${sanitize(otherWearable)},
        ${sanitize(trackingDuration)},
        ${sanitize(openToContact)},
        ${sanitize(interestReason)},
        NOW()
      )
    `;

    return NextResponse.json(
      { success: true, message: 'Successfully added to waitlist' },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Waitlist submission error:', error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    );
  }
}
