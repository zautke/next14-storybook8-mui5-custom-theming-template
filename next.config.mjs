/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
	swcMinify: true,
	experimental: {},
	output: "standalone",
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
