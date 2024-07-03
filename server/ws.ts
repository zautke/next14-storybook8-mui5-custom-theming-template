import http from 'node:http'
import { WsEvents } from '@constants/events'
import type {
	ClientToServerEvents,
	ImExSocket,
	InterServerEvents,
	ServerToClientEvents,
	WsMessage,
} from '@typings/interfaces'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { Server } from 'socket.io'
import { cacheManager } from './store'

import dotenv from 'dotenv'

import { fetchHtml } from '@util/fetchHtml'
import { parseRecipe } from '@util/recipeParser'
import { log, sendWsMsg } from '@util/websocket'

import type { RecipeSchema } from '@components/typings/schemaOrgRecipe'

dotenv.config()

const PORT = process.env.WEBSOCKET_SERVER_PORT
	? Number.parseInt(process.env.WEBSOCKET_SERVER_PORT, 10)
	: 9999

const app = express()
const server = http.createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server)

app.use(cors(), bodyParser.json())

//app.get('/api/recipes/import', (req, res) => {
//	const cachedRecipes: RecipeSchema[] | undefined = cacheManager.get('recipes') ?? []
//	req.body.json({})
//	res.json({
//		data: cachedRecipes ?? [],
//	})
//})

//app.post('/api/recipes/import', (req, res) => {
//	try {
//		const { name } = req.body
//		const cachedRecipes?: RecipeSchema[] | undefined = cacheManager.get('recipes') ?? []
//		const isExisted = cachedRecipes?.find((recipe: string) => recipe === name)

//		if (!isExisted) {
//			const newRecipes = [...cachedRecipes, name.trim()]
//			cacheManager.set('rooms', newRecipes)
//		}

//		res.status(201)
//		res.send('created')
//	} catch (error) {
//		console.log(error)
//		res.status(500)
//		res.json({
//			message: error,
//		})
//	}
//})

const SENDER = 'SERVER'

let recipe: RecipeSchema | null = null
let hasStoredRecipe = false

io.on(WsEvents.CONNECTION, socket => {
	socket?.on(WsEvents.MESSAGE, message => {
		const msg = JSON.parse(message.toString())

		switch (msg.type) {
			case 'url': {
				const url = msg.payload
				sendWsMsg(WsEvents.URL_RECEIVED, socket, SENDER, `Received URL: ${url}`)
				try {
					;(async () => {
						const htmlContent = await fetchHtml(url)
						if (htmlContent) {
							const recipeSchemaObject = parseRecipe(
								htmlContent,
							) as RecipeSchema
							const parsedRecipeStr = JSON.stringify(
								recipeSchemaObject,
								null,
								2,
							)
							console.log(
								`\n\nRECIPE---------------------------------------\n${parsedRecipeStr}`,
							)

							if (recipeSchemaObject) {
								recipe = recipeSchemaObject
								hasStoredRecipe = true
								sendWsMsg(
									WsEvents.READY_TO_SEND,
									socket,
									SENDER,
									'Recipe parsed successfully, ready to send',
								)
							} else {
								sendWsMsg(
									WsEvents.SERVER_RECIPE_PARSE_FAILURE,
									socket,
									SENDER,
									'Error parsing recipe',
								)
							}
						}
					})()
				} catch (e) {
					log(`Error parsing recipe: ${(e as Error).message}`, 'error')
					sendWsMsg(
						WsEvents.RECIPE_INVALID,
						socket,
						SENDER,
						'Error parsing recipe',
					)
				}
				break
			}

			case 'message': {
				if (msg.payload === WsEvents.READY_TO_RECEIVE && hasStoredRecipe) {
					sendWsMsg(
						WsEvents.SENDING_RECIPE,
						socket,
						SENDER,
						'Received READY_TO_RECEIVE. Recipe sent to client',
						recipe,
					)
				} else if (msg === WsEvents.RECIPE_VERIFIED) {
					log('Recipe verified by client', SENDER)
					recipe = null
					hasStoredRecipe = false
				} else {
					log(`Received message: ${msg.payload}`, SENDER)
				}

				break
			}

			case 'image': {
				const imgSrc = msg.payload
				log(`\nReceived image src: ${imgSrc}`, SENDER)
				break
			}

			default:
				log('Unknown message type', 'warning', SENDER)
				break
		}
	})

	sendWsMsg(
		WsEvents.SERVER_CONNECTION_OPENED,
		socket,
		SENDER,
		'WebSocket server connection established',
	)
})

io.on(WsEvents.LISTENING, () => {
	log(`WebSocket server is listening on port ${PORT}`, SENDER)
})

io.on(WsEvents.ERROR, (err: unknown) => {
	log(`WebSocket error: ${(err as Error).message}`, SENDER, 'error')
})

io.on(WsEvents.CLOSE, () => {
	log('Server connection closed', SENDER)
})
