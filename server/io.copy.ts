import dotenv from "dotenv";
import next from "next";
import type { WebSocketServer as NativeWebSocketServerType } from "ws";
import { WebSocketServer } from "ws";
import type { WebSocket as NativeWebSocket } from "ws";

import { createServer } from "node:http";
import { WsEvents } from "@/constants/events";
import { fetchHtml } from "@/util/fetchHtml";
import { parseRecipe } from "@/util/recipeParser";
import { emitWsMsg, log, sendWsMsg } from "@/util/websocket";
import express from "express";
import type { Server as SocketIO } from "socket.io";
import { Server } from "socket.io";

import {
	ClientToServerEvents,
	ServerToClientEvents,
} from "@/components/typings/interfaces";

import {
	defaultRecipeSchema,
	sampleRecipe_grilledcorn,
	sampleRecipe_pozole,
} from "@constants/defaultRecipe";

dotenv.config();

const APORT = process.env.APP_WEBSOCKET_PORT
	? Number.parseInt(process.env.APP_WEBSOCKET_PORT, 10)
	: 8000;

let recipe = sampleRecipe_grilledcorn;

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 9001;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = app.getRequestHandler();

app.prepare().then(() => {
	const httpServer = createServer((req, res) => {
		const parsedUrl = parse(req.url, true);
		handler(req, res, parsedUrl);
	});

	const io = new Server(httpServer, {
		cors: {
			origins: ["https://localhost:3000"],
		},
	});

	io.on("connection", async (socket) => {
		const count = io.engine.clientsCount;
		const sockets = await io.fetchSockets();

		const report = () => {
			log(`sockets: ${sockets}`, "info");
			for (const socket of sockets) {
				console.log(socket.id);
				console.log(socket.handshake);
				console.log(socket.rooms);
				console.log(socket.data);
			}
			log(`client count: ${count}`, "info");
		};
		emitWsMsg(
			WsEvents.SERVER_CONNECTION_OPENED,
			socket,
			"APP websocker server connection established",
		);

		report();

		socket.on(WsEvents.MESSAGE, () => {
			const msg = JSON.parse(message.toString());

			switch (msg.type) {
				case "url": {
					const url = msg.payload;
					emitWsMsg(WsEvents.URL_RECEIVED, socket, `Received URL: ${url}`);
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

								if (parsedRecipe) {
									recipe = parsedRecipe;
									hasStoredRecipe = true;
									emitWsMsg(
										WsEvents.READY_TO_SEND,
										socket,
										"Recipe parsed successfully, ready to send",
									);
								} else {
									emitWsMsg(
										WsEvents.SERVER_RECIPE_PARSE_FAILURE,
										socket,
										"Error parsing recipe",
									);
								}
							}
						})();
					} catch (e) {
						log(`Error parsing recipe: ${(e as Error).message}`, "error");
						emitWsMsg(
							WsEvents.SERVER_RECIPE_ERROR,
							socket,
							"Error parsing recipe",
						);
					}
					break;
				}

				case "message": {
					if (msg.payload === WsEvents.READY_TO_RECEIVE && hasStoredRecipe) {
						emitWsMsg(
							WsEvents.SENDING_RECIPE,
							socket,
							"Recipe sent to client",
							{
								type: "recipe",
								payload: recipe,
							},
						);
					} else if (msg === WsEvents.RECIPE_VERIFIED) {
						log("Recipe verified by client");
						recipe = "";
						hasStoredRecipe = false;
					} else {
						log(`Received message: ${msg.payload}`);
					}

					break;
				}

				case "image": {
					const imgSrc = msg.payload;
					log(`\nReceived image src: ${imgSrc}`);
					break;
				}

				default:
					log("Unknown message type", "warning");
					break;
			}
		});

		socket.on(WsEvents.DISCONNECT, (reason, details) => {
			console.log(`Client disconnected: ${reason}`);
			console.log(`Details: ${JSON.stringify(details, null, 2)}`);
		});
	});

	httpServer
		.once("error", (err) => {
			console.error(err);
			process.exit(1);
		})
		.listen(port, () => {
			console.log(`> Ready on http://${hostname}:${port}`);
		});
});

const onMessage = (socket): void => {
	socket.on(WsEvents.MESSAGE, (message) => {
		report();
	});
};

//const recipe = sampleRecipe_grilledcorn
