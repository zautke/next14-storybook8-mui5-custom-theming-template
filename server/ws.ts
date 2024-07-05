import dotenv from 'dotenv'
import WebSocket, { WebSocketServer } from 'ws'

import { WsEvents } from '@constants/events'
import { fetchHtml } from '@util/fetchHtml'
import { parseRecipe } from '@util/recipeParser'
import { emitWsMsg, log } from '@util/websocket'

dotenv.config()

const PORT = process.env.WEBSOCKET_SERVER_PORT
	? Number.parseInt(process.env.WEBSOCKET_SERVER_PORT, 10)
	: 9999
const wss: WebSocketServer = new WebSocketServer({ port: PORT })

let recipe: string = ''
let hasStoredRecipe: boolean = false

const onConnection = (server: WebSocket): void => {
	server.on('connection', (ws: WebSocket): void => {
		log(JSON.stringify(wss.clients, null, 2), 'info')
		ws.on('message', (message: string): void => {
			const msg = JSON.parse(message.toString())

			switch (msg.type) {
				case 'url': {
					const url = msg.payload
					emitWsMsg(WsEvents.URL_RECEIVED, ws, `Received URL: ${url}`)
					try {
						;(async () => {
							const htmlContent = await fetchHtml(url)
							if (htmlContent) {
								const parsedRecipe = JSON.stringify(
									parseRecipe(htmlContent),
									null,
									2,
								)
								console.log(
									`\n\nRECIPE---------------------------------------\n${parsedRecipe}`,
								)

								if (parsedRecipe) {
									recipe = parsedRecipe
									hasStoredRecipe = true
									emitWsMsg(
										WsEvents.READY_TO_SEND,
										ws,
										'Recipe parsed successfully, ready to send',
									)
								} else {
									emitWsMsg(
										WsEvents.SERVER_RECIPE_PARSE_FAILURE,
										ws,
										'Error parsing recipe',
									)
								}
							}
						})()
					} catch (e) {
						log(`Error parsing recipe: ${(e as Error).message}`, 'error')
						emitWsMsg(WsEvents.SERVER_RECIPE_ERROR, ws, 'Error parsing recipe')
					}
					break
				}

				case 'message': {
					if (msg.payload === WsEvents.READY_TO_RECEIVE && hasStoredRecipe) {
						emitWsMsg(WsEvents.SENDING_RECIPE, ws, 'Recipe sent to client', {
							type: 'recipe',
							payload: recipe,
						})
					} else if (msg === WsEvents.RECIPE_VERIFIED) {
						log('Recipe verified by client')
						recipe = ''
						hasStoredRecipe = false
					} else {
						log(`Received message: ${msg.payload}`)
					}

					break
				}

				case 'image': {
					const imgSrc = msg.payload
					log(`\nReceived image src: ${imgSrc}`)
					break
				}

				default:
					log('Unknown message type', 'warning')
					break
			}
		})

		emitWsMsg(
			WsEvents.SERVER_CONNECTION_OPENED,
			ws,
			'WebSocket server connection established',
		)
	})
}

onConnection(wss)

wss.on('listening', () => {
	log(`WebSocket server is listening on port ${PORT}`)
})

wss.on('error', err => {
	log(`WebSocket error: ${(err as Error).message}`, 'error')
})

wss.on('close', () => {
	log('Server connection closed')
})
