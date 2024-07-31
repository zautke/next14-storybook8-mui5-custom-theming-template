/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

console.log("process.env.NODE_ENV:  ", process.env.NODE_ENV);

const nextConfig = {
	//swcMinify: true,
	experimental: {},
	...(process.env.NODE_ENV === "production" ? { output: "standalone" } : {}),
	images: {
		imageSizes: [16, 32, 48, 64, 96, 128, 256],
		domains: ["images.unsplash.com"],
		minimumCacheTTL: 3600,
		formats: ["image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "place-hold.it",
			},
		],
	},
};

export default bundleAnalyzer(nextConfig);
