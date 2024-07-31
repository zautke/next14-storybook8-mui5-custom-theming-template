"use client";

import { CssBaseline, FormControlLabel, Switch } from "@mui/material";
import { type Theme, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import theme, { defaultTheme } from "../customTheme";
import type { MuiThemeStateTuple, MuiThemeTuple } from "../customTheme/mui5";

const themes: MuiThemeTuple = [theme, defaultTheme];

export const ThemeSwitcher: FC<PropsWithChildren<unknown>> = ({
	children,
}): JSX.Element => {
	const [activeTheme, setActiveTheme]: MuiThemeStateTuple<Theme> =
		useState<Theme>(defaultTheme);

	const isEnhancedTheme: boolean = themes[0] === activeTheme;

	const handleThemeSwitch = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => setActiveTheme(themes[+!event.target.checked]);

	useEffect(() => {
		console.log("useEffect(): ", activeTheme.name);
	}, [activeTheme]);

	return (
		<AppRouterCacheProvider options={{ enableCssLayer: true }}>
			<ThemeProvider theme={activeTheme}>
				<CssBaseline />
				<FormControlLabel
					disabled={false}
					label={activeTheme.name}
					labelPlacement={"top"}
					control={
						<Switch
							checked={isEnhancedTheme}
							onChange={handleThemeSwitch}
							color="primary"
							size="small"
						/>
					}
				/>
				{children && children}
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
};
