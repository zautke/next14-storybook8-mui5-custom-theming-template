"use client";

import RecipeCard from "@components/RecipeCard";
import type { RecipeSchema } from "@components/typings/schemaOrgRecipe";
import {
	type ReadonlyURLSearchParams,
	useParams,
	useSearchParams,
} from "next/navigation";

function Recipe() {
	const searchParams = useSearchParams();

	const recipeParam = searchParams.get("recipe");
	const recipe = JSON.parse(recipeParam as string) as RecipeSchema;
	console.log("recipe: ", recipe);
	return <RecipeCard {...recipe} />;
}

export default Recipe;
