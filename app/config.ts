//const buildConfig = () => {
//	//const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
//	//if (!blogId) throw new Error("NEXT_PUBLIC_BLOG_ID is missing");
//	const name = process.env.NEXT_PUBLIC_BLOG_DISPLAY_NAME || "Travel.";
//	const copyright = process.env.NEXT_PUBLIC_BLOG_COPYRIGHT || "Samantha";
//	const defaultTitle =
//		process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE || "Travel with Samantha";
//	const defaultDescription =
//		process.env.NEXT_PUBLIC_BLOG_DESCRIPTION ||
//		"Blog about travel and lifestyle.";

//	return {
//		baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
//		blog: {
//			name,
//			copyright,
//			metadata: {
//				title: {
//					absolute: defaultTitle,
//					default: defaultTitle,
//					template: `%s - ${defaultTitle}`,
//				},
//				description: defaultDescription,
//			},
//		},
//	};
//};

export const isProduction = process.env.NODE_ENV === "production";

const buildConfig = () => {
	const defaultTitle =
		process.env.NEXT_DEFAULT_METADATA_DEFAULT_TITLE ||
		"Braisenly: How to think about food";

	return {
		baseUrl:
			process.env.NEXT_PUBLIC_BASE_URL || isProduction
				? "https://braisenly.com"
				: "http://localhost:3000",
		title: {
			absolute: defaultTitle,
			default: defaultTitle,
			template: `%s | ${defaultTitle}`,
		},
		description:
			"A culinary exploration of how food is to be approached and considered",
	};
};

export const config = buildConfig();
