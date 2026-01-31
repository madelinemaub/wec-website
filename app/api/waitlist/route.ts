import { sql } from '@vercel/postgres';
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

    // Validate required fields
    if (!email || !diagnosis || !primaryWearable) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert into database
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
        ${email},
        ${diagnosis},
        ${primaryWearable},
        ${otherWearable || null},
        ${trackingDuration || null},
        ${openToContact || null},
        ${interestReason || null},
        NOW()
      )
    `;

    return NextResponse.json(
      { success: true, message: 'Successfully added to waitlist' },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Waitlist submission error:', error);
    
    // Check for duplicate email error (PostgreSQL unique constraint violation)
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
