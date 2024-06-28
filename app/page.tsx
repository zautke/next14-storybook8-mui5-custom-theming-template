import type { FC } from "react";
import RecipeCard from "@components/RecipeCard";
import ThemeRegistry from "@components/ThemeRegistry";

const Page: FC = () => (
	<ThemeRegistry>
		<RecipeCard name={"blah"} recipeIngredient={[]} recipeInstructions={[]} />
	</ThemeRegistry>
);

export default Page;
