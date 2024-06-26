import type { RecipeSchema } from "@customTypes/schemaOrgRecipe";

export const defaultRecipeSchema: RecipeSchema = {
	"@context": "https://schema.org",
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
