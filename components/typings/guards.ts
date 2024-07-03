import { RecipeSchema } from '@typings/schemaOrgRecipe'

export const isRecipeSchema = (recipe: unknown): recipe is RecipeSchema =>
	recipe !== null &&
	typeof recipe === 'object' &&
	'@context' in recipe &&
	'name' in recipe &&
	typeof recipe.name === 'string' &&
	'recipeIngredient' in recipe &&
	'recipeInstructions' in recipe
