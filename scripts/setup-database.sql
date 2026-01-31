-- Run this in Vercel Postgres Query Console to create your table
-- Go to: Vercel Dashboard → Your Project → Storage → Your Database → Query

CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  diagnosis VARCHAR(100) NOT NULL,
  primary_wearable VARCHAR(50) NOT NULL,
  other_wearable VARCHAR(100),
  tracking_duration VARCHAR(20),
  open_to_contact VARCHAR(20),
  interest_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist(created_at);
