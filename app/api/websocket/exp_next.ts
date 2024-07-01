//import { WebSockets } from "next/experimental/web";

//export const GET = () => {
//	return new Response(null, {
//		status: 101,
//		headers: {
//			Upgrade: "websocket",
//			Connection: "Upgrade",
//			"Sec-WebSocket-Accept": "...", // Generate this based on the request
//		},
//	});
//};

//export const webSockets = WebSockets({
//	async onMessage(ws, message) {
//		console.log("Received message:", message);

//		// Broadcast the message to all connected clients
//		for (const client of ws.clients) {
//			if (client.readyState === 1) {
//				// Check if client is open
//				client.send(`Echo: ${message}`);
//			}
//		}
//	},

//	onClose(ws) {
//		console.log("Client disconnected");
//	},
//});
