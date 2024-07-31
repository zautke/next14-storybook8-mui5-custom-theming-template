import type { Metadata } from "next";
import { config } from "./config";
//import "./globals.css";
//import { getFontWeights } from 'next/font';

import { promises as fs } from "node:fs";
import ThemeRegistry from "@components/ThemeRegistry";
import { ThemeSwitcher } from "@components/ThemeSwitcher";

const WEBSITE_HOST_URL = "https://brasienly.com";

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
	metadataBase: new URL(`${WEBSITE_HOST_URL}`),
	title: config.title,
	generator: "Next.js",
	publisher: "Braisenly",
	robots: "index, follow",
	description: config.description,
	//   applicationName: "RecipeLab",
	//   authors:[
	//     {
	//       name: "Ehsan Ghaffar",
	//       url: "https://ehsanghaffarii.ir"
	//     }
	//   ],
	//   creator: "Ehsan Ghaffar",
	//   verification: {
	//     google: "aG69rfEfYwvFjNKS3C-jUj60PsqRr2LO9lHyKw0wNFE"
	//   },
	appleWebApp: {
		title: "Apple Web App",
		statusBarStyle: "black-translucent",
		startupImage: [
			"/assets/startup/apple-touch-startup-image-768x1004.png",
			{
				url: "/assets/startup/apple-touch-startup-image-1536x2008.png",
				media: "(device-width: 768px) and (device-height: 1024px)",
			},
		],
	},
	//icons: [
	//	{ rel: "icon", url: "https://braisenly.com/icon.png" },
	//	{ rel: "apple-touch-icon", url: "https://braisenly.com/apple-icon.png" },
	//],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "apple-touch-icon.png",
	},
	openGraph: {
		title: config.title,
		description: config.description,
		locale: "en_US",
		type: "article", // "website" not on type?"
		authors: ["Luke Zautke", "nextfetchball", "Wielding Stoic Knives"],
		url: `${WEBSITE_HOST_URL}`,
		siteName: config.title.default,
		images: [
			{
				url: "https://braisenly.com/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "A delicious dish from Your Site Name",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: config.title,
		description: config.description as string,
		images: [
			{
				url: "https://braisenly.com/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "A delicious dish from Your Site Name",
			},
		],
		creator: "@codingJitsu",
	},
	alternates: {
		canonical: new URL(`${WEBSITE_HOST_URL}`),
		types: {
			"application/rss+xml": [
				{ url: "blog.rss", title: "rss" },
				{ url: "blog/js.rss", title: "js title" },
			],
		},
	},
	//manifest: "https://braisenly.com/manifest.json",
};

//export async function generateMetadata({
//	// biome-ignore lint/correctness/noUnusedVariables: <explanation>
//	params,
//}: {
//	params: { slug: string };
//}): Promise<Metadata | undefined> {
//	return undefined
//}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeSwitcher>{children}</ThemeSwitcher>
				{/*{children}*/}
			</body>
		</html>
	);
}
