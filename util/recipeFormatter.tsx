import React, { ReactNode, PropsWithChildren } from "react";
import type {
	HowToSectionType,
	HowToStepType,
	Person,
	RecipeSchema,
	Review,
} from "@typings/schemaOrgRecipe";
import type { FullJsonArray, FullJsonValue } from "@typings/util";

export type RenderFunction = (...args: unknown[]) => ReactNode;

export type RenderFunctionJson = (json: FullJsonValue) => ReactNode;

export type RenderPropsWithChildren = PropsWithChildren & {
	render: RenderFunction;
};

export type HowToStepProps = RenderPropsWithChildren & { step: string };

export type HowToStepsProps = RenderPropsWithChildren & {
	steps: HowToStepType[];
};

export type HowToSectionProps = RenderPropsWithChildren & {
	section: string;
	render?: RenderFunction;
	renderSectionSteps?: RenderFunction;
};

export const HowToStep = ({ step, render }: HowToStepProps): ReactNode =>
	render(step);

export const HowToSteps = ({ step, render }: HowToStepProps): ReactNode =>
	render(step);

export const HowToSection = ({
	section,
	render,
	//renderSectionSteps,
}: HowToSectionProps): ReactNode => {
	return render(JSON.parse(section) as HowToSectionType);
};
{
	/*<ul key={section.name}>
	<h5>{section.name}:</h5>
	{(section.itemListElement as HowToStepType[]).map((step) => (
		<li key={`li-${step.text as string}`}>
			<HowToStep
				key={step.text}
				step={step}
				render={() => renderSectionSteps(step)}
			/>
		</li>
	))}
</ul>;*/
}
