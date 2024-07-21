"use client";

import { RecipeSchema } from "@components/typings/schemaOrgRecipe";
import { defaultRecipeSchema as defaultRecipe } from "@constants/defaultRecipe";
import React, {
	type PropsWithChildren,
	ReactNode,
	createContext,
	useEffect,
	useState,
} from "react";

export type HasRecipeProp = { value: RecipeSchema; children: ReactNode };

const context = {
	value: defaultRecipe,
	children: null,
};

export const RecipeContext = createContext<HasRecipeProp>(context);
export default () =>
	({ children }: PropsWithChildren) => {
		const [recipe, _setRecipe] = useState<HasRecipeProp>({
			value: defaultRecipe,
			children: null,
		});

		return (
			<RecipeContext.Provider value={recipe}>{children}</RecipeContext.Provider>
		);
	};
