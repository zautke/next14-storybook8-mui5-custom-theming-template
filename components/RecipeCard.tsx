import React, { type ReactNode } from "react";
import Image from "next/image";
import { fetchRecipe } from "@components/actions/recipeServer";
import { v4 as uuid } from "uuid";
import { Recipe as sRecipe } from "schema-dts";
import {
	type Person,
	type RecipeSchema,
	type ImageObject,
	type NutritionInformation,
	type RecipeIngredient,
	renderRecipeInstructions,
	HowToStepType,
	HowToSectionType,
} from "@typings/schemaOrgRecipe";
import {
	defaultRecipeSchema,
	sampleRecipe_charredSalsaVerde,
	sampleRecipe_pozole,
} from "@constants/defaultRecipe";
import { isHowToSection, isHowToStep, parseRecipe } from "@util/recipeParser";
import { FullJsonArray, FullJsonValue } from "./typings/util";
import { Rating, Typography } from "@mui/material";
import { HowToSection, HowToStep } from "@util/recipeFormatter";
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

export default function RecipeCard(
	_recip: RecipeSchema = sampleRecipe_charredSalsaVerde,
): ReactNode {
	//const recipe: RecipeSchema | null = await fetchRecipe(url);,

	const recipe = sampleRecipe_charredSalsaVerde;
	// console.log(`\n\nrecipe: ${JSON.stringify(recipe, null, 2)}\n\n`);
	return (
		<div>
			<h1>Recipe</h1>
			{recipe ? (
				<div>
					<h2>{recipe.name}</h2>
					<p>{recipe.description}</p>
					{recipe.image && Array.isArray(recipe.image) && (
						<div>
							{(recipe.image as ImageObject[]).map((img) => (
								<Image
									key={uuid()}
									width={(img.width as number) || 200}
									height={(img.height as number) || 200}
									src={(img.url as string) || "https://place-hold.it/120"}
									alt={recipe.name}
								/>
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
						<ul>
							{recipe.recipeIngredient &&
								(recipe.recipeIngredient as RecipeIngredient[]).map(
									(ingredient) => <li key={uuid()}>{ingredient}</li>,
								)}
						</ul>
					</div>
					<div></div>
					<div>
						<h3>Instructions:</h3>
						<ul key={`instructions-${recipe.name}`}>
							{(recipe.recipeInstructions as FullJsonArray) &&
								recipe.recipeInstructions.map((el) =>
									isHowToSection(el) ? (
										<HowToSection
											section={JSON.stringify(el as HowToSectionType)}
											render={(section) => (
												<>
													<h5>{(section as HowToSectionType).name}:</h5>
													<ul key={(section as HowToSectionType).name}>
														{(
															(section as HowToSectionType)
																.itemListElement as HowToStepType[]
														).map((step) => (
															<li key={`li-${step.text as string}`}>
																<HowToStep
																	key={step.text}
																	step={step}
																	render={(text) => text as string}
																/>
															</li>
														))}
													</ul>
												</>
											)}
											renderSectionSteps={(text) => <li>{text as string}</li>}
										/>
									) : isHowToStep(el) ? (
										<HowToStep
											step={{ text: (el as HowToStepType).text as string }}
											render={(text) => <li>{text as string}</li>}
										/>
									) : null,
								)}
						</ul>
					</div>
					{recipe.aggregateRating && (
						<p>
							<span>
								<Rating
									name="half-rating-read"
									value={recipe.aggregateRating.ratingValue as number}
									defaultValue={0}
									precision={0.1}
									readOnly
								/>
							</span>
							<span>{` ${recipe.aggregateRating.ratingValue} out of ${recipe.aggregateRating.ratingCount} reviews`}</span>
						</p>
					)}
					{/*{recipe.review && (
							<div>
								<h3>Reviews:</h3>
								<ul>
									{recipe.review.map((review) => (
										<li key={uuid()}>{review.reviewRating?.ratingValue}</li>
									))}
								</ul>
							</div>
						)}*/}
					{recipe.recipeCategory && (
						<p>Categories: {recipe.recipeCategory.join(", ")}</p>
					)}
					{recipe.recipeCuisine && (
						<p>Cuisines: {recipe.recipeCuisine.join(", ")}</p>
					)}
					{recipe.keywords && (
						<p>Keywords: ((recipe.keywords as string[]).join(", "))</p>
					)}
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
	);
}
