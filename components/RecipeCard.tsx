import { fetchRecipe } from "@components/actions/recipeServer";
import {
	defaultRecipeSchema,
	sampleRecipe_charredSalsaVerde,
	sampleRecipe_grilledcorn,
	sampleRecipe_pozole,
} from "@constants/defaultRecipe";
import { Rating, Typography } from "@mui/material";
import {
	type HowToSectionType,
	HowToStepType,
	type ImageObject,
	type NutritionInformation,
	type Person,
	type RecipeIngredient,
	type RecipeSchema,
	renderRecipeInstructions,
} from "@typings/schemaOrgRecipe";
import { HowToSection, HowToStep } from "@util/recipeFormatter";
import { isHowToSection, isHowToStep, parseRecipe } from "@util/recipeParser";
import { nanoid } from "nanoid";
import Image from "next/image";
import React, { type ReactNode } from "react";
import { Recipe as sRecipe } from "schema-dts";
import { type FullJsonArray, FullJsonValue } from "./typings/util";
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

export type ParsedHowToSectionType = {
	[key: string]: string[];
};

export default function RecipeCard(
	_recip: RecipeSchema = sampleRecipe_pozole,
): ReactNode {
	//const recipe: RecipeSchema | null = await fetchRecipe(url);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const isParsedHowToSection = (value: any): boolean => {
		const retval = typeof value === "object";
		//console.log(`\n\nisParsedHowToSection: ${retval}\n\n`);
		return retval;
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const isParsedHowToStep = (value: any): boolean => {
		const retval = typeof value === "string";
		//console.log(`\n\nisParsedHowToSection: ${retval}\n\n`);
		return retval;
	};

	const recipe = sampleRecipe_pozole;
	// console.log(`\n\nrecipe: ${JSON.stringify(recipe, null, 2)}\n\n`);
	return (
		<div>
			{recipe ? (
				<div>
					<h2>{recipe.name}</h2>
					<p>{recipe.description}</p>
					{recipe.image && Array.isArray(recipe.image) && (
						<div>
							{(recipe.image as ImageObject[]).map((img) => (
								<Image
									key={nanoid()}
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
									<li key={nanoid()}>{tip.toString()}</li>
								))}
							</ul>
						</div>
					)}
					<div>
						<h3>Ingredients:</h3>
						<ul>
							{recipe.recipeIngredient &&
								(recipe.recipeIngredient as RecipeIngredient[]).map(
									(ingredient) => <li key={nanoid()}>{ingredient}</li>,
								)}
						</ul>
					</div>
					<div></div>
					<div>
						<h3>Instructions:</h3>
						<ul key={`instructions-${recipe.name}`}>
							{(recipe.recipeInstructions as FullJsonArray) &&
								recipe.recipeInstructions.map((el) =>
									isParsedHowToSection(el) ? (
										<>
											{/*<div>JSON.stringify(isHowToSection(el))</div>*/}
											<HowToSection
												section={JSON.stringify(el as ParsedHowToSectionType)}
												render={(section) => (
													<li key={(section as HowToSectionType).name}>
														<h4>
															{
																Object.keys(
																	section as ParsedHowToSectionType,
																)[0]
															}
															:
														</h4>
														<ul key={(section as HowToSectionType).name}>
															{(section as ParsedHowToSectionType)[
																Object.keys(
																	section as ParsedHowToSectionType,
																)[0]
															].map((step) => (
																<li key={`li-${step as string}`}>
																	<HowToStep
																		key={step}
																		step={step as string}
																		render={(text) => text as string}
																	/>
																</li>
															))}
														</ul>
													</li>
												)}
												renderSectionSteps={(text) => <li>{text as string}</li>}
											/>
										</>
									) : isParsedHowToStep(el) ? (
										<HowToStep
											step={el as string}
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
										<li key={nanoid()}>{review.reviewRating?.ratingValue}</li>
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
