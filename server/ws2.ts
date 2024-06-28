import { parseRecipe } from "@util/recipeParser";
import { fetchHtml } from "@util/fetchHtml";
import { WebSocket, WebSocketServer } from "ws";
import dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { URL } from "url";

dotenv.config();

const PORT = process.env.WEBSOCKET_PORT
	? Number.parseInt(process.env.WEBSOCKET_PORT, 10)
	: 8700;
const ws: WebSocketServer = new WebSocketServer({ port: PORT });

ws.on("connection", (ws: WebSocket): void => {
	ws.on("message", (message: string): void => {
		let parsedMessage;
		try {
			parsedMessage = JSON.parse(message);
		} catch (e) {
			console.error(
				`Error parsing message: ${(e as Error).message}`,
				JSON.stringify(message, null, 2),
			);
			return;
		}
		switch (parsedMessage.msgtype) {
			case "url":
				console.log(`Received URL: ${parsedMessage.url}`);
				try {
					const hardUrl: string = ""; //'https://amazingribs.com/tested-recipes/spice-rubs-and-pastes/meatheads-memphis-dust-rub-recipe/'
					const recipeUrl = hardUrl || parsedMessage.url.toString();
					console.log(`\nReceived URL: ${recipeUrl}`);
					(async () => {
						const htmlContent = await fetchHtml(recipeUrl);
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
					ws.send("recipe_success");
				} catch (e) {
					console.error(`Error parsing recipe: ${(e as Error).message}`);
					ws.send("recipe_error");
				}
				break;

			case "image":
				console.log(`Received image: ${parsedMessage.src}`);
				try {
					(async () => {
						const imgSrc = parsedMessage.src;
						console.log(`\nReceived image src: ${imgSrc}`);

						const binaryData = new Uint8Array(parsedMessage.binaryData).buffer;

						// Extract the image name from the URL
						const url = new URL(imgSrc);
						const imgName = path.basename(url.pathname);
						console.log(`Extracted image name: ${imgName}`);

						// Define the directory to save the images
						const saveDir = path.join("./", "images");
						if (!fs.existsSync(saveDir)) {
							console.log(`Creating directory ${saveDir}`);
							fs.mkdirSync(saveDir);
						}
						console.log(`Saving image to ${saveDir}`);

						// Define the full path for the image file
						const imgPath = path.join(saveDir, imgName);

						// Save the binary data to a file
						fs.writeFileSync(imgPath, Buffer.from(binaryData));

						console.log(`Saved image ${imgName} to ${imgPath}`);
					})();
					ws.send("image_success");
				} catch (e) {
					console.error(`Error saving image: ${(e as Error).message}`);
					ws.send("image_error");
				}
				break;

			default:
				console.error(`Unknown message type: ${parsedMessage.type}`);
				break;
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
