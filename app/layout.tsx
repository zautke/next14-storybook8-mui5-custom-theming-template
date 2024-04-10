/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from 'next'
//import './globals.css'

export const metadata: Metadata = {
  title: 'NextJS Storybook MUI Custom Theme',
  description: 'A Next/Storybook integration with Material-UI 5 theming.',
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
