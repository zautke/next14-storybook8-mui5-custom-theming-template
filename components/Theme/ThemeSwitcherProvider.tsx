"use client";

import { CssBaseline, FormControlLabel, Switch } from "@mui/material";
import { type Theme, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Theme } from "@mui/material/styles";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createContext } from "react";
import theme, { defaultTheme } from "../../customTheme";
import type { MuiThemeStateTuple, MuiThemeTuple } from "../../customTheme/mui5";
//import ThemeSwitcherContext from "./ThemeSwitcherContext";

export const ThemeSwitcherProvider = ({ children }: ReactNode) => {
	const [activeTheme, setActiveTheme] = useState(defaultTheme);

	const ThemeSwitcherContext = createContext({
		activeTheme,
		setActiveTheme,
		themes: [theme, defaultTheme],
	});

	return (
		<ThemeSwitcherContext.Provider value={ThemeSwitcherContext}>
			<AppRouterCacheProvider options={{ enableCssLayer: true }}>
				<ThemeProvider theme={activeTheme}>
					<CssBaseline />
					{children && children}
				</ThemeProvider>
			</AppRouterCacheProvider>
		</ThemeSwitcherContext.Provider>
	);
};
export ThemeSwitcherContext;

export default ThemeSwitcherProvider;
