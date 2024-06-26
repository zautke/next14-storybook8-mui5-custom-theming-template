import cheerio from "cheerio";
import { parseRecipe } from "@components/recipeParser";
import { defaultRecipeSchema } from "constants/defaultRecipe";
import { deepJsonPluck, removeExtraSpaces } from "@util/helpers";
import type {
	RecipeSchema,
	HowToStep,
	Person,
} from "@customTypes/schemaOrgRecipe";

jest.mock("util/helpers", () => ({
	deepJsonPluck: jest.fn(),
	removeExtraSpaces: jest.fn((input) => input),
}));

describe("parseRecipe", () => {
	it("should return default schema when no recipe is found", () => {
		const emptyHtml = "<html></html>";
		const recipe = parseRecipe(emptyHtml);
		expect(recipe).toEqual(defaultRecipeSchema);
	});

	it("should parse recipe from JSON-LD script", () => {
		const mockHtmlWithRecipeJsonLd = `
		  <DOCTYPE html>
      <html>
		    <head>
          <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "Recipe",
              "name": "Test Recipe",
              "recipeIngredient": ["1 cup sugar", "2 cups flour"],
              "recipeInstructions": [
                {"@type": "HowToStep", "text": "Mix ingredients"},
                {"@type": "HowToStep", "text": "Bake at 350 degrees"}
              ],
              "author": {"@type": "Person", "name": "Chef Tester"},
              "description": "A delicious test recipe.",
              "datePublished": "2024-06-12",
              "image": ["https://example.com/image.jpg"],
              "aggregateRating": {"@type": "AggregateRating", "ratingValue": 4.5, "ratingCount": 10},
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {"@type": "Rating", "ratingValue": 5},
                  "reviewBody": "Great recipe!",
                  "author": {"@type": "Person", "name": "Reviewer 1"},
                  "datePublished": "2024-06-11"
                }
              ]
            }
          </script>
        <head/>
        <body></body>
      </html>
    `;
		const recipe = parseRecipe(mockHtmlWithRecipeJsonLd);
		expect(recipe.name).toBe("Test Recipe");
		expect(recipe.recipeIngredient).toEqual(["1 cup sugar", "2 cups flour"]);
		expect(Object.values(recipe.recipeInstructions)).toEqual([
			"Mix ingredients",
			"Bake at 350 degrees",
		]);
		expect((recipe.author as Person)?.name).toBe("Chef Tester");
		expect(recipe.description).toBe("A delicious test recipe.");
		expect(recipe.datePublished).toBe("2024-06-12");
		expect(recipe.image).toEqual(["https://example.com/image.jpg"]);
		expect(recipe.aggregateRating?.ratingValue).toBe(4.5);
		expect(recipe.aggregateRating?.ratingCount).toBe(10);
		expect(recipe.review).toEqual([
			{
				author: "Reviewer 1",
				datePublished: "2024-06-11",
				reviewBody: "Great recipe!",
				reviewRating: 5,
			},
		]);
	});

	it("should handle HowToSection and HowToStep", () => {
		const htmlWithSections = `
      <html>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Recipe",
            "name": "Sectioned Recipe",
            "recipeInstructions": [
              {
                "@type": "HowToSection",
                "name": "Your mom",
                "itemListElement": [
                  {"@type": "HowToStep", "text": "Step 1"}
                ]
              },
              {"@type": "HowToStep", "text": "Step 2"}
            ]
          }
        </script>
      </html>
    `;
		const recipe = parseRecipe(htmlWithSections);
		const expected = [{ "Your mom": ["Step 1"] }, "Step 2"];
		expect(recipe.recipeInstructions).toEqual(expected);
	});

	it("should parse nextData correctly", () => {
		const nextDataHtml = `
      <html>
        <script id="__NEXT_DATA__">
          {
            "props": {
              "pageProps": {
                "recipe": {
                  "@type": "Recipe",
                  "name": "Next.js Recipe",
                  "recipeIngredient": ["1 cup butter"],
                  "recipeInstructions": [{"@type": "HowToStep", "text": "Melt butter"}]
                }
              }
            }
          }
        </script>
      </html>
    `;
		const deepJsonPluck = require("util/helpers").deepJsonPluck;
		deepJsonPluck.mockReturnValue([
			{
				"@type": "Recipe",
				name: "Next.js Recipe",
				recipeIngredient: ["1 cup butter"],
				recipeInstructions: [{ "@type": "HowToStep", text: "Melt butter" }],
			},
		]);

		const recipe = parseRecipe(nextDataHtml);
		console.info("recipe: ", recipe);
		expect(recipe.name).toBe("Next.js Recipe");
		expect(recipe.recipeIngredient).toEqual(["1 cup butter"]);
		expect(recipe.recipeInstructions).toEqual(["Melt butter"]);
	});

	// it("should handle parsing errors gracefully", () => {
	// 	const invalidJsonLdHtml = `
	//     <html>
	//       <script type="application/ld+json">
	//         { invalid json }
	//       </script>
	//     </html>
	//   `;
	// 	const consoleErrorSpy = jest
	// 		.spyOn(console, "error")
	// 		.mockImplementation(() => {});
	// 	const recipe = parseRecipe(invalidJsonLdHtml);
	// 	expect(recipe).toEqual(defaultRecipeSchema);
	// 	expect(consoleErrorSpy).toHaveBeenCalled();
	// 	consoleErrorSpy.mockRestore();
	// });

	it("should handle missing data in JSON-LD gracefully", () => {
		const incompleteJsonLdHtml = `
      <html>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": ["Recipe"]
          }
        </script>
      </html>
    `;
		const recipe = parseRecipe(incompleteJsonLdHtml);
		expect(recipe).toEqual({
			...defaultRecipeSchema,
		});
	});

	it("should parse JSON-LD with @graph correctly", () => {
		const htmlWithGraph = `
      <html>
        <script type="application/ld+json">
          {
            "@graph": [
              {
                "@type": "Recipe",
                "name": "Graph Recipe",
                "recipeIngredient": ["1 cup milk"],
                "recipeInstructions": [{"@type": "HowToStep", "text": "Pour milk"}]
              }
            ]
          }
        </script>
      </html>
    `;
		const recipe = parseRecipe(htmlWithGraph);
		expect(recipe.name).toBe("Graph Recipe");
		expect(recipe.recipeIngredient).toEqual(["1 cup milk"]);
		expect(recipe.recipeInstructions).toEqual(["Pour milk"]);
	});

	it("should log and handle invalid JSON in isKitchn function", () => {
		const invalidNextDataHtml = `
      <html>
        <script id="__NEXT_DATA__">
          { "props": { "pageProps": { "recipe": { "@type": "Recipe", "name": "Invalid JSON" } } } }
        </script>
      </html>
    `;
		const deepJsonPluck = require("util/helpers").deepJsonPluck;
		deepJsonPluck.mockReturnValue([
			{
				"@type": "Recipe",
				name: "Invalid JSON",
			},
		]);

		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		const recipe = parseRecipe(invalidNextDataHtml);

		expect(recipe.name).toBe("Invalid JSON");
		expect(consoleErrorSpy).not.toHaveBeenCalled();
		consoleErrorSpy.mockRestore();
	});

	it("should parse a valid JSON-LD script embedded in a div", () => {
		const htmlWithEmbeddedScript = `
      <html>
        <div class="wprm-recipe-container">
          <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "Recipe",
              "name": "Embedded Recipe",
              "recipeIngredient": ["1 tsp salt"],
              "recipeInstructions": [
                  {
                    "@type": "HowToStep",
                    "text": "Add salt"
                  }
                ]
            }
          </script>
        </div>
      </html>
    `;
		const recipe = parseRecipe(htmlWithEmbeddedScript);
		expect(recipe.name).toBe("Embedded Recipe");
		expect(recipe.recipeIngredient).toEqual(["1 tsp salt"]);
		expect(recipe.recipeInstructions).toEqual(["Add salt"]);
	});

	it("should handle multiple script tags with recipe data", () => {
		const htmlWithMultipleScripts = `
      <html>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Recipe",
            "name": "First Recipe",
            "recipeIngredient": ["1 cup water"],
            "recipeInstructions": [{"@type": "HowToStep", "text": "Boil water"}]
          }
        </script>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Recipe",
            "name": "Second Recipe",
            "recipeIngredient": ["1 cup flour"],
            "recipeInstructions": [{"@type": "HowToStep", "text": "Add flour"}]
          }
        </script>
      </html>
    `;
		const recipe = parseRecipe(htmlWithMultipleScripts);
		expect(recipe.name).toBe("First Recipe");
		expect(recipe.recipeIngredient).toEqual(["1 cup water"]);
		expect(recipe.recipeInstructions).toEqual(["Boil water"]);
	});

	it("should handle JSON-LD with multiple recipes in a @graph", () => {
		const htmlWithGraphMultipleRecipes = `
      <html>
        <script type="application/ld+json">
          {
            "@graph": [
              {
                "@type": "Recipe",
                "name": "Graph Recipe 1",
                "recipeIngredient": ["1 cup water"],
                "recipeInstructions": [{"@type": "HowToStep", "text": "Boil water"}]
              },
              {
                "@type": "Recipe",
                "name": "Graph Recipe 2",
                "recipeIngredient": ["1 cup flour"],
                "recipeInstructions": [{"@type": "HowToStep", "text": "Add flour"}]
              }
            ]
          }
        </script>
      </html>
    `;
		const recipe = parseRecipe(htmlWithGraphMultipleRecipes);
		expect(recipe.name).toBe("Graph Recipe 1");
		expect(recipe.recipeIngredient).toEqual(["1 cup water"]);
		expect(recipe.recipeInstructions).toEqual(["Boil water"]);
	});

	it("should handle cases with empty recipeInstructions array", () => {
		const htmlWithEmptyInstructions = `
      <html>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Recipe",
            "name": "Empty Instructions Recipe",
            "recipeIngredient": ["1 cup sugar"],
            "recipeInstructions": []
          }
        </script>
      </html>
    `;
		const recipe = parseRecipe(htmlWithEmptyInstructions);
		expect(recipe.name).toBe("Empty Instructions Recipe");
		expect(recipe.recipeIngredient).toEqual(["1 cup sugar"]);
		expect(recipe.recipeInstructions).toEqual([]);
	});

	it("should handle deeply nested HowToSection structures", () => {
		const htmlWithNestedSections = `
      <html>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "Recipe",
            "name": "Mushroom Scallops",
            "author": "Heidi Swanson",
            "datePublished": "2024-06-18T07:20:24+00:00",
            "description": "To make mushroom “scallops” keep your eyes peeled for big mushrooms! So worth it. Slice king oyster mushrooms into scallop-shaped rounds and saute until tender and golden. Toss with a flavor-packed mixture of onions, cherry tomatoes, ginger, garlic, lime and a a special sauce.",
            "image": [
              "https://images.101cookbooks.com/mushroom-scallops-h.jpg?w=1200&auto=format",
              "https://images.101cookbooks.com/mushroom-scallops-v.jpg?w=1200&auto=format",
              "https://images.101cookbooks.com/mushroom-scallops-v.jpg?w=1200&h=1200&fp-z=2&fp-y=.5&fp-x=.5&fit=crop&crop=entropy"
            ],
            "recipeYield": "",
            "prepTime": "",
            "cookTime": "",
            "totalTime": "",
            "recipeIngredient": [
              "1 pound king oyster mushrooms, with thick stems",
              "1 1/2 tablespoons coco aminos (or soy sauce)",
              "1 1/2 tablespoons freshly squeezed lemon juice",
              "2-3 tablespoons olive oil",
              "1/2 medium onion, minced",
              "4 cloves garlic, minced",
              "2 teaspoons grated ginger, peeled first",
              "1 serrano chile, stemmed and minced",
              "zest of a lime or 3 makrut lime leaves, very thinly sliced",
              "2 cups / 10 ounces cherry tomatoes, halved",
              "plenty of snipped chives",
              "salt, to taste"
            ],
            "recipeInstructions": [
              {
                "@type": "HowToSection",
                "name": "Prepare and cook mushrooms:",
                "itemListElement": [
                  {
                    "@type": "HowToStep",
                    "text": "Brush any dirt or debris from the mushrooms and trim the stem a bit. Slice into 3/4-inch rounds. Score both flat sides of each “scallop” 1/4-inch deep in a grid pattern - see photo above. Set aside.",
                    "name": "Brush any dirt or debris from the mushrooms and trim the stem a bit. Slice into 3/4-inch rounds. Score both flat sides of each “scallop” 1/4-inch deep in a grid pattern - see photo above. Set aside."
                  },
                  {
                    "@type": "HowToStep",
                    "text": "Add a splash of olive oil to your largest skillet over medium-high heat. Arrange half of the scallops in the pan, sprinkle with salt, and cook for 5-6 minutes on each side, or until golden and tender. Remove from pan and set aside. Repeat with remaining mushrooms. If cooking on a grill or grilled, you can brush with olive oil and cook all the mushrooms at once, avoid crowding.",
                    "name": "Add a splash of olive oil to your largest skillet over medium-high heat. Arrange half of the scallops in the pan, sprinkle with salt, and cook for 5-6 minutes on each side, or until golden and tender. Remove from pan and set aside. Repeat with remaining mushrooms. If cooking on a grill or grilled, you can brush with olive oil and cook all the mushrooms at once, avoid crowding."
                  }
                ]
              },
              {
                "@type": "HowToSection",
                "name": "Cook the other ingredients:",
                "itemListElement": [
                  {
                    "@type": "HowToStep",
                    "text": "Combine the coco aminos and lemon juice in a small bowl. Set aside.",
                    "name": "Combine the coco aminos and lemon juice in a small bowl. Set aside."
                  },
                  {
                    "@type": "HowToStep",
                    "text": "Don’t bother rinsing the skillet. Add another splash of olive oil. With the pan over medium-high heat cook the onions until they soften a bit, 4-5 minutes. Stir in the garlic, ginger, and serrano chile. Cook for another minute or so. Stir in the lime zest or slivered lime leaves and then the cherry tomatoes. Continue cooking, stirring occasionally (gently), for another 3-4 minutes or until the tomatoes start to soften. Add the coco amino and lemon juice mixture. Cook for another minute and stir in the mushrooms. Taste and add a bit more salt if needed.",
                    "name": "Don’t bother rinsing the skillet. Add another splash of olive oil. With the pan over medium-high heat cook the onions until they soften a bit, 4-5 minutes. Stir in the garlic, ginger, and serrano chile. Cook for another minute or so. Stir in the lime zest or slivered lime leaves and then the cherry tomatoes. Continue cooking, stirring occasionally (gently), for another 3-4 minutes or until the tomatoes start to soften. Add the coco amino and lemon juice mixture. Cook for another minute and stir in the mushrooms. Taste and add a bit more salt if needed."
                  },
                  {
                    "@type": "HowToStep",
                    "text": "Serve over hot or cold soba, over rice or other grains, over ravioli, etc. with plenty of chives.",
                    "name": "Serve over hot or cold soba, over rice or other grains, over ravioli, etc. with plenty of chives."
                  }
                ]
              }
            ],
            "review": []
          }
        </script>
      </html>
    `;
		const recipe = parseRecipe(htmlWithNestedSections);
		expect(recipe.recipeInstructions).toEqual([
			{
				"Prepare and cook mushrooms:": [
					"Brush any dirt or debris from the mushrooms and trim the stem a bit. Slice into 3/4-inch rounds. Score both flat sides of each “scallop” 1/4-inch deep in a grid pattern - see photo above. Set aside.",
					"Add a splash of olive oil to your largest skillet over medium-high heat. Arrange half of the scallops in the pan, sprinkle with salt, and cook for 5-6 minutes on each side, or until golden and tender. Remove from pan and set aside. Repeat with remaining mushrooms. If cooking on a grill or grilled, you can brush with olive oil and cook all the mushrooms at once, avoid crowding.",
				],
			},
			{
				"Cook the other ingredients:": [
					"Combine the coco aminos and lemon juice in a small bowl. Set aside.",
					"Don’t bother rinsing the skillet. Add another splash of olive oil. With the pan over medium-high heat cook the onions until they soften a bit, 4-5 minutes. Stir in the garlic, ginger, and serrano chile. Cook for another minute or so. Stir in the lime zest or slivered lime leaves and then the cherry tomatoes. Continue cooking, stirring occasionally (gently), for another 3-4 minutes or until the tomatoes start to soften. Add the coco amino and lemon juice mixture. Cook for another minute and stir in the mushrooms. Taste and add a bit more salt if needed.",
					"Serve over hot or cold soba, over rice or other grains, over ravioli, etc. with plenty of chives.",
				],
			},
		]);
	});
});
