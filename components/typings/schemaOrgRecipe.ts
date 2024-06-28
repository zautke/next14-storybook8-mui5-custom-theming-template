import { parseRecipeInstructions } from "@util/recipeParser";
import type { FullJsonArray, JsonArray } from "./util";

export type WithType = {
	"@type"?: string | string[] | undefined;
};

export type WithDate = {
	datePublished: string;
};

export type Person = WithType & {
	name: string;
};

export type ImageObject = WithType & {
	url: string;
	contentUrl: string;
	width: number;
	height: number;
	caption: string;
	(): string;
};

export type NutritionInformation = WithType & {
	servingSize: string;
	calories: string;
	sugarContent?: string;
	sodiumContent?: string;
	fatContent?: string;
	saturatedFatContent?: string;
	carbohydrateContent?: string;
	fiberContent?: string;
	proteinContent?: string;
	cholesterolContent?: string;
};

export type AggregateRating =
	| (WithType & {
			ratingValue: string | number;
			ratingCount: string | number;
	  })
	| null;

export type ReviewRating = WithType & {
	ratingValue: string | number;
};

export type Review = WithType &
	WithDate & {
		reviewRating: ReviewRating;
		reviewBody: string;
		author: Person;
	};

export type HowToStep = WithType &
	Partial<ObjectArray<string>> & {
		"@type": "HowToStep";
		text: string;
		name?: string;
		url?: string;
	};

export type HowToSection = WithType &
	Partial<ObjectArray<string>> & {
		"@type": "HowToSection";
		name?: string;
		text?: string;
		itemListElement: JsonArray<string>;
	};

export type HowToSteps = HowToStep[];

export type HowToTip =
	| (WithType & {
			"@type": "HowToTip";
			text: string;
			(): string;
	  })
	| [];

export type IndexSignature<T> = { [key: string | number | symbol]: T };
export type ObjectArray<T> = {
	[key: string | number | symbol]: (T | T[]) & keyof [];
	//callbackfn: (value: T, index: number, array: T[]) => U;
}[];

export type PObjectArray = {
	length: number;
	pop: () => [];
	push: () => [];
	concat: () => [];
	[Symbol.iterator]: () => [];
}[];

export type RecipeIngredient = string;

export type RecipeInstructionType =
	| (HowToStep & HowToStep[] & HowToSection & HowToSection[])
	| string[];

export class RecipeInstruction {
	constructor(instruction: HowToStep | HowToSection) {
		this.instruction = instruction;
	}
	"@type": "HowToStep" | "HowToSection";
	instruction!: HowToStep | HowToSection;
	render() {
		return JSON.stringify(
			parseRecipeInstructions(this.instruction as FullJsonArray),
		);
	}
}

export function renderRecipeInstructions(instruction: FullJsonArray) {
	const retValue = JSON.stringify(
		parseRecipeInstructions(instruction as FullJsonArray),
	);

	console.log(`\n\nretValue: ${retValue}\n\n`);
	return retValue;
}

export type RecipeSchema = WithType & {
	name: string;
	author?: Person | string | undefined;
	datePublished?: string | undefined;
	description?: string | undefined;
	image?: ImageObject[] | string[] | [] | undefined;
	recipeYield?: string | undefined;
	prepTime?: string | undefined;
	cookTime?: string | undefined;
	totalTime?: string | undefined;
	howToTip?: HowToTip[] | [] | undefined;
	recipeIngredient: RecipeIngredient[] | [];
	recipeInstructions: FullJsonArray | RecipeInstruction[] | string[] | [];

	aggregateRating?: AggregateRating | undefined;
	review?: Review[] | undefined;
	recipeCategory?: string[] | undefined;
	recipeCuisine?: string[] | undefined;
	keywords?: string[] | undefined;
	nutrition?: NutritionInformation | [] | undefined;
};
