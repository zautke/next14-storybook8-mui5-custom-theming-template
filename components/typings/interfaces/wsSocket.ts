import { WsEvents } from '@constants/events'
import { Socket } from 'socket.io-client'

//interface ServerToClientEvents {
//	noArg: () => void
//	basicEmit: (a: number, b: string, c: Buffer) => void
//	withAck: (d: string, callback: (e: number) => void) => void
//}

//interface ClientToServerEvents {
//	hello: () => void
//}

//interface InterServerEvents {
//	ping: () => void
//}

export type WsEmptyParams = () => void
export type WsMessageParams = (params: WsMessage | string) => void

export type InterServerEvents = {
	[WsEvents.CONNECT]: WsEmptyParams
	[WsEvents.DISCONNECT]: WsEmptyParams
	[WsEvents.CLOSE]: WsEmptyParams
	[WsEvents.LISTENING]: WsEmptyParams
	[WsEvents.PING]: WsEmptyParams
	[WsEvents.PONG]: WsEmptyParams
	[WsEvents.ERROR]: (error: Error | string) => void
	[WsEvents.MESSAGE_RESPONSE]: WsMessageParams
	[WsEvents.MESSAGE]: WsMessageParams
}

export interface ServerToClientEvents extends InterServerEvents {
	[WsEvents.SERVER_CONNECTION_OPENED]: WsMessageParams
	[WsEvents.URL_RECEIVED]: WsMessageParams
	[WsEvents.READY_TO_SEND]: WsMessageParams
	[WsEvents.SENDING_RECIPE]: WsMessageParams
	[WsEvents.SERVER_CONNECTION_CLOSED]: WsMessageParams
}

export interface ClientToServerEvents extends InterServerEvents {
	[WsEvents.CLIENT_CONNECTION_OPENED]: WsMessageParams
	[WsEvents.READY_TO_RECEIVE]: WsMessageParams
	[WsEvents.RECIPE_RECEIVED]: WsMessageParams
	[WsEvents.RECIPE_VERIFIED]: WsMessageParams
	[WsEvents.RECIPE_INVALID]: WsMessageParams
	[WsEvents.CLIENT_CONNECTION_CLOSED]: WsMessageParams
}

export type WsMessage = {
	type:
		| 'message'
		| 'url'
		| 'recipe'
		| 'image'
		| 'error'
		| 'success'
		| 'warning'
		| 'info'
		| 'ack'
		| 'sent'
	payload: string
}

export type ImExSocket = Socket<
	ServerToClientEvents,
	ClientToServerEvents
> | null
