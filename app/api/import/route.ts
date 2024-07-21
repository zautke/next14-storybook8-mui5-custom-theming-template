//'use client'

//import { RecipeContext } from '@/lib/RecipeProvider'
//import { useRecipeContext } from '@/lib/hooks/useRecipeContext'
//import { defaultRecipeSchema } from '@constants/defaultRecipe'
//import { NextResponse } from 'next/server'

//let importedRecipe = defaultRecipeSchema

//export async function GET(_request: Request) {
//	return NextResponse.json({ importedRecipe })
//}

//// const { setRecipe } = useContext(RecipeContext)

//export async function POST(request: Request) {
//	try {
//		importedRecipe = await request.json()
//		console.log(
//			`Received recipe data:---------------------------\n${recipe}\n------------------------------------------------`,
//		)

//		return async () => {
//			const { setRecipe } = useRecipeCOntext()
//			setRecipe(importedRecipe)
//		}
//	} catch (error) {
//		console.error('Error processing recipe data:', error)
//		return NextResponse.json(
//			{ message: 'Failed to process recipe data' },
//			{ status: 500 },
//		)
//	}
//}

export {}
