import type React from "react"
import type { Metadata } from "next"
import "./styles/main.css"

export const metadata: Metadata = {
  title: "PopX Replica - Mobile App Interface",
  description: "A pixel-perfect replica of the PopX mobile application",
    generator: 'v0.dev'
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
