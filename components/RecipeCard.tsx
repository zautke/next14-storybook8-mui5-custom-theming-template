import React from "react";
import Image from "next/image";
import { fetchRecipe } from "@components/actions/recipeServer";
import { v4 as uuid } from "uuid";

type Recipe = {
	"@context": string;
	name: string;
	author?: string;
	datePublished?: string;
	description?: string;
	image?: string[];
	recipeYield?: string;
	prepTime?: string;
	cookTime?: string;
	totalTime?: string;
	howToTip?: string[];
	recipeIngredient: string[];
	recipeInstructions: string[];
	aggregateRating?: string;
	review?: string[];
	recipeCategory?: string[];
	recipeCuisine?: string[];
	keywords?: string[];
	nutrition?: string;
};

export default async function RecipeCard() {
	const url = "base64_encoded_url"; // Replace this with the actual URL or base64 encoded URL
	const recipe: Recipe | null = await fetchRecipe(url);

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
								{recipe.image.map((img) => (
									<Image key={uuid()} src={img} alt={recipe.name} />
								))}
							</div>
						)}
						<p>Author: {recipe.author}</p>
						<p>Date Published: {recipe.datePublished}</p>
						<p>Yield: {recipe.recipeYield}</p>
						<p>Prep Time: {recipe.prepTime}</p>
						<p>Cook Time: {recipe.cookTime}</p>
						<p>Total Time: {recipe.totalTime}</p>
						{recipe.howToTip && (
							<div>
								<h3>Tips:</h3>
								<ul>
									{recipe.howToTip.map((tip, key) => (
										<li key={uuid()}>{tip}</li>
									))}
								</ul>
							</div>
						)}
						) : (
						<div>
							<h3>Ingredients:</h3>
							<ul>
								{recipe.recipeIngredient.map((ingredient, key) => (
									<li key={uuid()}>{ingredient}</li>
								))}
							</ul>
						</div>
						<div>
							<h3>Instructions:</h3>
							<ol>
								{recipe.recipeInstructions.map((instruction, key) => (
									<li key={uuid()}>{instruction}</li>
								))}
							</ol>
						</div>
						{recipe.aggregateRating && <p>Rating: {recipe.aggregateRating}</p>}
						{recipe.review && (
							<div>
								<h3>Reviews:</h3>
								<ul>
									{recipe.review.map((review, key) => (
										<li key={uuid()}>{review}</li>
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
						{recipe.nutrition && <p>Nutrition: {recipe.nutrition}</p>}
					</div>
				) : (
					<p>Loading recipe...</p>
				)}
			</div>
		</>
	);
}
