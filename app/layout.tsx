/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from 'next'
import './globals.css'

//import { getFontWeights } from 'next/font';

import { promises as fs } from "fs";

const getFontNames = async () => {
  const file = await fs.readFile(process.cwd() + "/.next/server/next-font-manifest.json", "utf8");
  const data = JSON.parse(file);
  const fontNames = Object.keys(data.app);
  return fontNames;
};

const reportFontNames = async () => {
  const fontNames = await getFontNames();
  console.log(fontNames);
}


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
