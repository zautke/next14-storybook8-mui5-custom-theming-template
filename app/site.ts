type SiteConfig = {
	name: string;
	description: string;
	url: string;
	ogImage: string;
	links: {
		twitter: string;
		github: string;
	};
};

export const siteConfig: SiteConfig = {
	name: "Braisenly: How Kitchen Should Be Done",
	description:
		"A culinary blog exploring the creative approach and treatment of food.",
	url: "https://braisenly.com",
	ogImage: "https://braisenly.com/og",
	links: {
		twitter: "https://twitter.com/braisenly",
		github: "https://github.com/abstractmechanix/braisenly",
	},
};
