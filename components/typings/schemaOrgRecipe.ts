import { parseRecipeInstructions } from "@util/recipeParser";
import type { FullJsonArray, JsonArray } from "./util";

export type AtProperties = {
	"@context"?: string | string[] | undefined;
	"@id"?: string | string[] | undefined;
	"@type"?: string | string[] | undefined;
};

export type WithDate = {
	datePublished?: string;
};

export type Person = AtProperties & {
	name?: string;
	url?: string;
};

export type ImageObject = AtProperties & {
	url: string;
	contentUrl?: string;
	width?: number;
	height?: number;
	caption?: string;
};

export type NutritionInformation = AtProperties & {
	servingSize: string;
	calories: string;
	sugarContent?: string;
	sodiumContent?: string;
	fatContent?: string;
	saturatedFatContent?: string;
	unsaturatedFatContent?: string;
	carbohydrateContent?: string;
	fiberContent?: string;
	proteinContent?: string;
	cholesterolContent?: string;
};

export type AggregateRating =
	| (AtProperties & {
			ratingValue: string | number;
			ratingCount: string | number;
	  })
	| null;

export type ReviewRating = AtProperties & {
	ratingValue: string | number;
};

export type Review = AtProperties &
	WithDate & {
		reviewRating?: ReviewRating;
		reviewBody?: string;
		author?: Person | string;
	};

export type HowToStepType = AtProperties & {
	text: string;
	name?: string;
	url?: string;
};

export type HowToSectionType = AtProperties & {
	name?: string;
	text?: string;
	itemListElement: FullJsonArray | JsonArray<string> | HowToStepType[] | [];
};

export type HowToStepsType = HowToStepType[];

export type HowToTip =
	| (AtProperties & {
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
	| (HowToStepType & HowToStepType[] & HowToSectionType & HowToSectionType[])
	| string[];

//export class RecipeInstruction {
//	constructor(instruction: HowToStepType | HowToSectionType) {
//		this.instruction = instruction;
//	}
//	"@type": "HowToStep" | "HowToSection";
//	instruction!: HowToStepType | HowToSectionType;
//	render() {
//		return JSON.stringify(
//			parseRecipeInstructions(this.instruction as FullJsonArray),
//		);
//	}
//}

export function renderRecipeInstructions(instruction: FullJsonArray) {
	const retValue = JSON.stringify(
		parseRecipeInstructions(instruction as FullJsonArray),
	);

	console.log(`\n\nretValue: ${retValue}\n\n`);
	return retValue;
}

export type RecipeSchema = AtProperties & {
	name: string;
	author?: Person | Person[] | string | undefined;
	datePublished?: string | undefined;
	description?: string | undefined;
	image?: ImageObject | ImageObject[] | string[] | [] | undefined;
	recipeYield?: string | string[] | [] | undefined;
	prepTime?: string | undefined;
	cookTime?: string | undefined;
	totalTime?: string | undefined;
	howToTip?: HowToTip[] | [] | undefined;
	recipeIngredient: RecipeIngredient[] | [];
	recipeInstructions: FullJsonArray | RecipeInstructionType[] | string[] | [];

	aggregateRating?: AggregateRating | undefined;
	review?: Review[] | undefined;
	recipeCategory?: string[] | undefined;
	recipeCuisine?: string[] | undefined;
	keywords?: string | string[] | [] | undefined;
	nutrition?: NutritionInformation | [] | undefined;
};
