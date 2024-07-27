import type { Metadata } from "next";
import { siteConfig } from "./site";
//import "./globals.css";
//import { getFontWeights } from 'next/font';

import { promises as fs } from "node:fs";
import manifest from "./config";

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
	title: "Best Recipes & Cooking Tips | Your Site Name",
	description:
		"Discover the best recipes, cooking tips, and culinary inspiration on Your Site Name. Perfect for home cooks and food enthusiasts.",
	keywords: [
		"recipes",
		"cooking tips",
		"food inspiration",
		"home cooking",
		"culinary tips",
	],
	authors: [{ name: "John Doe", url: "https://example.com/johndoe" }],
	applicationName: "Your Site Name",
	generator: "Next.js 15",
	themeColor: "#ffffff",
	viewport: "width=device-width, initial-scale=1",
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
			{ url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
			{ url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
			{ url: "/icons/apple-touch-icon-57x57.png", sizes: "57x57" },
			{ url: "/icons/apple-touch-icon-60x60.png", sizes: "60x60" },
			{ url: "/icons/apple-touch-icon-72x72.png", sizes: "72x72" },
			{ url: "/icons/apple-touch-icon-76x76.png", sizes: "76x76" },
			{ url: "/icons/apple-touch-icon-114x114.png", sizes: "114x114" },
			{ url: "/icons/apple-touch-icon-120x120.png", sizes: "120x120" },
			{ url: "/icons/apple-touch-icon-144x144.png", sizes: "144x144" },
			{ url: "/icons/apple-touch-icon-152x152.png", sizes: "152x152" },
			{ url: "/icons/apple-touch-icon-180x180.png", sizes: "180x180" },
			{ url: "/icons/icon-192x192.png", sizes: "192x192" },
			{ url: "/icons/safari-pinned-tab.svg", color: "#5bbad5" },
		],
	},
};

//appleWebApp: {
//	capable: true,
//	title: "Your Site Name",
//	statusBarStyle: "black-translucent",
//},
//openGraph: {
//	title: "Best Recipes & Cooking Tips | Your Site Name",
//	description:
//		"Discover the best recipes, cooking tips, and culinary inspiration on Your Site Name. Perfect for home cooks and food enthusiasts.",
//	url: "https://example.com",
//	siteName: "Your Site Name",
//	images: [
//		{
//			url: "https://example.com/og-image.jpg",
//			width: 1200,
//			height: 630,
//			alt: "A delicious dish from Your Site Name",
//		},
//	],
//	locale: "en_US",
//	type: "website",
//},
//twitter: {
//	card: "summary_large_image",
//	site: "@site_account",
//	creator: "@creator_account",
//	title: "Best Recipes & Cooking Tips | Your Site Name",
//	description:
//		"Discover the best recipes, cooking tips, and culinary inspiration on Your Site Name. Perfect for home cooks and food enthusiasts.",
//	images: ["https://example.com/twitter-image.jpg"],
//},
//robots: "index, follow",
//canonical: "https://example.com",
//other: {
//	"msapplication-TileColor": "#ffffff",
//	"msapplication-config": "/browserconfig.xml",
//},
//}

//export const metadata: Metadata = {
//	title: {
//		default: siteConfig.name,
//		template: `%s | ${siteConfig.name}`,
//	},
//	description: siteConfig.description,
//	keywords: [
//		"Next.js",
//		"React",
//		"Tailwind CSS",
//		"Server Components",
//		"Radix UI",
//		"Shadcnui",
//		"Javascript",
//		"Blog",
//	],
//	authors: [
//		{
//			name: "Chef Luke",
//			url: "https://github.com/codingjitsu",
//		},
//	],
//	creator: "chef luke",
//	openGraph: {
//		type: "website",
//		locale: "en_US",
//		url: siteConfig.url,
//		title: siteConfig.name,
//		description: siteConfig.description,
//		siteName: siteConfig.name,
//	},
//	twitter: {
//		card: "summary_large_image",
//		title: siteConfig.name,
//		description: siteConfig.description,
//		images: [`${siteConfig.url}/og`],
//		creator: "@braisenly",
//	},
//  android-chrome-192x192.png
//android-chrome-512x512.png
//apple-touch-icon.png
//favicon-16x16.png
//favicon-32x32.png
//favicon.ico
//site.webmanifest
//	icons: {
//		icon: "/favicon.ico",
//		shortcut: "/favicon-16x16.png",
//		apple: "apple-touch-icon.png",
//	},
//};

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
