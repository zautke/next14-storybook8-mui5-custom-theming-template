import React, { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

import { ClientContextProvider } from '@lib/providers/Client/ClientProvider'

export const metadata: Metadata = {
	title: 'Imported Recipe | ',
	description:
		'Real-Time Collaboration with Next.js: Building Interactive Multi-User Applications',
}

export default function ChatLayout({ children }: PropsWithChildren) {
	return <ClientContextProvider>{children}</ClientContextProvider>
}
