"use client";

import { log } from "node:console";
import { useRecipeContext } from "@/lib/hooks/useRecipeContext";
import RecipeCard from "@components/RecipeCard";
import ThemeRegistry from "@components/ThemeRegistry";
import { RecipeSchema } from "@components/typings/schemaOrgRecipe";
import {
	defaultRecipeSchema,
	sampleRecipe_grilledcorn,
} from "@constants/defaultRecipe";
import { PropsWithChildren, ReactNode, useState } from "react";

export const dynamic = "force-dynamic";

//ws.on("open", function open() {
//emitWsMsg(
//	wsMessages.CLIENT_CONNECTION_OPENED,
//	ws,
//	SENDER,
//	"Client on.open: Connection established with server",
//);
//});

//ws.on("message", (message: string): void => {
//	const msg = JSON.parse(message.toString());

//	log(`Incoming message: ${JSON.stringify(msg, null, 2)}`, SENDER, "info");

//	if (msg.type === "recipe") {
//		recipePayload = msg.payload;
//		emitWsMsg(
//			wsMessages.RECIPE_RECEIVED,
//			ws,
//			SENDER,
//			"Recipe received by client?",
//		);
//		if (isRecipeSchema(recipePayload)) {
//			emitWsMsg(
//				wsMessages.RECIPE_VERIFIED,
//				ws,
//				SENDER,
//				"Recipe verified by client?",
//			);
//			importedRecipe = JSON.parse(recipePayload);
//		} else {
//			emitWsMsg(wsMessages.RECIPE_INVALID, ws, SENDER, "Recipe invalid");
//		}

//		if (msg.type === "message") {
//			if (msg.payload === wsMessages.READY_TO_SEND) {
//				emitWsMsg(wsMessages.READY_TO_RECEIVE, ws, SENDER);
//			} else {
//				//log(`Fallthrough message: ${msg.payload}`, SENDER);
//			}
//		}
//	}
//});

export type ImportRecipeProps = PropsWithChildren & { recipe: RecipeSchema };

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const ImportRecipe = ({ recipe }: ReactNode & { recipe: RecipeSchema }) => {
	//const [importedRecip, setImportedRecip] = useState<RecipeSchema>(
	//	recipe || defaultRecipeSchema,
	//);
	//const [socket, setSocket] = useState(null);

	//const SENDER = "CLIENT";

	//let recipePayload: WsMessage | string = "";

	//const { client } = useClient();
	//console.log("ImportRecipe.tsx: client", JSON.stringify(client, null, 2));

	//const setConn = () => {
	//	client?.on(WsEvents.CONNECT, () => {
	//		console.log("WebSocket connection opened.");
	//		emitWsMsg(WsEvents.CLIENT_CONNECTION_OPENED, client, SENDER);
	//		emitWsMsg(WsEvents.READY_TO_RECEIVE, client, SENDER);
	//	});

	//	client?.on(WsEvents.MESSAGE, (message) => {
	//		const msg = JSON.parse(message.toString());

	//		log(`Incoming message: ${JSON.stringify(msg, null, 2)}`, SENDER, "info");

	//		if (msg.type === "recipe") {
	//			recipePayload = msg.payload;
	//			setImportedRecip(msg.payload);
	//			emitWsMsg(
	//				WsEvents.RECIPE_RECEIVED,
	//				client,
	//				SENDER,
	//				"Recipe received by client?",
	//			);
	//			if (isRecipeSchema(recipePayload)) {
	//				emitWsMsg(
	//					WsEvents.RECIPE_VERIFIED,
	//					client,
	//					SENDER,
	//					"Recipe verified by client?",
	//				);
	//				//importedRecipe = JSON.parse(recipePayload);
	//			} else {
	//				emitWsMsg(WsEvents.RECIPE_INVALID, client, SENDER, "Recipe invalid");
	//			}

	//			if (msg.type === "message") {
	//				if (msg.payload === WsEvents.READY_TO_SEND) {
	//					emitWsMsg(WsEvents.READY_TO_RECEIVE, client, SENDER);
	//				} else {
	//					//log(`Fallthrough message: ${msg.payload}`, SENDER);
	//				}
	//			}
	//		}
	//	});

	//	client?.on(WsEvents.DISCONNECT, () => {
	//		console.log("WebSocket connection closed.");
	//	});

	//	client?.on(WsEvents.ERROR, (error) => {
	//		console.error("WebSocket error:", error);
	//	});
	//};

	//useEffect(() => {
	//	client?.on(WsEvents.MESSAGE, message => {
	//		const msg = JSON.parse(message.toString())

	//		log(`Incoming message: ${JSON.stringify(msg, null, 2)}`, SENDER, 'info')

	//		if (msg.type === 'recipe') {
	//			recipePayload = msg.payload
	//			importedRecipe = msg.payload as RecipeSchema
	//			emitWsMsg(
	//				WsEvents.RECIPE_RECEIVED,
	//				client,
	//				SENDER,
	//				'Recipe received by client?',
	//			)
	//			if (isRecipeSchema(recipePayload)) {
	//				emitWsMsg(
	//					WsEvents.RECIPE_VERIFIED,
	//					client,
	//					SENDER,
	//					'Recipe verified by client?',
	//				)
	//				//importedRecipe = JSON.parse(recipePayload);
	//			} else {
	//				emitWsMsg(WsEvents.RECIPE_INVALID, client, SENDER, 'Recipe invalid')
	//			}

	//			if (msg.type === 'message') {
	//				if (JSON.parse(msg.payload) === WsEvents.READY_TO_SEND) {
	//					emitWsMsg(WsEvents.READY_TO_RECEIVE, client, SENDER)
	//				} else {
	//					//log(`Fallthrough message: ${msg.payload}`, SENDER);
	//				}
	//			}
	//		}
	//	})

	//	return () => {
	//		client?.close()
	//	}
	//}, [client])

	//useEffect(() => {
	//if (client) {
	//	console.log('READY_TO_RECEIVE useEffect.')
	//	emitWsMsg(WsEvents.READY_TO_RECEIVE, client, SENDER)
	//}
	//}, [client])

	return (
		<ThemeRegistry>
			<RecipeCard {...sampleRecipe_grilledcorn} />
		</ThemeRegistry>
	);
};

export default ImportRecipe;
