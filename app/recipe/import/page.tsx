import { defaultRecipeSchema } from '@constants/defaultRecipe'
import { ClientContextProvider } from '@lib/providers/Client/ClientProvider'
import ImportRecipe from './ImportRecipe'

export default function Page() {
	return (
		<ClientContextProvider>
			<ImportRecipe recipe={defaultRecipeSchema} />
		</ClientContextProvider>
	)
}
