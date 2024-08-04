"use client";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { type Theme } from "@mui/material/styles";

import { MuiThemeTuple } from "@theme/mui5";
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";
import { createContext } from "react";
import theme, { defaultTheme } from "../../customTheme";
//import { ThemeProvider as Emotion10ThemeProvider } from "emotion-theming";

export interface ThemeSwitcherProps {
	activeTheme: Theme;
	toggleTheme: (newTheme: Theme) => void;
	setActiveTheme: Dispatch<SetStateAction<Theme>>;
	themes: MuiThemeTuple;
}

const initial = {
	activeTheme: defaultTheme,
	toggleTheme: () => null,
	setActiveTheme: null,
	themes: [theme, defaultTheme],
};

export type ThemeSwitcherType = [
	typeof initial,
	Dispatch<SetStateAction<Theme>> | null,
];

export const themeSwitcherContext = createContext<ThemeSwitcherProps>(
	[] as unknown as ThemeSwitcherProps,
	//activeTheme: defaultTheme,
	//setActiveTheme: () => null,
	//themes: [theme, defaultTheme],
);

interface _props {}

export default function ThemeSwitcherProvider({
	children,
}: { children: ReactNode }) {
	const [activeTheme, setActiveTheme] = useState<Theme>(defaultTheme);

	const themes: MuiThemeTuple = [theme, defaultTheme];

	const toggleTheme = (newTheme: Theme): void => {
		//setActiveTheme(newTheme);
		console.log(
			"ThemeSwitcherProvider.tsx: toggleTheme: newTheme: ",
			JSON.stringify(newTheme, null, 2),
		);
	};

	const themeData = useMemo(
		() => ({ activeTheme, toggleTheme, themes, setActiveTheme }),
		[activeTheme],
	);

	return (
		<themeSwitcherContext.Provider value={themeData}>
			<AppRouterCacheProvider options={{ enableCssLayer: true }}>
				<ThemeProvider theme={activeTheme}>
					<CssBaseline />
					{children && children}
				</ThemeProvider>
			</AppRouterCacheProvider>
		</themeSwitcherContext.Provider>
	);
}
