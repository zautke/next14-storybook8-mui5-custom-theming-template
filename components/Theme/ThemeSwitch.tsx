import { FormControlLabel, Switch } from "@mui/material";
import React, { FC, PropsWithChildren } from "react";
import { useThemeSwitcher } from "./useThemeSwitcher";

export const ThemeSwitch: FC<PropsWithChildren<unknown>> = ({ ...props }) => {
	const { activeTheme, toggleTheme, themes } = useThemeSwitcher();

	const isEnhancedTheme = activeTheme.name === "Enhanced";

	//const themes = [theme, defaultTheme];

	const handleThemeSwitch = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => toggleTheme(themes[+!event.target.checked]);

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
				{...props}
			/>
		</>
	);
};

export default ThemeSwitch;
