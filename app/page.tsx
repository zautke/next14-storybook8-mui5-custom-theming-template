import { RecipeSchema } from "@components/typings/schemaOrgRecipe";
import { recipes } from "@constants/defaultRecipe";
import Link from "@mui/material/Link";

// Next link
import NextLink from "next/link";

export default async function Page() {
	return (
		<div>
			{recipes.map((recipe: RecipeSchema) => {
				return (
					<div>
						<Link
							key={`${recipe.name}`}
							href="/about"
							color="secondary"
							component={NextLink}
						>
							{recipe.name}
						</Link>
					</div>
				);
			})}
		</div>
	);
}
