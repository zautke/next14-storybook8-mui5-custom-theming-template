import type { RecipeSchema } from "@typings/schemaOrgRecipe";
import type { FullJsonValue } from "@typings/util";

export const defaultRecipeSchema: RecipeSchema = {
	name: "",
	author: "",
	datePublished: "",
	description: "",
	image: [],
	recipeYield: "",
	prepTime: "",
	cookTime: "",
	totalTime: "",
	recipeIngredient: [],
	recipeInstructions: [],
	howToTip: [],
	aggregateRating: undefined,
	review: undefined,
	recipeCategory: undefined,
	recipeCuisine: undefined,
	keywords: undefined,
	nutrition: undefined,
};

export const sampleRecipe_grilledcorn: RecipeSchema = {
	name: "Grilled Corn",
	author: {
		name: "Love and Lemons",
	},
	datePublished: "2024-06-18T08:00:26+00:00",
	description:
		"Learn how to grill corn on the cob two ways—in and out of the husk! Choose the first method if you like your corn sweeter and juicier, and choose the second if you like it smoky and charred. Serve with butter, salt, and pepper, or try one of the seasoning suggestions in the post above.",
	image: [
		"https://cdn.loveandlemons.com/wp-content/uploads/2023/06/grilled-corn-on-the-cob-500x500.jpg",
		"https://cdn.loveandlemons.com/wp-content/uploads/2023/06/grilled-corn-on-the-cob-500x375.jpg",
		"https://cdn.loveandlemons.com/wp-content/uploads/2023/06/grilled-corn-on-the-cob-480x270.jpg",
		"https://cdn.loveandlemons.com/wp-content/uploads/2023/06/grilled-corn-on-the-cob.jpg",
	],
	recipeYield: "",
	prepTime: "",
	cookTime: "",
	totalTime: "",
	recipeIngredient: [
		"4 to 8 ears fresh sweet corn",
		"Butter",
		"Sea salt",
		"Freshly ground black pepper",
	],
	recipeInstructions: [
		{
			"Husk-on method": [
				"Peel back the corn husks, leaving them attached at the base of each ear of corn. Remove the silks as best you can and close the husks back over the corn cobs. Soak the corn in a large pot of cold water for 10 minutes. This will prevent the husks from burning too much on the grill. Drain and pat dry.",
				"Preheat a grill to medium-high heat. Place the corn on the grill and cook, turning every 3 to 5 minutes, until all sides of the corn are cooked, about 15 minutes. Remove from the grill and tie back the husks to use as a handle. Serve with butter, salt, and pepper.",
			],
		},
		{
			"Husked method": [
				"Shuck the corn and remove the silks.",
				"Preheat a grill or grill pan to medium-high heat. Place the corn on the grill and cook, turning every 3 to 5 minutes, until all sides of the corn are cooked and light char marks form, about 15 minutes. Remove from the grill and serve with butter, salt, and pepper.",
			],
		},
	],
	howToTip: [],
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: "5",
		ratingCount: "6",
	},
};

export const sampleRecipe_pozole: RecipeSchema = {
	"@graph": [
		{
			"@type": "Article",
			"@id": "https://www.muydelish.com/red-beef-pozole/#article",
			isPartOf: {
				"@id": "https://www.muydelish.com/red-beef-pozole/",
			},
			author: {
				name: "Ana Frias",
				"@id":
					"https://www.muydelish.com/#/schema/person/d28646b566adcfce68e576ee60cbfc65",
			},
			headline: "Authentic Pozole Rojo",
			datePublished: "2022-11-19T10:41:27+00:00",
			dateModified: "2023-12-20T10:16:36+00:00",
			wordCount: 1744,
			commentCount: 73,
			publisher: {
				"@id": "https://www.muydelish.com/#organization",
			},
			image: {
				"@id": "https://www.muydelish.com/red-beef-pozole/#primaryimage",
			},
			thumbnailUrl:
				"https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole.jpg",
			keywords: ["cinco de mayo"],
			articleSection: [
				"All Recipes",
				"Cinco De Mayo Recipes",
				"GF Recipes",
				"main dish",
				"Sopas",
			],
			inLanguage: "en-US",
			potentialAction: [
				{
					"@type": "CommentAction",
					name: "Comment",
					target: ["https://www.muydelish.com/red-beef-pozole/#respond"],
				},
			],
		},
		{
			"@type": ["WebPage", "FAQPage"],
			"@id": "https://www.muydelish.com/red-beef-pozole/",
			url: "https://www.muydelish.com/red-beef-pozole/",
			name: "The Best Red Pozole! | Step by step recipe by Muy Delish",
			isPartOf: {
				"@id": "https://www.muydelish.com/#website",
			},
			primaryImageOfPage: {
				"@id": "https://www.muydelish.com/red-beef-pozole/#primaryimage",
			},
			image: {
				"@id": "https://www.muydelish.com/red-beef-pozole/#primaryimage",
			},
			thumbnailUrl:
				"https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole.jpg",
			datePublished: "2022-11-19T10:41:27+00:00",
			dateModified: "2023-12-20T10:16:36+00:00",
			description:
				"Enjoy Red Beef Pozole at home! The beef is simmered with spices until tender, then add the hominy and all comes together perfectly!",
			breadcrumb: {
				"@id": "https://www.muydelish.com/red-beef-pozole/#breadcrumb",
			},
			mainEntity: [
				{
					"@id":
						"https://www.muydelish.com/red-beef-pozole/#faq-question-1607288857607",
				},
				{
					"@id":
						"https://www.muydelish.com/red-beef-pozole/#faq-question-1607288864511",
				},
			],
			inLanguage: "en-US",
			potentialAction: [
				{
					"@type": "ReadAction",
					target: ["https://www.muydelish.com/red-beef-pozole/"],
				},
			],
		},
		{
			"@type": "ImageObject",
			inLanguage: "en-US",
			"@id": "https://www.muydelish.com/red-beef-pozole/#primaryimage",
			url: "https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole.jpg",
			contentUrl:
				"https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole.jpg",
			width: 1200,
			height: 1600,
			caption: "pozole soup",
		},
		{
			"@type": "BreadcrumbList",
			"@id": "https://www.muydelish.com/red-beef-pozole/#breadcrumb",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "home",
					item: "https://www.muydelish.com/",
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "main dish",
					item: "https://www.muydelish.com/dinner/",
				},
				{
					"@type": "ListItem",
					position: 3,
					name: "Authentic Pozole Rojo",
				},
			],
		},
		{
			"@type": "WebSite",
			"@id": "https://www.muydelish.com/#website",
			url: "https://www.muydelish.com/",
			name: "Muy Delish",
			description: "Authentic Mexican Recipes",
			publisher: {
				"@id": "https://www.muydelish.com/#organization",
			},
			potentialAction: [
				{
					"@type": "SearchAction",
					target: {
						"@type": "EntryPoint",
						urlTemplate: "https://www.muydelish.com/?s={search_term_string}",
					},
					"query-input": "required name=search_term_string",
				},
			],
			inLanguage: "en-US",
		},
		{
			"@type": "Organization",
			"@id": "https://www.muydelish.com/#organization",
			name: "Muy Delish",
			url: "https://www.muydelish.com/",
			logo: {
				"@type": "ImageObject",
				inLanguage: "en-US",
				"@id": "https://www.muydelish.com/#/schema/logo/image/",
				url: "https://www.muydelish.com/wp-content/uploads/2023/12/Muy-Delish-Logo-2024.png",
				contentUrl:
					"https://www.muydelish.com/wp-content/uploads/2023/12/Muy-Delish-Logo-2024.png",
				width: 1325,
				height: 555,
				caption: "Muy Delish",
			},
			image: {
				"@id": "https://www.muydelish.com/#/schema/logo/image/",
			},
			sameAs: [
				"https://www.facebook.com/muydelish.blog/",
				"https://www.instagram.com/anafriasb/",
				"https://www.pinterest.com/AnaCFrias/",
				"https://www.youtube.com/channel/UC4EoQDMJIdDiLmPnpOaRKrA",
			],
		},
		{
			"@type": "Person",
			"@id":
				"https://www.muydelish.com/#/schema/person/d28646b566adcfce68e576ee60cbfc65",
			name: "Ana Frias",
			image: {
				"@type": "ImageObject",
				inLanguage: "en-US",
				"@id": "https://www.muydelish.com/#/schema/person/image/",
				url: "https://secure.gravatar.com/avatar/f15171d9e451008c48ec123ee10e32d9?s=96&d=mm&r=g",
				contentUrl:
					"https://secure.gravatar.com/avatar/f15171d9e451008c48ec123ee10e32d9?s=96&d=mm&r=g",
				caption: "Ana Frias",
			},
			sameAs: ["https://www.muydelish.com/about/"],
			url: "https://www.muydelish.com/about/",
		},
		{
			"@type": "Question",
			"@id":
				"https://www.muydelish.com/red-beef-pozole/#faq-question-1607288857607",
			position: 1,
			url: "https://www.muydelish.com/red-beef-pozole/#faq-question-1607288857607",
			name: "Is pozole healthy",
			answerCount: 1,
			acceptedAnswer: {
				"@type": "Answer",
				text: 'Per this <a href="https://foodandnutrition.org/january-february-2015/versatile-hominy-star-hispanic-southern-cuisines/" target="_blank" rel="noreferrer noopener">page</a> "A half-cup of canned yellow hominy contains 58 calories, 2 grams of fiber, 276 milligrams sodium and about 1 gram each of protein and fat. A half cup of plain cooked hominy grits contains 76 calories, about 1½ grams of protein and 1 gram of fiber, and traces of sodium and fat. Hominy grits often are enriched with thiamin, riboflavin, niacin, folic acid and iron; vitamin D and calcium are added to some brands."<br/><br/>Even though it may not have a major nutrition factor, it is not unhealthy per se! So go ahead and eat it without any fears :) ',
				inLanguage: "en-US",
			},
			inLanguage: "en-US",
		},
		{
			"@type": "Question",
			"@id":
				"https://www.muydelish.com/red-beef-pozole/#faq-question-1607288864511",
			position: 2,
			url: "https://www.muydelish.com/red-beef-pozole/#faq-question-1607288864511",
			name: "Is pozole rojo spicy",
			answerCount: 1,
			acceptedAnswer: {
				"@type": "Answer",
				text: "The chiles used to make the sauce are not spicy but they do have a little bit of a kick. If you don't want it to be spicy, don't add extra hot sauce after it's cooked. ",
				inLanguage: "en-US",
			},
			inLanguage: "en-US",
		},
		{
			"@type": "Recipe",
			name: "Best Beef Pozole Rojo",
			author: {
				"@id":
					"https://www.muydelish.com/#/schema/person/d28646b566adcfce68e576ee60cbfc65",
			},
			description:
				"Pozole soup is a Mexican classic! This version is made with beef &amp; hominy topped with cabbage, onions, cilantro, and of course, a squeeze of lime.",
			datePublished: "2022-11-19T03:41:27+00:00",
			image: [
				"https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole.jpg",
				"https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole-500x500.jpg",
				"https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole-500x375.jpg",
				"https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole-480x270.jpg",
			],
			recipeYield: ["8", "8 servings"],
			prepTime: "PT30M",
			cookTime: "PT120M",
			totalTime: "PT150M",
			recipeIngredient: [
				"1 ½ pounds chuck roast trimmed (see note #1 below) (fat trimmed off and cut in 1 ½&quot; chunks)",
				"1 to 1 ½ pounds bone-in shank center cut with bone (see note #2 below)",
				"1  large white onion (remove outer skin but keep it whole (do a cross cut one the top of the onion only to help release the flavors))",
				"1  whole garlic head (cut a little bit of the top )",
				"12 cups of hot water (plus more as needed) (about 3 liters )",
				"2 cup prepared red sauce (or more to taste) (ingredients to make below)",
				"1 teaspoon dried oregano",
				"2 to 3  bay leaf",
				"2  beef bullion cubes",
				"2 tablespoon kosher salt",
				"1 tablespoon ground black pepper",
				"6 lbs &amp; 12 oz can Mexican style hominy (drained and rinsed)",
				"3  dried chile guajillos  (seeds removed &amp; rinsed)",
				"3   dried ancho chiles (seeds removed &amp; rinsed)",
				"¼  medium onion (yellow or white)",
				"3  garlic cloves",
				"½ teaspoon oregano",
				"½ teaspoon  kosher salt (if using table salt use a little less teaspoon)",
				"4 cups water",
				"Shredded cabbage, finely diced onion, sliced radishes, fresh cilantro, lime juice &amp; hot sauce.",
			],
			recipeInstructions: [
				{
					"@type": "HowToStep",
					text: "In a large pot, add the water, beef, whole onion, oregano, bay leaf, beef bullion, salt &amp; pepper.",
					name: "In a large pot, add the water, beef, whole onion, oregano, bay leaf, beef bullion, salt &amp; pepper.",
					url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-0-0",
				},
				{
					"@type": "HowToStep",
					text: "Bring liquid to a boil then cover and simmer until beef is tender (about two hours). As water begins to evaporate, add boiling hot water to keep the broth at the same amount.",
					name: "Bring liquid to a boil then cover and simmer until beef is tender (about two hours). As water begins to evaporate, add boiling hot water to keep the broth at the same amount.",
					url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-0-1",
				},
				{
					"@type": "HowToStep",
					text: "Once the beef is tender, remove &amp; discard the bones, onion, garlic and bay leaf.",
					name: "Once the beef is tender, remove &amp; discard the bones, onion, garlic and bay leaf.",
					url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-0-2",
				},
				{
					"@type": "HowToStep",
					text: "Add the hominy and 2 cups red sauce (instructions below). Cook for about 30 more minutes. Taste for seasoning.",
					name: "Add the hominy and 2 cups red sauce (instructions below). Cook for about 30 more minutes. Taste for seasoning.",
					url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-0-3",
				},
				{
					"@type": "HowToStep",
					text: "When done, ladle soup into bowls and garnish with any of these ingredients that you like: shredded cabbage, chopped cilantro, minced onions, lime juice, hot sauce.",
					name: "When done, ladle soup into bowls and garnish with any of these ingredients that you like: shredded cabbage, chopped cilantro, minced onions, lime juice, hot sauce.",
					url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-0-4",
				},
				{
					"@type": "HowToStep",
					text: "serve with tostadas or tortilla chips.",
					name: "serve with tostadas or tortilla chips.",
					url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-0-5",
				},
				{
					"@type": "HowToSection",
					name: "Make the sauce (while the meat is cooking or make ahead)",
					itemListElement: [
						{
							"@type": "HowToStep",
							text: "Remove the stem and seeds from the chiles. Rinse well to remove any dust.",
							name: "Remove the stem and seeds from the chiles. Rinse well to remove any dust.",
							url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-1-0",
						},
						{
							"@type": "HowToStep",
							text: "Place in a medium pot along with the onion, garlic, spices &amp; water.",
							name: "Place in a medium pot along with the onion, garlic, spices &amp; water.",
							url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-1-1",
						},
						{
							"@type": "HowToStep",
							text: "Cook on low heat for about 20 minutes or until the chiles are soft. Remove pot from heat and cool.",
							name: "Cook on low heat for about 20 minutes or until the chiles are soft. Remove pot from heat and cool.",
							url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-1-2",
						},
						{
							"@type": "HowToStep",
							text: "Transfer to a blender or food processor along with 1 cup of the water where the chile cooked on.",
							name: "Transfer to a blender or food processor along with 1 cup of the water where the chile cooked on.",
							url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-1-3",
						},
						{
							"@type": "HowToStep",
							text: "Puree chiles and then pass thru a strainer to remove the remaining seeds and skins. If you have a lot of pulp left, you may add it back to the blender along with ½ cup of the chile water. Blend and strain again.",
							name: "Puree chiles and then pass thru a strainer to remove the remaining seeds and skins. If you have a lot of pulp left, you may add it back to the blender along with ½ cup of the chile water. Blend and strain again.",
							url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-1-4",
						},
						{
							"@type": "HowToStep",
							text: "Set aside.",
							name: "Set aside.",
							url: "https://www.muydelish.com/red-beef-pozole/#wprm-recipe-7282-step-1-5",
						},
					],
				},
			],
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "4.92",
				ratingCount: "68",
			},
			review: [
				{
					"@type": "Review",
					reviewRating: {
						"@type": "Rating",
						ratingValue: "5",
					},
					reviewBody:
						"Yum! I made this for dinner today, made the red sauce yesterday. Used pork neck bones, the broth turned out perfect! I will definitely be making this often, thank you for sharing!",
					author: {
						"@type": "Person",
						name: "Haley",
					},
					datePublished: "2024-01-08",
				},
				{
					"@type": "Review",
					reviewRating: {
						"@type": "Rating",
						ratingValue: "5",
					},
					reviewBody: "Easy and comes out phenomenal every time.",
					author: {
						"@type": "Person",
						name: "Michael Cifaldi",
					},
					datePublished: "2024-01-06",
				},
				{
					"@type": "Review",
					reviewRating: {
						"@type": "Rating",
						ratingValue: "5",
					},
					reviewBody:
						"My mother always added pinto beans and nixtamal (uncooked hominy) as well as using ox tail for the meat / bone.  This was slow cooked all day or overnight.  It may have been more of a filler / increased protein meal out of necessity back then.  All I can say is Pozole with pintos is so much more hearty and broth richer.  If you put a bowl with or without beans in front of me, it will quickly disappear!  Glad someone else’s mom did the same thing.",
					author: {
						"@type": "Person",
						name: "Mario",
					},
					datePublished: "2023-06-13",
				},
				{
					"@type": "Review",
					reviewRating: {
						"@type": "Rating",
						ratingValue: "5",
					},
					reviewBody:
						"I just made this recipe. It's the first time I've ever had it, so I have nothing to compare to, but we all liked it! The texture of the hominy is interesting. I have a jar of both the Mexican chili pastes, so I skipped the step of making that myself this time. Thanks for the recipe!",
					author: {
						"@type": "Person",
						name: "Jessica",
					},
					datePublished: "2023-03-22",
				},
				{
					"@type": "Review",
					reviewRating: {
						"@type": "Rating",
						ratingValue: "4",
					},
					reviewBody:
						"Great recipe but I think there might be a couple errors in the ingredient list:  It lists 6lbs and a 12 oz can of hominy, what did you mean there?  Also, an entire tablespoon of ground black pepper, overwhelms the other flavors, especially the second and third day.  A teaspoon would be more in line with what I’m used to seeing in other pozole recipes.  If you ever get the time, make it again and see what you think?   Other than that the only thing I did differently was to fry the red sauce in oil for 20 minutes before adding.  This unusual step is pretty common in recipes where the chilies are prepared like this and it adds a lot to the flavor.  Other than that no complaints!",
					author: {
						"@type": "Person",
						name: "Brian Schulz",
					},
					datePublished: "2023-02-11",
				},
				{
					"@type": "Review",
					reviewRating: {
						"@type": "Rating",
						ratingValue: "5",
					},
					reviewBody: "Thanks for the recipe!  Very good!",
					author: {
						"@type": "Person",
						name: "Lois",
					},
					datePublished: "2023-01-09",
				},
				{
					"@type": "Review",
					reviewRating: {
						"@type": "Rating",
						ratingValue: "5",
					},
					reviewBody:
						"I used carne deshebrada (shredded beef) and in place of the bouillon I used a tsp of cumin. Wonderful recipe. I've made it now 3 weeks in a row. Thank you Ana. My husband can't wait to have it every week.",
					author: {
						"@type": "Person",
						name: "Stephanie",
					},
					datePublished: "2022-12-01",
				},
				{
					"@type": "Review",
					reviewRating: {
						"@type": "Rating",
						ratingValue: "5",
					},
					reviewBody:
						"Ana\r\nPozole was a hit with the family! I tripled the recipe and there was plenty. People took some home. I enjoy your other recipes and plan on trying to cook with them for my family and friends. \r\nThank you",
					author: {
						"@type": "Person",
						name: "Thomas Trujillo",
					},
					datePublished: "2022-10-24",
				},
				{
					"@type": "Review",
					reviewRating: {
						"@type": "Rating",
						ratingValue: "5",
					},
					reviewBody:
						"Ana\r\nI tripled recipe and Had plenty for everyone. The Pozole was a hit. People took some home.\r\nI really enjoyed making it from scratch and look forward to making it again. I enjoy all your other recipes and plan on making other meals for the family. \r\nThank you",
					author: {
						"@type": "Person",
						name: "Thomas Trujillo",
					},
					datePublished: "2022-10-24",
				},
			],
			recipeCategory: ["Main Dish"],
			recipeCuisine: ["Mexican"],
			keywords:
				"authentic pozole, beef pozole, como hacer pozole, How make pozole, how to make pozole, mexican pozole, pork pozole, posole recipe, pozole, pozole de puerco, pozole de res, pozole ingredients, Pozole receta, pozole recipe, pozole rojo recipe, pozole soup",
			nutrition: {
				"@type": "NutritionInformation",
				servingSize: "1 large bowl",
				calories: "423 kcal",
				sugarContent: "5 g",
				sodiumContent: "1199 mg",
				fatContent: "9 g",
				saturatedFatContent: "2 g",
				carbohydrateContent: "43 g",
				fiberContent: "7 g",
				proteinContent: "41 g",
				cholesterolContent: "68 mg",
			},
			"@id": "https://www.muydelish.com/red-beef-pozole/#recipe",
			isPartOf: {
				"@id": "https://www.muydelish.com/red-beef-pozole/#article",
			},
			mainEntityOfPage: "https://www.muydelish.com/red-beef-pozole/",
		},
	],
};
