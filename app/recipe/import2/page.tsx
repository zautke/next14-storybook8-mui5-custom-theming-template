import RecipeCard from "@/components/RecipeCard";
import {
	defaultRecipeSchema,
	sampleRecipe_grilledcorn,
} from "@/constants/defaultRecipe";
import RecipeProvider from "@/lib/RecipeProvider";
import React from "react";
import ImportRecipe from "./ImportRecipe";
//import ImportRecipe from './ImportRecipe'

export default function Page() {
	return <RecipeCard {...sampleRecipe_grilledcorn} />;
}
