import { useContext } from "react";
import ThemeSwitcherContext from "./ThemeSwitcherProvider";

const useThemeSwitcher = () => {
	const context = useContext(ThemeSwitcherContext);

	if (context === undefined) {
		throw new Error(
			"useThemeSwitcher must be used within a ThemeSwitcherProvider",
		);
	}

	return context;
};

export default useThemeSwitcher;
