'use client'

import { io } from 'socket.io-client'

export const socket = io('localhost:9001', {
	transports: ['websocket'],
})
