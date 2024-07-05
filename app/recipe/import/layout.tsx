import type { Metadata } from 'next'
import React, { PropsWithChildren } from 'react'

import { ClientContextProvider } from '@lib/providers/Client/ClientProvider'

//export const metadata: Metadata = {
//	title: 'Imported Recipe | ',
//	description:
//		'Real-Time Collaboration with Next.js: Building Interactive Multi-User Applications',
//}

export default function RecipeLayout({ children }: PropsWithChildren) {
	return <ClientContextProvider>{children}</ClientContextProvider>
}
