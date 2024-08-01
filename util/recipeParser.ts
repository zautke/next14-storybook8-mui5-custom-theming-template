import cheerio from "cheerio";

import { defaultRecipeSchema } from "@constants/defaultRecipe";
import { deepJsonPluck, removeExtraSpaces } from "@helpers";
import type {
	HowToSectionType,
	HowToStepType,
	Person,
	RecipeSchema,
	Review,
} from "@typings/schemaOrgRecipe";
import type { FullJsonArray, FullJsonValue } from "@typings/util";
import { normalizeJsonData } from "./recipeFormatter";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isHowToStep(value: any): value is HowToStepType {
	return (
		value && value["@type"] === "HowToStep" && typeof value.text === "string"
	);
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isHowToStepArray(value: any): value is HowToStepType {
	return value && Array.isArray(value) && value.every(isHowToStep);
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isHowToSection(value: any): value is HowToSectionType {
	console.log(
		"\n\n---------isHowToSection(value)----------------------------\n\n",
		value,
	);
	return (
		value &&
		typeof value.name === "string" &&
		value["@type"] === "HowToSection" &&
		Array.isArray(value.itemListElement) &&
		value.itemListElement.every(isHowToStep)
	);
}

//export const RecipeInstructions: FC<RenderFunction> = (
//	json: FullJsonArray,
//	renderHowToStep: RenderFunction,
//	renderHowToSection: RenderFunction,
//	renderHowToSectionStep: RenderFunction,
//): ReactNode {
//	const recipeInstructions: ReactNode = [];

//	if (json) {
//		for (const section of json) {
//			if (isHowToSection(section)) {
//				//console.log(
//				//	"\n\n---------section.name----------------------------\n\n",
//				//	section.name,
//				//);
//				recipeInstructions.push({
//					[section.name as string]: renderHowToStep(section.itemListElement),
//				});
//			} else if (isHowToStep(section)) {
//				recipeInstructions.push(section.text);
//			}
//		}
//	} else {
//		console.log("No recipe instructions found:", JSON.stringify(json, null, 2));
//	}
//	// console.log(
//	// 	"\n\n---------recipeInstructions.keys()----------------------------\n\n",
//	// 	JSON.stringify(Object.keys(recipeInstructions), null, 2),
//	// );

//	return recipeInstructions;
//}

export function parseHowToStep(steps: FullJsonArray): FullJsonArray {
	const howToStepsText: FullJsonArray = [];

	for (const step of steps) {
		if (isHowToStep(step)) howToStepsText.push(step.text);
	}

	return howToStepsText;
}

export function parseRecipeInstruction(
	json: FullJsonValue | undefined,
): string | undefined {
	let recipeInstruction: string = "<empty>";

	if (json) {
		if (isHowToSection(json)) {
			//console.log(
			//	"\n\n---------json.name----------------------------\n\n",
			//	json.name,
			//);
			recipeInstruction = `${json.name}:`;
			if (json.itemListElement) {
				parseHowToStep(json.itemListElement);
			}
		} else if (isHowToStep(json)) {
			recipeInstruction = json.text;
		} else {
			console.log(
				"No recipe instruction found:",
				JSON.stringify(json, null, 2),
			);
		}
		// console.log(
		// 	"\n\n---------recipeInstructions.keys()----------------------------\n\n",
		// 	JSON.stringify(Object.keys(recipeInstructions), null, 2),
		// );
	}
	return recipeInstruction;
}

export function parseRecipeInstructions(json: FullJsonArray): FullJsonArray {
	const recipeInstructions: FullJsonArray = [];

	if (json) {
		for (const section of json) {
			if (isHowToSection(section)) {
				//console.log(
				//	"\n\n---------section.name----------------------------\n\n",
				//	section.name,
				//);
				if (section.itemListElement) {
					recipeInstructions.push({
						[section.name as string]: parseHowToStep(section.itemListElement),
					});
				}
			} else if (isHowToStep(section)) {
				recipeInstructions.push(section.text);
			}
		}
	} else {
		console.log("No recipe instructions found:", JSON.stringify(json, null, 2));
	}
	// console.log(
	// 	"\n\n---------recipeInstructions.keys()----------------------------\n\n",
	// 	JSON.stringify(Object.keys(recipeInstructions), null, 2),
	// );

	return recipeInstructions;
}

export function parseRecipe(htmlContent: string): RecipeSchema {
	const $ = cheerio.load(htmlContent);
	let recipeSchema: RecipeSchema | null = null;

	const isKitchn = (): FullJsonValue | null => {
		const nextData: string | null = $('script[id="__NEXT_DATA__"]').html();
		if (!nextData) return false;

		const pattern = /"@type":"Recipe"/;

		const pluckedNextData = deepJsonPluck(JSON.stringify(nextData), pattern);
		console.log(
			"\n\n---------------------------------INISKITCN: pluckedNextData----------------------------------------\n",
			pluckedNextData,
		);
		const parsedNextData = <string>pluckedNextData;
		console.log(
			"\n\n---------------------------------INISKITCN: parsedNextData----------------------------------------\n",
			parsedNextData,
		);
		let recipeSchemaOrgData: FullJsonArray | string;
		// deepJsonPluck(
		// 	parsedNextData,
		// 	pattern,
		// );
		recipeSchemaOrgData = JSON.stringify(parsedNextData);

		console.log(
			"\n\n---------------------------------INISKITCN: recipeSchemaOrgData----------------------------------------\n",
			recipeSchemaOrgData,
		);
		if (recipeSchemaOrgData) {
			return recipeSchemaOrgData;
		}

		return false;
	};

	if (isKitchn()) {
		try {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const item = JSON.parse(isKitchn() as any);
			console.log(
				"\n\n---------------------------------INISKITCN: it----------------------------------------\n",
				item,
			);
			// const item = JSON.parse(isKitchn() as string);
			recipeSchema = {
				...defaultRecipeSchema,
				name: item.name || "",
				recipeIngredient: item.recipeIngredient
					? (removeExtraSpaces(item.recipeIngredient) as string[])
					: [],
				...(item.recipeInstructions && {
					recipeInstructions: parseRecipeInstructions(
						item.recipeInstructions as FullJsonArray,
					),
				}),
				author: item.author ? (item.author as Person).name : "",
				description: item.description || "",
				datePublished: item.datePublished || "",
				image: item.image || [],
				aggregateRating: item.aggregateRating
					? {
							"@type": "AggregateRating",
							ratingValue: item.aggregateRating.ratingValue,
							ratingCount: item.aggregateRating.ratingCount,
						}
					: undefined,
				...(item.review && {
					review: item.review.map((rev: Review) => ({
						author: rev.author || "Unknown",
						datePublished: rev.datePublished || "Unknown",
						reviewBody: rev.reviewBody || "No review body",
						reviewRating:
							typeof rev.reviewRating === "object"
								? rev.reviewRating.ratingValue
								: "No rating",
					})),
				}),
			};
		} catch (e) {
			console.error("Error parsing NEXT_DATA", (e as Error).message);
		}
	} else {
		//console.log("in <script> parse");
		// for JSON-LD structured data embedded in a <script> element
		const jsonLdScriptElement =
			[
				$('script[type="application/ld+json"]')
					.map((_, el) => $(el).html())
					.filter((_, el) => el.toString().includes('"@type":"Recipe"'))
					.toArray(),
			][0][0] ||
			$('script[class="yoast-schema-graph"]').html() ||
			$(
				'div[class="wprm-recipe-container"] > script[type="application/ld+json"]',
			).html() ||
			$('script[class="yoast-schema-graph"]').html() ||
			$('script[type="application/ld+json"]').html();

		//console.log("\n\n---------jsonLdScriptElement----------------------------\n\n", JSON.stringify(jsonLdScriptElement, null, 2))
		if (jsonLdScriptElement) {
			try {
				const scriptString = jsonLdScriptElement.toString();

				const normalizedJsonData = normalizeJsonData(scriptString);
				// console.log(
				// 	"\n\n---------jsonLdScriptElement----------------------------\n\n",
				// 	normalizedJsonData,
				// );
				// const parsedJsonData = JSON.parse(jsonLdScriptElement.data?.toString() ?? jsonLdScriptElement.toString())
				const parsedJsonData = JSON.parse(normalizedJsonData);
				console.log(
					"\n\n--------------parsedJsonData----------------",
					JSON.stringify(parsedJsonData, null, 2),
				);

				const recipeSchemaOrgData = parsedJsonData["@graph"]
					? parsedJsonData["@graph"]
					: parsedJsonData.length
						? parsedJsonData
						: [parsedJsonData];

				for (const item of recipeSchemaOrgData) {
					if ((item["@type"] as string).includes("Recipe")) {
						recipeSchema = {
							...defaultRecipeSchema,
							...(item.name && { name: item.name }),
							...(item.author && { author: { name: item.author.name } }),
							...(item.description && { description: item.description }),
							...(item.datePublished && { datePublished: item.datePublished }),
							...(item.image && { image: item.image }),
							// ...[
							// 	"name",
							// 	"author",
							// 	"datePublished",
							// 	"description",
							// 	"image",
							// ].map((key) => {
							// 	if (item[key]) {
							// 		return { [key]: item[key] };
							// 	}
							// }),
							...(item.recipeIngredient && {
								recipeIngredient: removeExtraSpaces(
									item.recipeIngredient,
								) as string[],
							}),
							...(item.recipeInstructions && {
								recipeInstructions: parseRecipeInstructions(
									item.recipeInstructions,
								),
							}),
							...(item.aggregateRating && {
								aggregateRating: {
									"@type": "AggregateRating",
									ratingValue: item.aggregateRating.ratingValue,
									ratingCount: item.aggregateRating.ratingCount,
								},
							}),
							...(item.review && {
								review: item.review.map((rev: Review) => ({
									author: rev.author || "Unknown",
									datePublished: rev.datePublished || "Unknown",
									reviewBody: rev.reviewBody || "No review body",
									reviewRating: rev.reviewRating
										? typeof rev.reviewRating === "object"
											? rev.reviewRating.ratingValue
											: "No rating"
										: "No rating",
								})),
							}),
						};
						break;
					}
				}
			} catch (e) {
				console.error(`Error parsing JSON-LD: ${(e as Error).stack}`);
			}
		}
	}

	// console.log(`\n\nrecipeSchema: ${recipeSchema}\n\n`);

	return recipeSchema ?? defaultRecipeSchema;
}

//   // Attempt to extract Microdata
//   if (!recipe.title) {
//     const microdataItem = $('[itemtype="http://schema.org/Recipe"]')
//     if (microdataItem.length) {
//       recipe.title = microdataItem.find('[itemprop="name"]').text().trim() || null
//       recipe.ingredients = microdataItem.find('[itemprop="recipeIngredient"]').map((i, el) => $(el).text().trim()).get()
//       recipe.instructions = microdataItem.find('[itemprop="recipeInstructions"]').map((i, el) => $(el).text().trim()).get()
//     }
//   }

//   // Attempt to extract from common HTML patterns
//   if (!recipe.title) {
//     const titleTag = $('h1, h2, title').first()
//     if (titleTag.length) {
//       recipe.title = titleTag.text().trim()
//     }
//   }

//   if (!recipe.ingredients.length) {
//     const ingredientsTags = $('li, p').filter((i, el) => {
//       const text = $(el).text().toLowerCase()
//       return text.includes('ingredient')
//     })
//     recipe.ingredients = ingredientsTags.map((i, el) => $(el).text().trim()).get()
//   }

//   if (!recipe.instructions.length) {
//     const instructionsTags = $('li, p').filter((i, el) => {
//       const text = $(el).text().toLowerCase()
//       return text.includes('step') || text.includes('instruction')
//     })
//     recipe.instructions = instructionsTags.map((i, el) => $(el).text().trim()).get()
//   }

//   return recipe
// }

// Example usage
// (async () => {
//   const url = "https://example.com/recipe"
//   const htmlContent = await fetchHtml(url)
//   if (htmlContent) {
//     const parsedRecipe = parseRecipe(htmlContent)
//     console.log(parsedRecipe)
//   }
// })()

// Example Recipe
// const exampleRecipe: Recipe = {
//   "@context": "https://schema.org",
//   "@type": ["Recipe"],
//   name: "Chocolate Chip Cookies",
//   author: {
//     "@type": "Person",
//     name: "John Doe"
//   },
//   datePublished: "2024-06-12T10:41:27+00:00",
//   description: "Delicious homemade chocolate chip cookies.",
//   image: [
//     "https://example.com/photo1.jpg",
//     "https://example.com/photo2.jpg"
//   ],
//   recipeYield: "24 cookies",
//   prepTime: "PT15M",
//   cookTime: "PT10M",
//   totalTime: "PT25M",
//   recipeIngredient: [
//     "1 cup sugar",
//     "1 cup butter",
//     "2 cups flour",
//     "1 cup chocolate chips"
//   ],
//   recipeInstructions: [
//     {
//       "@type": "HowToStep",
//       text: "Preheat oven to 350 degrees F."
//     },
//     {
//       "@type": "HowToStep",
//       text: "Cream together butter and sugar."
//     },
//     {
//       "@type": "HowToStep",
//       text: "Add flour and chocolate chips."
//     },
//     {
//       "@type": "HowToStep",
//       text: "Bake for 10 minutes."
//     }
//   ],
//   aggregateRating: {
//     "@type": "AggregateRating",
//     ratingValue: 4.5,
//     ratingCount: 10
//   },
//   review: [
//     {
//       "@type": "Review",
//       reviewRating: {
//         "@type": "Rating",
//         ratingValue: 5
//       },
//       reviewBody: "Best cookies ever!",
//       author: {
//         "@type": "Person",
//         name: "Jane Smith"
//       },
//       datePublished: "2024-06-11T12:00:00+00:00"
//     }
//   ],
//   recipeCategory: ["Dessert"],
//   recipeCuisine: ["American"],
//   keywords: "chocolate chip cookies, dessert",
//   nutrition: {
//     "@type": "NutritionInformation",
//     servingSize: "1 cookie",
//     calories: "200 kcal",
//     sugarContent: "10 g",
//     sodiumContent: "150 mg",
//     fatContent: "10 g",
//     saturatedFatContent: "5 g",
//     carbohydrateContent: "30 g",
//     fiberContent: "2 g",
//     proteinContent: "3 g",
//     cholesterolContent: "20 mg"
//   }
// };
