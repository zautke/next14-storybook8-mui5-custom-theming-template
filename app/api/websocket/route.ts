//import { NextRequest, NextResponse } from 'next/server'
//import { WebSocketServer } from 'ws'
//import * as fs from 'fs'
//import * as path from 'path'
//import { URL } from 'url'
//import dotenv from 'dotenv'
//import { parseRecipe } from '@util/recipeParser'
//import { fetchHtml } from '@util/fetchHtml'
//import { IncomingMessage } from 'node:http'

////dotenv.config();
//export const route = (
//	req: IncomingMessage,
//	res: { socket: { server: WebSocketServer } },
//) => {
//	const wss = new Server({ noServer: true })

//	wss.on('connection', ws => {
//		ws.on('message', message => {
//			const msg = message.toString()
//			console.log(`Received message: ${msg}`)
//		})

//		ws.send('Connected to WebSocket server')
//	})

//	if (!res.socket.server) {
//		console.log('Socket not available')
//		return
//	}

//	wss.handleUpgrade(req, req.socket, Buffer.alloc(0), ws => {
//		wss.emit('connection', ws, req)
//	})
//}

//export { route }

//-------------------------

//import { NextRequest, NextResponse } from "next/server";
//import { WebSockets } from "next/experimental/web";
//import { WebSocketServer } from "ws";
//import * as fs from "fs";
//import * as path from "path";
//import { URL } from "url";
//import dotenv from "dotenv";
//import { parseRecipe } from "@util/recipeParser";
//import { fetchHtml } from "@util/fetchHtml";

//dotenv.config();

////export type BrowserPayload = {

////}

//// biome-ignore lint/correctness/noUnusedVariables: <explanation>
//const PORT = process.env.WEBSOCKET_SERVER_PORT
//	? Number.parseInt(process.env.WEBSOCKET_SERVER_PORT, 10)
//	: 91000;

//if (!globalThis.wsServer) {
//	globalThis.wsServer = new WebSocketServer({ noServer: true });

//	globalThis.wsServer.on("connection", (ws) => {
//		ws.on("message", async (message: string) => {
//			const base64Url = message.toString();
//			const hardUrl: string = ""; //'https://amazingribs.com/tested-recipes/spice-rubs-and-pastes/meatheads-memphis-dust-rub-recipe/'
//			const url = hardUrl || Buffer.from(base64Url, "base64").toString("utf-8");
//			console.log(`\nReceived URL: ${url}`);
//			try {
//				(async () => {
//					const htmlContent: string = await fetchHtml(url);
//					if (htmlContent) {
//						const parsedRecipe = JSON.stringify(
//							parseRecipe(htmlContent),
//							null,
//							2,
//						);
//						console.log(
//							`\n\nRECIPE---------------------------------------\n${parsedRecipe}`,
//						);
//					}
//				})();
//				ws.send("success");
//			} catch (e) {
//				console.error(`Error parsing recipe: ${(e as Error).message}`);
//				ws.send("parseerror");
//			}
//		});

//		ws.send("WebSocket server connection established");
//	});
//}
//export async function GET(req: NextRequest) {
//	const upgradeHeader = req.headers.get("upgrade");

//	if (upgradeHeader && upgradeHeader.toLowerCase() === "websocket") {
//		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
//		const socket = (req as any).socket as NodeJS.Socket;
//		globalThis.wsServer.handleUpgrade(req, socket, Buffer.alloc(0), (ws) => {
//			globalThis.wsServer.emit("connection", ws, req);
//		});

//		return new Response(null, { status: 101 });
//	}

//	return NextResponse.json({ message: "Not a WebSocket request" });
//}

export {}
