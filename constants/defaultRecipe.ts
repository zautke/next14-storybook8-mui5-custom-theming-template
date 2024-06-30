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

export const sampleRecipe_charredSalsaVerde: RecipeSchema = {
	"@context": "http://schema.org",
	"@type": ["Recipe"],
	datePublished: "2016-01-26T09:15:00.000-05:00",
	author: [
		{
			"@type": "Person",
			name: "J. Kenji López-Alt",
			url: "https://www.seriouseats.com/j-kenji-lopez-alt-5118720",
		},
	],
	description:
		"Smoky, spicy, sweet, bright, and complex, this is the one salsa to rule them all. It only has four real ingredients and you can make it in 20 minutes.",
	image: {
		"@type": "ImageObject",
		url: "https://www.seriouseats.com/thmb/eSOhmYhHQAR5vkfgPG-VM75vxw0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__01__20160128-salsa-verde-charred-best-30-kenji-79762c91f8564c538f41f5b859043ec9.jpg",
		height: 1125,
		width: 1500,
	},
	//"publisher": {
	//  "@type": "Organization",
	//  "name": "Serious Eats",
	//  "url": "https://www.seriouseats.com",
	//  "logo": {
	//    "@type": "ImageObject",
	//    "url": "https://www.seriouseats.com/thmb/YfQU2tc6Ask4mMy6oMJDaulMqqE=/320x320/filters:no_upscale():max_bytes(150000):strip_icc()/Serious_Eats_Schema_Logo-30a63d9c07734d35836c8ff2d368419c.png",
	//    "width": 320,
	//    "height": 320
	//  },
	//  "brand": "Serious Eats",
	//  "publishingPrinciples": "https://www.seriouseats.com/about-us-5120006#toc-editorial-guidelines",
	//  "sameAs": [
	//    "https://www.facebook.com/seriouseats",
	//    "https://www.instagram.com/seriouseats",
	//    "https://www.pinterest.com/seriouseats"
	//  ]
	//},
	name: "Charred Salsa Verde",
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: "5",
		ratingCount: "9",
	},
	cookTime: "PT15M",
	keywords: "easy, salsa, tomatillo",
	nutrition: {
		"@type": "NutritionInformation",
		calories: "18 kcal",
		carbohydrateContent: "3 g",
		cholesterolContent: "0 mg",
		fiberContent: "1 g",
		proteinContent: "0 g",
		saturatedFatContent: "0 g",
		sodiumContent: "28 mg",
		sugarContent: "1 g",
		fatContent: "1 g",
		servingSize: "Makes about 3 cups",
		unsaturatedFatContent: "0 g",
	},
	prepTime: "PT15M",
	recipeCategory: ["Salsa"],
	recipeCuisine: ["Mexican"],
	recipeIngredient: [
		"1 1/2 pounds tomatillos, husks removed, split in half (680g; about 10 medium)",
		"1 medium white onion, peeled and split in half (about 6 ounces; 170g)",
		"2 to 4 Serrano or jalapeño chilies (adjust according to spice tolerance, remove seeds and ribs for milder spice), split in half",
		"10 to 15 sprigs cilantro, tough lower stems discarded",
		"1 tablespoon vegetable oil",
		"Kosher salt",
	],
	recipeInstructions: [
		{
			"@type": "HowToStep",
			image: [
				{
					"@type": "ImageObject",
					url: "https://www.seriouseats.com/thmb/-iMZVfFfVofFHWdsFJ5qpYzJpYY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__20160128-salsa-verde-charred-best-03-composite-kenji-107105368aff4db99f266b15819aeed5.jpg",
				},
			],
			text: "Adjust oven rack to 4 inches below broiler and preheat broiler to high. Place tomatillos, onion, and chiles on a foil-lined rimmed baking sheet. Broil until darkly charred and blackened on top and tomatillos are completely tender, 6 to 12 minutes.",
		},
		{
			"@type": "HowToStep",
			image: [
				{
					"@type": "ImageObject",
					url: "https://www.seriouseats.com/thmb/jHo3UPLzLSA5zAbBAbLi8Ctvmlc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__20160128-salsa-verde-charred-best-09-kenji-fbc23adaf4424cf1810a044b2eb66425.jpg",
				},
			],
			text: "Transfer vegetables and their juice to a blender, food processor, or the cup of an immersion blender. Add half of cilantro. Blend in pulses until a rough purée is formed.",
		},
		{
			"@type": "HowToStep",
			image: [
				{
					"@type": "ImageObject",
					url: "https://www.seriouseats.com/thmb/UKY5kRiytrBfNHgHMA29B0-W-6I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__20160128-salsa-verde-charred-best-12-composite-kenji-1bb05004ad84434e908c0861786ac9bb.jpg",
				},
			],
			text: "Heat oil in a medium saucepan over high heat until shimmering. Pour salsa into the hot oil all at once (it will steam and sputter). Immediately start stirring and continue to cook, stirring, until salsa is darkened and thick enough to coat the back of the spoon, about 3 minutes. Remove from heat.",
		},
		{
			"@type": "HowToStep",
			image: [
				{
					"@type": "ImageObject",
					url: "https://www.seriouseats.com/thmb/CgX3ZpecYRP6xlNQhsjU5WGn0rU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__20160128-salsa-verde-charred-best-22-kenji-2951c3f68660450eb88c4538d88e4dca.jpg",
				},
			],
			text: "Finely chop remaining cilantro and stir into salsa. Season to taste with salt. Let cool, then serve. Salsa can be stored in the refrigerator for up to 5 days.",
		},
	],
	recipeYield: ["24", "3 cups"],
	totalTime: "PT30M",
	review: [
		{
			"@type": "Review",
			author: {
				"@type": "Person",
				name: "Chuck B",
			},
			reviewBody:
				"This is no doubt one of the finest salsa recipes you will find on the internet. Dont skimp on the broiling step, charred onions and blackened peppers are your friend. Skip the cilantro if you're unlucky enough to have the soap gene and it will taste excellent regardless. I've changed the proportions and substituted all sorts of peppers (try adding a poblano) and it never disappoints. The flavor mellows and deepens as it ages, so if it's too spicy try it again in a day or two. This salsa pairs amazingly well with Kenjis pickled red onions and will make some of the most mind blowing nachos and burritos you've ever had. 10/10",
		},
		{
			"@type": "Review",
			author: {
				"@type": "Person",
				name: "Nicholas Hageman",
			},
			reviewBody:
				"Almost where I want it but it’s still tart/sweet. Threw 3 jalapeños and a habanero in. Any suggestions on getting rid of the tart sweetness while it cools down?",
		},
		{
			"@type": "Review",
			author: {
				"@type": "Person",
				name: "Liam Taylor",
			},
			reviewBody:
				"I have only made this once so far but it was fantastic! I did two big jalepenos with no seeds and it was super mild so I would recomend both more peppers and leaving seeds in.",
		},
		{
			"@type": "Review",
			author: {
				"@type": "Person",
				name: "jlang",
			},
			reviewBody:
				"I grew my own Tomatillos this year here in Germany, and they came out quite plentiful, not a hard plant to grow once they are large enough to plant them outside. \nHarvested more than two pounds from 4 plants last week, and made the salsa... \n\nI will brown them longer next time, my electric broiler in the oven probably doesn't put out quite the same amount of energy as a gas oven does. \nFor the acidity I added some baking soda, which rounded the flavor out nicely, and added some sugar for sweetness / jam-like consistency. \n\nExcited to keep trying new variations of this recipe!",
		},
		{
			"@type": "Review",
			author: {
				"@type": "Person",
				name: "KelevTov",
			},
			reviewBody:
				"Good stuff, just begged me for a smige of cumin. Goes great over broiled salmon.",
		},
	],
	//"mainEntityOfPage": {
	//  "@type": [
	//    "WebPage"
	//  ],
	//  "@id": "https://www.seriouseats.com/charred-salsa-verde-tomatillo-salsa",
	//  "breadcrumb": {
	//    "@type": "BreadcrumbList",
	//    "itemListElement": [
	//      {
	//        "@type": "ListItem",
	//        "position": 1,
	//        "item": {
	//          "@id": "https://www.seriouseats.com/dip-recipes-5117790",
	//          "name": "Dips"
	//        }
	//      },
	//      {
	//        "@type": "ListItem",
	//        "position": 2,
	//        "item": {
	//          "@id": "https://www.seriouseats.com/salsa-recipes-5117786",
	//          "name": "Salsa"
	//        }
	//      },
	//      {
	//        "@type": "ListItem",
	//        "position": 3,
	//        "item": {
	//          "@id": "https://www.seriouseats.com/charred-salsa-verde-tomatillo-salsa",
	//          "name": "Charred Salsa Verde"
	//        }
	//      }
	//    ]
	//  }
	//}
};

export const sampleRecipe_pozole: RecipeSchema = {
	name: "Best Beef Pozole Rojo",
	author: {},
	datePublished: "2022-11-19T03:41:27+00:00",
	description:
		"Pozole soup is a Mexican classic! This version is made with beef &amp; hominy topped with cabbage, onions, cilantro, and of course, a squeeze of lime.",
	image: [
		"https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole.jpg",
		"https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole-500x500.jpg",
		"https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole-500x375.jpg",
		"https://www.muydelish.com/wp-content/uploads/2020/12/How-To-Make-Pozole-480x270.jpg",
	],
	recipeYield: "",
	prepTime: "",
	cookTime: "",
	totalTime: "",
	recipeIngredient: [
		"1 ½ pounds chuck roast trimmed (see note #1 below) (fat trimmed off and cut in 1 ½&quot; chunks)",
		"1 to 1 ½ pounds bone-in shank center cut with bone (see note #2 below)",
		"1 large white onion (remove outer skin but keep it whole (do a cross cut one the top of the onion only to help release the flavors))",
		"1 whole garlic head (cut a little bit of the top )",
		"12 cups of hot water (plus more as needed) (about 3 liters )",
		"2 cup prepared red sauce (or more to taste) (ingredients to make below)",
		"1 teaspoon dried oregano",
		"2 to 3 bay leaf",
		"2 beef bullion cubes",
		"2 tablespoon kosher salt",
		"1 tablespoon ground black pepper",
		"6 lbs &amp; 12 oz can Mexican style hominy (drained and rinsed)",
		"3 dried chile guajillos (seeds removed &amp; rinsed)",
		"3 dried ancho chiles (seeds removed &amp; rinsed)",
		"¼ medium onion (yellow or white)",
		"3 garlic cloves",
		"½ teaspoon oregano",
		"½ teaspoon kosher salt (if using table salt use a little less teaspoon)",
		"4 cups water",
		"Shredded cabbage, finely diced onion, sliced radishes, fresh cilantro, lime juice &amp; hot sauce.",
	],
	recipeInstructions: [
		"In a large pot, add the water, beef, whole onion, oregano, bay leaf, beef bullion, salt &amp; pepper.",
		"Bring liquid to a boil then cover and simmer until beef is tender (about two hours). As water begins to evaporate, add boiling hot water to keep the broth at the same amount.",
		"Once the beef is tender, remove &amp; discard the bones, onion, garlic and bay leaf.",
		"Add the hominy and 2 cups red sauce (instructions below). Cook for about 30 more minutes. Taste for seasoning.",
		"When done, ladle soup into bowls and garnish with any of these ingredients that you like: shredded cabbage, chopped cilantro, minced onions, lime juice, hot sauce.",
		"serve with tostadas or tortilla chips.",
		{
			"Make the sauce (while the meat is cooking or make ahead)": [
				"Remove the stem and seeds from the chiles. Rinse well to remove any dust.",
				"Place in a medium pot along with the onion, garlic, spices &amp; water.",
				"Cook on low heat for about 20 minutes or until the chiles are soft. Remove pot from heat and cool.",
				"Transfer to a blender or food processor along with 1 cup of the water where the chile cooked on.",
				"Puree chiles and then pass thru a strainer to remove the remaining seeds and skins. If you have a lot of pulp left, you may add it back to the blender along with ½ cup of the chile water. Blend and strain again.",
				"Set aside.",
			],
		},
	],
	howToTip: [],
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: "4.92",
		ratingCount: "68",
	},
	review: [
		{
			author: {
				"@type": "Person",
				name: "Haley",
			},
			datePublished: "2024-01-08",
			reviewBody:
				"Yum! I made this for dinner today, made the red sauce yesterday. Used pork neck bones, the broth turned out perfect! I will definitely be making this often, thank you for sharing!",
			reviewRating: "5",
		},
		{
			author: {
				"@type": "Person",
				name: "Michael Cifaldi",
			},
			datePublished: "2024-01-06",
			reviewBody: "Easy and comes out phenomenal every time.",
			reviewRating: "5",
		},
		{
			author: {
				"@type": "Person",
				name: "Mario",
			},
			datePublished: "2023-06-13",
			reviewBody:
				"My mother always added pinto beans and nixtamal (uncooked hominy) as well as using ox tail for the meat / bone.  This was slow cooked all day or overnight.  It may have been more of a filler / increased protein meal out of necessity back then.  All I can say is Pozole with pintos is so much more hearty and broth richer.  If you put a bowl with or without beans in front of me, it will quickly disappear!  Glad someone else’s mom did the same thing.",
			reviewRating: "5",
		},
		{
			author: {
				"@type": "Person",
				name: "Jessica",
			},
			datePublished: "2023-03-22",
			reviewBody:
				"I just made this recipe. It's the first time I've ever had it, so I have nothing to compare to, but we all liked it! The texture of the hominy is interesting. I have a jar of both the Mexican chili pastes, so I skipped the step of making that myself this time. Thanks for the recipe!",
			reviewRating: "5",
		},
		{
			author: {
				"@type": "Person",
				name: "Brian Schulz",
			},
			datePublished: "2023-02-11",
			reviewBody:
				"Great recipe but I think there might be a couple errors in the ingredient list:  It lists 6lbs and a 12 oz can of hominy, what did you mean there?  Also, an entire tablespoon of ground black pepper, overwhelms the other flavors, especially the second and third day.  A teaspoon would be more in line with what I’m used to seeing in other pozole recipes.  If you ever get the time, make it again and see what you think?   Other than that the only thing I did differently was to fry the red sauce in oil for 20 minutes before adding.  This unusual step is pretty common in recipes where the chilies are prepared like this and it adds a lot to the flavor.  Other than that no complaints!",
			reviewRating: "4",
		},
		{
			author: {
				"@type": "Person",
				name: "Lois",
			},
			datePublished: "2023-01-09",
			reviewBody: "Thanks for the recipe!  Very good!",
			reviewRating: "5",
		},
		{
			author: {
				"@type": "Person",
				name: "Stephanie",
			},
			datePublished: "2022-12-01",
			reviewBody:
				"I used carne deshebrada (shredded beef) and in place of the bouillon I used a tsp of cumin. Wonderful recipe. I've made it now 3 weeks in a row. Thank you Ana. My husband can't wait to have it every week.",
			reviewRating: "5",
		},
		{
			author: {
				"@type": "Person",
				name: "Thomas Trujillo",
			},
			datePublished: "2022-10-24",
			reviewBody:
				"Ana\r\nPozole was a hit with the family! I tripled the recipe and there was plenty. People took some home. I enjoy your other recipes and plan on trying to cook with them for my family and friends. \r\nThank you",
			reviewRating: "5",
		},
		{
			author: {
				"@type": "Person",
				name: "Thomas Trujillo",
			},
			datePublished: "2022-10-24",
			reviewBody:
				"Ana\r\nI tripled recipe and Had plenty for everyone. The Pozole was a hit. People took some home.\r\nI really enjoyed making it from scratch and look forward to making it again. I enjoy all your other recipes and plan on making other meals for the family. \r\nThank you",
			reviewRating: "5",
		},
	],
};
