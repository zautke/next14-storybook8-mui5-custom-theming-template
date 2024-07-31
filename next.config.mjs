/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}\n`);

const nextConfig = {
	//swcMinify: true,
	experimental: {},
	...(process.env.NODE_ENV === "production" ? { output: "standalone" } : {}),
	images: {
		imageSizes: [16, 32, 48, 64, 96, 128, 256],
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

console.log(`nextConfig: ${JSON.stringify(nextConfig, 2, null)}\n`);

export default bundleAnalyzer(nextConfig);
