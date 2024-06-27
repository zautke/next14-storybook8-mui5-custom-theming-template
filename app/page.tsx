import type { FC } from "react";
import RecipeCard from "@components/RecipeCard";

const Page: FC = () => (
	<RecipeCard name={"blah"} recipeIngredient={[]} recipeInstructions={[]} />
);
//const Page: FC = () => <<div>Your mom.</div>>;
export default Page;
