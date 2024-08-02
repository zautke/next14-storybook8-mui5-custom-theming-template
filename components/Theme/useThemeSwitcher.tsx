"use client";

import { useContext } from "react";
import { themeSwitcherContext } from "./ThemeSwitcherProvider";

export const useThemeSwitcher = () => {
	const themeSwitcher = useContext(themeSwitcherContext);
	if (!themeSwitcher) {
		throw new Error(
			"useThemeSwitcher must be used within a ThemeSwitcherProvider",
		);
	}
	return themeSwitcher;
};
