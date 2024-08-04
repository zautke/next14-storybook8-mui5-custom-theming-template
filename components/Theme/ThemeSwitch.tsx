"use client";

import { FormControlLabel, Switch, type Theme } from "@mui/material";
import { useThemeSwitcher } from "./useThemeSwitcher";

import React, { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";

interface ThemeSwitchProps {
	activeTheme: Theme;
	//toggleTheme: (newTheme: Theme) => void;
	setActiveTheme?: Dispatch<SetStateAction<Theme>>;
	//themes: MuiThemeTuple;
}

export const ThemeSwitch: FC<PropsWithChildren<ThemeSwitchProps>> = ({
	activeTheme,
	setActiveTheme,
}: ThemeSwitchProps) => {
	const { themes } = useThemeSwitcher();
	const isEnhancedTheme = activeTheme === themes[0];
	//console.log("ThemeSwitch.tsx: theme: ", JSON.stringify(activeTheme, null, 2));

	const handleThemeSwitch = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void =>
		setActiveTheme ? setActiveTheme(themes[+!event.target.checked]) : undefined;

	return (
		<>
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
		</>
	);
};

export default ThemeSwitch;
