'use client'

import React, {
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import dotenv from 'dotenv'
import { Socket, io } from 'socket.io-client'
import {
	ClientToServerEvents,
	ServerToClientEvents,
} from '@components/typings/interfaces'

dotenv.config()

interface Client {
	client?: Socket<ServerToClientEvents, ClientToServerEvents> | null
}

const DEFAULT_VALUE: Client = {
	client: null,
}

export const ClientContext = createContext<Client>(DEFAULT_VALUE)

export const ClientContextProvider = ({ children }: PropsWithChildren) => {
	const [socket, setSocket] = useState<Socket<
		ServerToClientEvents,
		ClientToServerEvents
	> | null>(null)

	useEffect(() => {
		const client: Socket<ServerToClientEvents, ClientToServerEvents> = io(
			process.env.WEB_SOCKET_URL!,
			{
				transports: ['websocket'],
			},
		)

		setSocket(client)

		return () => {
			setSocket(null)
		}
	}, [])

	return (
		<ClientContext.Provider
			value={{
				client: socket,
			}}
		>
			{children}
		</ClientContext.Provider>
	)
}
