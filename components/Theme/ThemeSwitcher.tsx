"use client";

import { CssBaseline, FormControlLabel, Switch } from "@mui/material";
import { type Theme, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import theme, { defaultTheme } from "../../customTheme";
import type { MuiThemeStateTuple, MuiThemeTuple } from "../../customTheme/mui5";

export const ThemeSwitcher: FC<PropsWithChildren<unknown>> = ({
	children,
}): JSX.Element => {
	const { activeTheme } = useThemeSwitcher();

	useEffect(() => {
		console.log("useEffect(): ", activeTheme.name);
	}, [activeTheme]);

	return { children };
};
