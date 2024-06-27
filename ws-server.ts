import { parseRecipe } from "@util/recipeParser";
import { fetchHtml } from "@util/fetchHtml";
import dotenv from "dotenv";
import { type WebSocket, WebSocketServer } from "ws";

dotenv.config();

const PORT = process.env.WEBSOCKET_PORT
	? Number.parseInt(process.env.WEBSOCKET_PORT, 10)
	: 8700;
const ws: WebSocketServer = new WebSocketServer({ port: PORT });

ws.on("connection", (ws: WebSocket): void => {
	ws.on("message", (message: string): void => {
		const base64Url = message.toString();
		const hardUrl: string = ""; //'https://amazingribs.com/tested-recipes/spice-rubs-and-pastes/meatheads-memphis-dust-rub-recipe/'
		const url = hardUrl || Buffer.from(base64Url, "base64").toString("utf-8");
		console.log(`\nReceived URL: ${url}`);
		try {
			(async () => {
				const htmlContent = await fetchHtml(url);
				if (htmlContent) {
					const parsedRecipe = JSON.stringify(
						parseRecipe(htmlContent),
						null,
						2,
					);
					console.log(
						`\n\nRECIPE---------------------------------------\n${parsedRecipe}`,
					);
				}
			})();
			ws.send("success");
		} catch (e) {
			console.error(`Error parsing recipe: ${(e as Error).message}`);
			ws.send("parseerror");
		}
	});

	ws.send("WebSocket server connection established");
});

ws.on("listening", () => {
	console.log(`WebSocket server is listening on port ${PORT}`);
});

ws.on("error", (err) => {
	console.error("WebSocket error:", err);
});
