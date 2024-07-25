import type { Metadata } from "next";
import { siteConfig } from "./site";
//import "./globals.css";
//import { getFontWeights } from 'next/font';

import { promises as fs } from "node:fs";

const getFontNames = async () => {
	const file = await fs.readFile(
		`${process.cwd()}/.next/server/next-font-manifest.json`,
		"utf8",
	);
	const data = JSON.parse(file);
	const fontNames = Object.keys(data.app);
	return fontNames;
};

const _reportFontNames = async () => {
	const fontNames = await getFontNames();
	console.log(fontNames);
};

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		"Next.js",
		"React",
		"Tailwind CSS",
		"Server Components",
		"Radix UI",
		"Shadcnui",
		"Javascript",
		"Blog",
	],
	authors: [
		{
			name: "Chef Luke",
			url: "https://github.com/codingjitsu",
		},
	],
	creator: "chef luke",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [`${siteConfig.url}/og`],
		creator: "@braisenly",
	},
  android-chrome-192x192.png
android-chrome-512x512.png
apple-touch-icon.png
favicon-16x16.png
favicon-32x32.png
favicon.ico
site.webmanifest
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "apple-touch-icon.png",
	},
};

// export const metadata: Metadata = {
// 	title: {
// 		absolute: config.blog.metadata.title.absolute,
// 		default: config.blog.metadata.title.default,
// 		template: config.blog.metadata.title.template,
// 	},
// 	description: config.blog.metadata.description,
// 	openGraph: {
// 		title: config.blog.metadata.title.default,
// 		description: config.blog.metadata.description,
// 		images: [
// 			signOgImageUrl({
// 				title: config.blog.name,
// 			}),
// 		],
// 	},
// };

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<main>{children}</main>
			</body>
		</html>
	);
}
