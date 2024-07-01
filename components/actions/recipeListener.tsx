import { parseRecipe } from "@util/recipeParser";
import { fetchHtml } from "@util/fetchHtml";
import dotenv from "dotenv";
import { WebSocketServer, WebSocket } from "ws";
import { NextApiRequest, NextApiResponse } from "next";
//import type { FullJsonArray } from "@typings/util";
import type { RecipeSchema } from "@typings/schemaOrgRecipe";

dotenv.config();

const PORT = process.env.WEBSOCKET_CLIENT_PORT
	? Number.parseInt(process.env.WEBSOCKET_CLIENT_PORT, 10)
	: 8700;
// const ws: WebSocketServer = new WebSocketServer({ port: PORT });

// ws.on("connection", (ws: WebSocket): void => {
// 	ws.on("message", async (message: string): Promise<void> => {
// 		const base64Url = message.toString();
// 		const hardUrl: string = ""; //'https://amazingribs.com/tested-recipes/spice-rubs-and-pastes/meatheads-memphis-dust-rub-recipe/'
// 		const url =
// 			hardUrl || (Buffer.from(base64Url, "base64").toString("utf8") as string);
// 		console.log(`\nReceived URL: ${url}`);
// 		try {
// 			const htmlContent = await fetchHtml(url);
// 			if (htmlContent) {
// 				const parsedRecipe = JSON.stringify(parseRecipe(htmlContent), null, 2);
// 				console.log(
// 					`\n\nRECIPE---------------------------------------\n${parsedRecipe}`,
// 				);
// 				ws.send(parsedRecipe);
// 			}
// 		} catch (e) {
// 			console.error(`Error parsing recipe: ${(e as Error).message}`);
// 			ws.send("parseerror");
// 		}
// 	});

// 	ws.send("WebSocket server connection established");
// });

// ws.on("listening", () => {
// 	console.log(`WebSocket server is listening on port ${PORT}`);
// });

// ws.on("error", (err) => {
// 	console.error("WebSocket error:", err);
// });

export async function recipeListener(): Promise<RecipeSchema> {
	return new Promise((resolve, reject) => {
		const ws = new WebSocket(`ws://localhost:${PORT}`);

		ws.on("open", function open() {
			console.log("recipeListener WebSocket connection established");
		});

		ws.on("message", function incoming(event) {
			console.log("Received parsed recipe:", event.data.toString());
			const parsedRecipe = JSON.parse(data);
			console.log("Parsed Recipe:", parsedRecipe);
		});

		ws.on("error", function error(err) {
			console.error("WebSocket error:", err);
			reject();
			ws.close();
		});

		ws.on("close", function close() {
			console.log("WebSocket connection closed");
		});
	});
}
