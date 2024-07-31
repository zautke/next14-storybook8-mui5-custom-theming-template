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
//	//const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

//	//if (!post) {
//	//	return;
//	//}

//	//const { title, description, date, url } = post;

//	return {
//		metadataBase: new URL(`${WEBSITE_HOST_URL}`),
//		title: config.title,
//		generator: "nextjs, react, blog",
//		publisher: "Braisenly",
//		robots: "index, follow",
//		description: config.description,
//		appleWebApp: {
//			title: "Apple Web App",
//			statusBarStyle: "black-translucent",
//			startupImage: [
//				"/assets/startup/apple-touch-startup-image-768x1004.png",
//				{
//					url: "/assets/startup/apple-touch-startup-image-1536x2008.png",
//					media: "(device-width: 768px) and (device-height: 1024px)",
//				},
//			],
//		},
//		//icons: [
//		//	{ rel: "icon", url: "https://braisenly.com/icon.png" },
//		//	{ rel: "apple-touch-icon", url: "https://braisenly.com/apple-icon.png" },
//		//],
//		icons: {
//			icon: "/favicon.ico",
//			shortcut: "/favicon-16x16.png",
//			apple: "apple-touch-icon.png",
//		},
//		openGraph: {
//			title: config.title,
//			description: config.description as string,
//			locale: "en_US",
//			type: "article", // "website" not on type?"
//			authors: ["Luke Zautke", "nextfetchball", "Wielding Stoic Knives"],
//			url: `${WEBSITE_HOST_URL}`,
//			siteName: config.title.default,
//			images: [
//				{
//					url: "https://braisenly.com/og-image.jpg",
//					width: 1200,
//					height: 630,
//					alt: "A delicious dish from Your Site Name",
//				},
//			],
//		},
//		twitter: {
//			card: "summary_large_image",
//			title: config.title,
//			description: config.description as string,
//			images: [
//				{
//					url: "https://braisenly.com/og-image.jpg",
//					width: 1200,
//					height: 630,
//					alt: "A delicious dish from Your Site Name",
//				},
//			],
//			creator: "@codingJitsu",
//		},
//		alternates: {
//			canonical: new URL(`${WEBSITE_HOST_URL}`),
//			types: {
//				"application/rss+xml": [
//					{ url: "blog.rss", title: "rss" },
//					{ url: "blog/js.rss", title: "js title" },
//				],
//			},
//		},
//		manifest: "https://braisenly.com/manifest.json",
//	};
//}

//export const metadata: Metadata = {
//	title: "Best Recipes & Cooking Tips | Your Site Name",
//	description:
//		"Discover the best recipes, cooking tips, and culinary inspiration on Your Site Name. Perfect for home cooks and food enthusiasts.",
//	keywords: [
//		"recipes",
//		"cooking tips",
//		"food inspiration",
//		"home cooking",
//		"culinary tips",
//	],
//	authors: [{ name: "John Doe", url: "https://braisenly.com/johndoe" }],
//	applicationName: "Your Site Name",
//	generator: "Next.js 15",
//	themeColor: "#ffffff",
//	viewport: "width=device-width, initial-scale=1",
//	icons: {
//		icon: [
//			{ url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
//			{ url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
//			{ url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
//			{ url: "/icons/apple-touch-icon-57x57.png", sizes: "57x57" },
//			{ url: "/icons/apple-touch-icon-60x60.png", sizes: "60x60" },
//			{ url: "/icons/apple-touch-icon-72x72.png", sizes: "72x72" },
//			{ url: "/icons/apple-touch-icon-76x76.png", sizes: "76x76" },
//			{ url: "/icons/apple-touch-icon-114x114.png", sizes: "114x114" },
//			{ url: "/icons/apple-touch-icon-120x120.png", sizes: "120x120" },
//			{ url: "/icons/apple-touch-icon-144x144.png", sizes: "144x144" },
//			{ url: "/icons/apple-touch-icon-152x152.png", sizes: "152x152" },
//			{ url: "/icons/apple-touch-icon-180x180.png", sizes: "180x180" },
//		],
//	},
//	manifest: "/manifest.json",
//	appleWebApp: {
//		capable: true,
//		title: "Your Site Name",
//		statusBarStyle: "black-translucent",
//	},
//	openGraph: {
//		title: "Best Recipes & Cooking Tips | Your Site Name",
//		description:
//			"Discover the best recipes, cooking tips, and culinary inspiration on Your Site Name. Perfect for home cooks and food enthusiasts.",
//		url: "https://braisenly.com",
//		siteName: "Your Site Name",
//		images: [
//			{
//				url: "https://braisenly.com/og-image.jpg",
//				width: 1200,
//				height: 630,
//				alt: "A delicious dish from Your Site Name",
//			},
//		],
//		locale: "en_US",
//		type: "website",
//	},
//	twitter: {
//		card: "summary_large_image",
//		site: "@site_account",
//		creator: "@creator_account",
//		title: "Best Recipes & Cooking Tips | Your Site Name",
//		description:
//			"Discover the best recipes, cooking tips, and culinary inspiration on Your Site Name. Perfect for home cooks and food enthusiasts.",
//		images: ["https://braisenly.com/twitter-image.jpg"],
//	},
//	robots: "index, follow",
//	other: {
//		"msapplication-TileColor": "#ffffff",
//		"msapplication-config": "/browserconfig.xml",
//	},
//};

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
//			url: "https://github.com/abmex",
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
//	icons: {
//		icon: "/favicon.ico",
//		shortcut: "/favicon-16x16.png",
//		apple: "apple-touch-icon.png",
//	},
//};
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
// 		absolute: config.blog.config.title.absolute,
// 		default: config.blog.config.title.default,
// 		template: config.blog.config.title.template,
// 	},
// 	description: config.blog.config.description,
// 	openGraph: {
// 		title: config.blog.config.title.default,
// 		description: config.blog.config.description,
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
				{/*{children}*/}
				<ThemeSwitcher>{children}</ThemeSwitcher>
			</body>
		</html>
	);
}
