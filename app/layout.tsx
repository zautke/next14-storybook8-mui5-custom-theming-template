import type { Metadata } from 'next'

//import "./globals.css";
//import { getFontWeights } from 'next/font';

import { promises as fs } from 'node:fs'

const getFontNames = async () => {
	const file = await fs.readFile(
		`${process.cwd()}/.next/server/next-font-manifest.json`,
		'utf8',
	)
	const data = JSON.parse(file)
	const fontNames = Object.keys(data.app)
	return fontNames
}

const _reportFontNames = async () => {
	const fontNames = await getFontNames()
	console.log(fontNames)
}

// export const metadata: Metadata = {
// 	title: {
// 		absolute: config.blog.metadata.title.absolute,
// 		default: config.blog.metadata.title.default,
// 		template: config.blog.metadata.title.template,
// 	},
// 	description: config.blog.metadata.description,
// 	openGraph: {
// 		title: config.blog.metadata.title.default,
// 		description: config.blog.metadata.description,
// 		images: [
// 			signOgImageUrl({
// 				title: config.blog.name,
// 			}),
// 		],
// 	},
// };

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<main>{children}</main>
			</body>
		</html>
	)
}
