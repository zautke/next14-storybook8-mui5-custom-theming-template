'use client'

import { defaultRecipeSchema } from '@constants/defaultRecipe'
import ImportRecipe from './ImportRecipe'

export default function Page() {
	return (
		<ClientContextProvider>
			<ImportRecipe recipe={defaultRecipeSchema} />
		</ClientContextProvider>
	)
}
