/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	experimental: {
		typedRoutes: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "place-hold.it",
			},
		],
	},
	//async headers() {
	//	return [
	//		{
	//			// Matching all API routes
	//			source: "/api/:path*",
	//			headers: [
	//				{
	//					key: "Access-Control-Allow-Origin",
	//					value: "http://localhost:9000", // Whitelist your WebSocket server URL
	//				},
	//				{
	//					key: "Access-Control-Allow-Methods",
	//					value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
	//				},
	//				{
	//					key: "Access-Control-Allow-Headers",
	//					value:
	//						"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
	//				},
	//				{
	//					key: "Access-Control-Allow-Credentials",
	//					value: "true",
	//				},
	//			],
	//		},
	//	];
	//},
};

export default bundleAnalyzer(nextConfig);
