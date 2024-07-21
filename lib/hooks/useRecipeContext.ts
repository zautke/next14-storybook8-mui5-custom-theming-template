import { useContext } from "react";

import { RecipeContext } from "@/lib/RecipeProvider";

export const useRecipeContext = async () => {
	const context = await useContext(RecipeContext);
	console.log("useRecipe context:", context);
	if (!context) {
		throw new Error("This cannot be used outside the RecipeProvider component");
	}
	return context;
};
