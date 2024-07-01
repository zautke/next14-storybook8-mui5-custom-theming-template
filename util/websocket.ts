import { timestampNow } from "@constants/date";

export const log = (msg: string, status?: string | null): void => {
	const prefix: string = "SERVER";
	console.log(
		`[${timestampNow()}]${status ? " [{status?.toUpperCase()}]" : ""} ==-->> ${prefix} ${msg}`,
	);
};

export type WebSocketPayload = {
	type:
		| "message"
		| "url"
		| "recipe"
		| "image"
		| "error"
		| "success"
		| "warning"
		| "info"
		| "ack"
		| "sent";
	payload: string;
};

export const sendWsMsg = (
	msg: string,
	ws: WebSocket,
	customLogMsg?: string,
	payload?: WebSocketPayload,
): void => {
	log(customLogMsg || msg);
	const payloadStr = payload
		? { type: "recipe", payload }
		: { type: "message", payload: msg };
	ws.send(JSON.stringify(payloadStr));
	log(`sendWsMsg SERVER: ${JSON.stringify(payloadStr)}`);
};
