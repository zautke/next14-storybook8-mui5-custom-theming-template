"use client";

import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { type Theme, ThemeProvider } from "@mui/material/styles";

import { MuiThemeTuple } from "@theme/mui5";
import {
	Dispatch,
	FC,
	PropsWithChildren,
	ProviderProps,
	ReactNode,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from "react";
import { createContext } from "react";
import theme, { defaultTheme } from "../../customTheme";

export interface ThemeSwitcherProps {
	activeTheme: Theme;
	toggleTheme: (newTheme: Theme) => void;
	themes: MuiThemeTuple;
}

const initial = {
	activeTheme: defaultTheme,
	toggleTheme: () => null,
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
		setActiveTheme(newTheme);
	};

	const themeData = useMemo(
		() => ({ activeTheme, toggleTheme, themes }),
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
