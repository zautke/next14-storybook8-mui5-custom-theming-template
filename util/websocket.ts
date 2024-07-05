import { timestampNow } from '@constants/date'
import { WsEvents } from '@constants/events'
import type {
	ClientToServerEvents,
	ServerToClientEvents,
} from '@typings/interfaces'
import type { ImExSocket, WsMessage } from '@typings/interfaces/wsSocket'
import type { DefaultEventsMap } from 'node_modules/socket.io/dist/typed-events'
import type { Socket } from 'socket.io'

export const log = (
	msg: string,
	sender: string,
	status?: string | null,
): void =>
	console.log(
		`[${timestampNow()}]${status ? ' [' + status?.toUpperCase() + ']' : ''} ==-->> ${sender} ${msg}`,
	)

export type ServerSocket = Socket<
	ClientToServerEvents,
	ServerToClientEvents,
	DefaultEventsMap,
	any
>

export const sendWsMsg = (
	msg: string,
	ws: ImExSocket | ServerSocket,
	sender: string,
	customLogMsg?: string,
	payload?: any,
): void => {
	log(customLogMsg || msg, sender)
	const payloadStr: WsMessage = payload
		? { type: 'recipe', payload }
		: { type: 'message', payload: msg }
	ws?.send(payloadStr)
	log(
		`sendWsMsg ${sender}: ${JSON.stringify(payloadStr, null, 2)}`,
		sender,
		'info',
	)
}

export const emitWsMsg = (
	evt: WsEvents,
	ws: ServerSocket,
	sender: string,
	customLogMsg?: string,
	payload?: any,
): void => {
	log(customLogMsg || evt, sender)
	const payloadStr: any = payload
		? { type: 'recipe', payload }
		: { type: 'message', payload: evt }
	ws?.emit(payloadStr)
	log(
		`sendWsMsg ${sender}: ${JSON.stringify(payloadStr, null, 2)}`,
		sender,
		'info',
	)
}
