"use client";

import { FormControlLabel, Switch, Theme } from "@mui/material";

interface ThemeSwitchProps {
	activetheme: Theme;
	//toggleTheme: (newTheme: Theme) => void;
	setactivetheme?: Dispatch<SetStateAction<Theme>>;
	//themes: MuiThemeTuple;
}
import React, { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { useThemeSwitcher } from "./useThemeSwitcher";

export const ThemeSwitch: FC<PropsWithChildren<ThemeSwitchProps>> = ({
	...props
}) => {
	const { activeTheme, toggleTheme, themes } = useThemeSwitcher();

	const isEnhancedTheme = activeTheme.name === "Enhanced";

	//console.log("ThemeSwitch.tsx: activeTheme.name: ", activeTheme.name);
	//console.log("ThemeSwitch.tsx: theme: ", JSON.stringify(activeTheme, null, 2));

	const handleThemeSwitch = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void =>
		props.setactivetheme
			? props.setactivetheme(themes[+!event.target.checked])
			: undefined;

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
