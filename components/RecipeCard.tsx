import React, { type ReactNode } from "react";
import Image from "next/image";
import { fetchRecipe } from "@components/actions/recipeServer";
import { v4 as uuid } from "uuid";
import { Recipe as sRecipe } from "schema-dts";
import {
	type Person,
	type RecipeInstruction,
	type RecipeSchema,
	type ImageObject,
	type NutritionInformation,
	type RecipeIngredient,
	renderRecipeInstructions,
} from "@typings/schemaOrgRecipe";
import { defaultRecipeSchema, sampleRecipe } from "@constants/defaultRecipe";
import { parseRecipe } from "@util/recipeParser";
import { FullJsonArray, FullJsonValue } from "./typings/util";
//import { FullJsonArray } from "@typings/util";

// type Recipe = {
// 	"@context": string;
// 	name: string;
// 	author?: string;
// 	datePublished?: string;
// 	description?: string;
// 	image?: string[];
// 	recipeYield?: string;
// 	prepTime?: string;
// 	cookTime?: string;
// 	totalTime?: string;
// 	howToTip?: string[];
// 	recipeIngredient: string[];
// 	recipeInstructions: string[];
// 	aggregateRating?: string;
// 	review?: string[];
// 	recipeCategory?: string[];
// 	recipeCuisine?: string[];
// 	keywords?: string[];
// 	nutrition?: string;
// };

console.log(
	`\n\ningredient: ${sampleRecipe.recipeIngredient[0] as RecipeIngredient}\n\n`,
);

export default function RecipeCard(
	_recip: RecipeSchema = sampleRecipe,
): ReactNode {
	//const recipe: RecipeSchema | null = await fetchRecipe(url);

	const recipe = sampleRecipe;
	return (
		<>
			<div>
				<h1>Recipe</h1>
				{recipe ? (
					<div>
						<h2>{recipe.name}</h2>
						<p>{recipe.description}</p>
						{recipe.image && recipe.image.length > 0 && (
							<div>
								{(recipe.image as ImageObject[]).map((img) => (
									<Image key={uuid()} src={img.url} alt={recipe.name} />
								))}
							</div>
						)}
						<p>Author: {recipe.author && (recipe.author as Person).name} </p>
						<p>Date Published: {recipe.datePublished}</p>
						<p>Yield: {recipe.recipeYield}</p>
						<p>Prep Time: {recipe.prepTime}</p>
						<p>Cook Time: {recipe.cookTime}</p>
						<p>Total Time: {recipe.totalTime}</p>
						{recipe.howToTip && (
							<div>
								<h3>Tips:</h3>
								<ul>
									{recipe.howToTip.map((tip) => (
										<li key={uuid()}>{tip.toString()}</li>
									))}
								</ul>
							</div>
						)}
						<div>
							<h3>Ingredients:</h3>
							{/* <ul>
								{recipe.recipeIngredient &&
									(recipe.recipeIngredient as RecipeIngredient[]).map(
										(ingredient) => <li key={uuid()}>{ingredient}</li>,
									)}
							</ul> */}
						</div>
						<div>
							<h3>Instructions:</h3>
							<ol>
								{(recipe.recipeInstructions as FullJsonArray) && (
									<li key={uuid()}>
										{renderRecipeInstructions(
											recipe.recipeInstructions as FullJsonArray,
										)}
									</li>
								)}
							</ol>
						</div>
						{recipe.aggregateRating && (
							<p>Rating: {recipe.aggregateRating.ratingValue}</p>
						)}
						{recipe.review && (
							<div>
								<h3>Reviews:</h3>
								<ul>
									{recipe.review.map((review) => (
										<li key={uuid()}>{review.reviewRating.ratingValue}</li>
									))}
								</ul>
							</div>
						)}
						{recipe.recipeCategory && (
							<p>Categories: {recipe.recipeCategory.join(", ")}</p>
						)}
						{recipe.recipeCuisine && (
							<p>Cuisines: {recipe.recipeCuisine.join(", ")}</p>
						)}
						{recipe.keywords && <p>Keywords: {recipe.keywords.join(", ")}</p>}
						{recipe.nutrition && (
							<p>
								Nutrition: {(recipe.nutrition as NutritionInformation).calories}
							</p>
						)}
					</div>
				) : (
					<p>Loading recipe...</p>
				)}
			</div>
		</>
	);
}
