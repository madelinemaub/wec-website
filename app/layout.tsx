import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Women's Evidence Collective | Endometriosis Baseline Project",
  description: 'A patient-led scientific initiative turning lived experience into biological evidence. Join the waitlist to help build the first baseline for endometriosis.',
  keywords: 'endometriosis, women\'s health, wearable data, medical research, patient-led research',
  openGraph: {
    title: "Women's Evidence Collective",
    description: 'Endometriosis has never had a baseline. We\'re building it.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans-clean antialiased">{children}</body>
    </html>
  )
}
