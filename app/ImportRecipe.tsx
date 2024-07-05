'use client'

import { RecipeCard, type RecipeCardProps } from '@components/RecipeCard'
import ThemeRegistry from '@components/ThemeRegistry'
import React from 'react'
import { type FC, type PropsWithChildren, useEffect } from 'react'

import {
	defaultRecipeSchema,
	sampleRecipe_grilledcorn,
	sampleRecipe_pozole,
} from '@constants/defaultRecipe'
import { WsEvents } from '@constants/index'
import { useClient } from '@lib/useClient'
import { isRecipeSchema } from '@typings/guards'
import type { WsMessage } from '@typings/interfaces/wsSocket'
import type { RecipeSchema } from '@typings/schemaOrgRecipe'
import { log, sendWsMsg } from '@util/websocket'

//export const dynamic = 'force-dynamic'

//ws.on("open", function open() {
//sendWsMsg(
//	wsMessages.CLIENT_CONNECTION_OPENED,
//	ws,
//	SENDER,
//	"Client on.open: Connection established with server",
//);
//});

//ws.on("message", (message: string): void => {
//	const msg = JSON.parse(message.toString());

//	log(`Incoming message: ${JSON.stringify(msg, null, 2)}`, SENDER, "info");

//	if (msg.type === "recipe") {
//		recipePayload = msg.payload;
//		sendWsMsg(
//			wsMessages.RECIPE_RECEIVED,
//			ws,
//			SENDER,
//			"Recipe received by client?",
//		);
//		if (isRecipeSchema(recipePayload)) {
//			sendWsMsg(
//				wsMessages.RECIPE_VERIFIED,
//				ws,
//				SENDER,
//				"Recipe verified by client?",
//			);
//			importedRecipe = JSON.parse(recipePayload);
//		} else {
//			sendWsMsg(wsMessages.RECIPE_INVALID, ws, SENDER, "Recipe invalid");
//		}

//		if (msg.type === "message") {
//			if (msg.payload === wsMessages.READY_TO_SEND) {
//				sendWsMsg(wsMessages.READY_TO_RECEIVE, ws, SENDER);
//			} else {
//				//log(`Fallthrough message: ${msg.payload}`, SENDER);
//			}
//		}
//	}
//});

const ImportRecipe: FC<RecipeCardProps> = (props: RecipeCardProps) => {
	const SENDER = 'CLIENT'

	const { client } = useClient()

	let recipePayload: WsMessage | string = ''
	let importedRecipe: RecipeSchema = defaultRecipeSchema

	client?.on(WsEvents.CONNECT, () => {
		sendWsMsg(WsEvents.CLIENT_CONNECTION_OPENED, client, SENDER)
		sendWsMsg(WsEvents.READY_TO_RECEIVE, client, SENDER)
	})

	client?.on(WsEvents.MESSAGE_RESPONSE, message => {
		const msg = JSON.parse(message.toString())

		log(`Incoming message: ${JSON.stringify(msg, null, 2)}`, SENDER, 'info')

		if (msg.type === 'recipe') {
			recipePayload = msg.payload
			importedRecipe = msg.payload as RecipeSchema
			sendWsMsg(
				WsEvents.RECIPE_RECEIVED,
				client,
				SENDER,
				'Recipe received by client?',
			)
			if (isRecipeSchema(recipePayload)) {
				sendWsMsg(
					WsEvents.RECIPE_VERIFIED,
					client,
					SENDER,
					'Recipe verified by client?',
				)
				//importedRecipe = JSON.parse(recipePayload);
			} else {
				sendWsMsg(WsEvents.RECIPE_INVALID, client, SENDER, 'Recipe invalid')
			}

			if (msg.type === 'message') {
				if (msg.payload === WsEvents.READY_TO_SEND) {
					sendWsMsg(WsEvents.READY_TO_RECEIVE, client, SENDER)
				} else {
					//log(`Fallthrough message: ${msg.payload}`, SENDER);
				}
			}
		}
	})

	client?.on(WsEvents.DISCONNECT, () => {
		console.log('WebSocket connection closed.')
	})

	client?.on(WsEvents.ERROR, error => {
		console.error('WebSocket error:', error)
	})
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		client?.on(WsEvents.MESSAGE_RESPONSE, message => {
			const msg = JSON.parse(message.toString())

			log(`Incoming message: ${JSON.stringify(msg, null, 2)}`, SENDER, 'info')

			if (msg.type === 'recipe') {
				recipePayload = msg.payload
				importedRecipe = msg.payload as RecipeSchema
				sendWsMsg(
					WsEvents.RECIPE_RECEIVED,
					client,
					SENDER,
					'Recipe received by client?',
				)
				if (isRecipeSchema(recipePayload)) {
					sendWsMsg(
						WsEvents.RECIPE_VERIFIED,
						client,
						SENDER,
						'Recipe verified by client?',
					)
					//importedRecipe = JSON.parse(recipePayload);
				} else {
					sendWsMsg(WsEvents.RECIPE_INVALID, client, SENDER, 'Recipe invalid')
				}

				if (msg.type === 'message') {
					if (JSON.parse(msg.payload) === WsEvents.READY_TO_SEND) {
						sendWsMsg(WsEvents.READY_TO_RECEIVE, client, SENDER)
					} else {
						//log(`Fallthrough message: ${msg.payload}`, SENDER);
					}
				}
			}
		})

		return () => {
			client?.close()
		}
	}, [client])
	return (
		<ThemeRegistry>
			<RecipeCard {...importedRecipe} {...props} />
		</ThemeRegistry>
	)
}

export default ImportRecipe
