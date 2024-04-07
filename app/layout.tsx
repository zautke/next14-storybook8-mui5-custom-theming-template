/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from 'next'
import './globals.css'
import ThemeRegistry from '../components/ThemeRegistry'

export const metadata: Metadata = {
  title: 'Next App MUI',
  description: 'Generated by create next app',
}

export default function RootLayout({
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