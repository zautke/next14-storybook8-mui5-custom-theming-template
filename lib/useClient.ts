import { useContext } from 'react'

import { ClientContext } from '@lib/providers/Client/ClientProvider'

export const useClient = () => {
	const context = useContext(ClientContext)
	if (!context) {
		throw new Error('This cannot be used outside the ClientProvider component')
	}
	return context
}
