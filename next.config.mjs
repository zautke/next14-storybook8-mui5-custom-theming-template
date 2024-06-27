/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
	// eslint-disable-next-line no-undef
	enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	experimental: {
		typedRoutes: true,
	},
};

export default bundleAnalyzer(nextConfig);
