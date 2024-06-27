import type { RecipeSchema } from "@typings/schemaOrgRecipe";
import type { FullJsonValue } from "@typings/util";

export const defaultRecipeSchema: RecipeSchema = {
	name: "",
	author: "",
	datePublished: "",
	description: "",
	image: [],
	recipeYield: "",
	prepTime: "",
	cookTime: "",
	totalTime: "",
	recipeIngredient: [],
	recipeInstructions: [],
	howToTip: [],
	aggregateRating: undefined,
	review: undefined,
	recipeCategory: undefined,
	recipeCuisine: undefined,
	keywords: undefined,
	nutrition: undefined,
};

export const sampleRecipe: RecipeSchema = {
	name: "Grilled Corn",
	author: {
		name: "Love and Lemons",
	},
	datePublished: "2024-06-18T08:00:26+00:00",
	description:
		"Learn how to grill corn on the cob two ways—in and out of the husk! Choose the first method if you like your corn sweeter and juicier, and choose the second if you like it smoky and charred. Serve with butter, salt, and pepper, or try one of the seasoning suggestions in the post above.",
	image: [
		"https://cdn.loveandlemons.com/wp-content/uploads/2023/06/grilled-corn-on-the-cob-500x500.jpg",
		"https://cdn.loveandlemons.com/wp-content/uploads/2023/06/grilled-corn-on-the-cob-500x375.jpg",
		"https://cdn.loveandlemons.com/wp-content/uploads/2023/06/grilled-corn-on-the-cob-480x270.jpg",
		"https://cdn.loveandlemons.com/wp-content/uploads/2023/06/grilled-corn-on-the-cob.jpg",
	],
	recipeYield: "",
	prepTime: "",
	cookTime: "",
	totalTime: "",
	recipeIngredient: [
		"4 to 8 ears fresh sweet corn",
		"Butter",
		"Sea salt",
		"Freshly ground black pepper",
	],
	recipeInstructions: [
		{
			"Husk-on method": [
				"Peel back the corn husks, leaving them attached at the base of each ear of corn. Remove the silks as best you can and close the husks back over the corn cobs. Soak the corn in a large pot of cold water for 10 minutes. This will prevent the husks from burning too much on the grill. Drain and pat dry.",
				"Preheat a grill to medium-high heat. Place the corn on the grill and cook, turning every 3 to 5 minutes, until all sides of the corn are cooked, about 15 minutes. Remove from the grill and tie back the husks to use as a handle. Serve with butter, salt, and pepper.",
			],
		},
		{
			"Husked method": [
				"Shuck the corn and remove the silks.",
				"Preheat a grill or grill pan to medium-high heat. Place the corn on the grill and cook, turning every 3 to 5 minutes, until all sides of the corn are cooked and light char marks form, about 15 minutes. Remove from the grill and serve with butter, salt, and pepper.",
			],
		},
	],
	howToTip: [],
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: "5",
		ratingCount: "6",
	},
};
