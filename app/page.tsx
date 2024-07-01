import type { FC } from "react";
import { RecipeCard, RecipeCardProps } from "@components/RecipeCard";
import ThemeRegistry from "@components/ThemeRegistry";

import WebSocket from "ws";
import { RecipeSchema } from "@components/typings/schemaOrgRecipe";
import {
	defaultRecipeSchema,
	sampleRecipe_grilledcorn,
	sampleRecipe_pozole,
} from "@constants/defaultRecipe";
import { timestampNow } from "@constants/date";
import { sendWsMsg } from "@util/websocket";
import { webSocketMessages } from "@constants/index";

//const ws = new WebSocket("ws://localhost:3000/api/websocket");
const ws = new WebSocket("ws://localhost:9000");

const log = (msg: string, status?: string | null): void => {
	const prefix: string = "CLIENT";
	console.log(
		`[${timestampNow()}]${status ? " [{status?.toUpperCase()}]" : ""} ==-->> ${prefix} ${msg}`,
	);
};

let recipePayload: string = "";
let recipeSchemaObject: RecipeSchema = defaultRecipeSchema;

const isRecipeSchema = (recipe: unknown): recipe is RecipeSchema => {
	let parsedRecipe;
	try {
		parsedRecipe = JSON.parse(recipe as string);
	} catch (e) {
		log(`Error paring recipe string: ${(e as Error).message}`, "error");
		return false;
	}
	return (
		parsedRecipe !== null &&
		typeof parsedRecipe === "object" &&
		"@context" in parsedRecipe &&
		"name" in parsedRecipe &&
		typeof parsedRecipe.name === "string" &&
		"recipeIngredient" in parsedRecipe &&
		"recipeInstructions" in parsedRecipe
	);
};

ws.on("open", function open() {
	sendWsMsg(
		webSocketMessages.CLIENT_CONNECTION_OPENED,
		ws,
		"Client on.open: Connection established with server",
	);
});

ws.on("message", (message: string): void => {
	const msg = JSON.parse(message.toString());
	log(`Message received: ${JSON.stringify(msg, null, 2)}`);
	if (msg.type === "recipe") {
		recipePayload = msg.payload;
		sendWsMsg(
			webSocketMessages.RECIPE_RECEIVED,
			ws,
			"Recipe received by client",
		);
		if (isRecipeSchema(recipePayload)) {
			sendWsMsg(
				webSocketMessages.RECIPE_VERIFIED,
				ws,
				"Recipe verified by client",
			);
			recipeSchemaObject = JSON.parse(recipePayload);
		} else {
			sendWsMsg(webSocketMessages.RECIPE_INVALID, ws, "Recipe invalid");
		}

		if (msg.type === "message") {
			if (msg.payload === webSocketMessages.READY_TO_SEND) {
				sendWsMsg(webSocketMessages.READY_TO_RECEIVE, ws);
			} else {
				log(msg.payload);
			}
		}
	}
});

ws.on("error", function error(err: Error) {
	log(`WebSocket error: ${err.message}`, "error");
});

ws.on("close", function close() {
	log("WebSocket connection closed");
});

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const Page: FC<RecipeCardProps> = ({
	recipe = sampleRecipe_pozole,
}: RecipeCardProps) => (
	<ThemeRegistry>
		<RecipeCard {...recipeSchemaObject} />
	</ThemeRegistry>
);

export default Page;
