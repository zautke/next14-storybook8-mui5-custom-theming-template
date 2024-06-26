import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../../app/page";

jest.mock("../../app/actions/recipeServer", () => ({
	fetchRecipe: jest.fn(),
}));

const { fetchRecipe } = require("../../app/actions/recipeServer");

describe("HomePage", () => {
	test("renders loading text initially", async () => {
		fetchRecipe.mockResolvedValue(null);
		render(<HomePage />);
		expect(screen.getByText("Loading recipe...")).toBeInTheDocument();
	});

	test("renders recipe details when recipe is loaded", async () => {
		const recipe = {
			"@context": "http://schema.org",
			name: "Test Recipe",
			description: "This is a test recipe",
			recipeIngredient: ["1 cup of flour", "2 eggs"],
			recipeInstructions: ["Mix ingredients", "Bake at 350F for 20 minutes"],
			author: "Test Author",
			datePublished: "2024-06-25",
			image: ["test-image-url"],
			recipeYield: "4 servings",
			prepTime: "PT20M",
			cookTime: "PT40M",
			totalTime: "PT1H",
			howToTip: ["Test Tip 1", "Test Tip 2"],
			aggregateRating: "4.5",
			review: ["Test review 1", "Test review 2"],
			recipeCategory: ["Dessert"],
			recipeCuisine: ["American"],
			keywords: ["test", "recipe"],
			nutrition: "Test Nutrition Info",
		};

		fetchRecipe.mockResolvedValue(recipe);
		render(<RecipeCard />);

		expect(await screen.findByText("Test Recipe")).toBeInTheDocument();
		expect(screen.getByText("This is a test recipe")).toBeInTheDocument();
		expect(screen.getByText("1 cup of flour")).toBeInTheDocument();
		expect(screen.getByText("Mix ingredients")).toBeInTheDocument();
		expect(screen.getByText("Author: Test Author")).toBeInTheDocument();
		expect(screen.getByText("Date Published: 2024-06-25")).toBeInTheDocument();
		expect(screen.getByText("Yield: 4 servings")).toBeInTheDocument();
		expect(screen.getByText("Prep Time: PT20M")).toBeInTheDocument();
		expect(screen.getByText("Cook Time: PT40M")).toBeInTheDocument();
		expect(screen.getByText("Total Time: PT1H")).toBeInTheDocument();
		expect(screen.getByText("Test Tip 1")).toBeInTheDocument();
		expect(screen.getByText("Rating: 4.5")).toBeInTheDocument();
		expect(screen.getByText("Test review 1")).toBeInTheDocument();
		expect(screen.getByText("Categories: Dessert")).toBeInTheDocument();
		expect(screen.getByText("Cuisines: American")).toBeInTheDocument();
		expect(screen.getByText("Keywords: test, recipe")).toBeInTheDocument();
		expect(
			screen.getByText("Nutrition: Test Nutrition Info"),
		).toBeInTheDocument();
	});
});
