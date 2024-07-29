import { config } from "./config";

export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
			},
		],
		sitemap: `${config.baseUrl}/sitemap.xml`,
	};
}
