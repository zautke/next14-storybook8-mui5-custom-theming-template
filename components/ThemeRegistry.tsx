"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import type { Theme } from "@mui/material";
import { FormControlLabel, Switch } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useServerInsertedHTML } from "next/navigation";
import React, {
	type Context,
	type Dispatch,
	type FC,
	type PropsWithChildren,
	ProviderProps,
	type ReactNode,
	type SetStateAction,
	useEffect,
	useState,
} from "react";
import theme, { defaultTheme } from "../customTheme";
import type { MuiThemeStateTuple, MuiThemeTuple } from "../customTheme/mui5";

import type { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";

// const defaultTheme = createTheme({name: 'Default'})
interface ActiveThemeProps {
	activeTheme: Theme;
	children?: ReactNode;
}

interface _ThemeSwitcherProps extends ActiveThemeProps {
	themes: MuiThemeTuple;
	setActiveTheme: Dispatch<SetStateAction<Theme>>;
}
interface _ThemeSwitcherProviderProps
	extends ThemeProviderProps,
		ActiveThemeProps {
	children: React.ReactNode;
}

const _SwitcherContext: Context<Theme> = React.createContext(defaultTheme);
const _ThemeSwitcherProvider = ({ theme, children }: ThemeProviderProps) => (
	<ThemeProvider theme={theme}>{children && children}</ThemeProvider>
);

const themes: MuiThemeTuple = [theme, defaultTheme];

export const ThemeSwitcher: FC<PropsWithChildren<unknown>> = ({
	children,
}): JSX.Element => {
	const [activeTheme, setActiveTheme]: MuiThemeStateTuple<Theme> =
		useState<Theme>(defaultTheme);

	const isEnhancedTheme: boolean = themes[0] === activeTheme;

	const handleThemeSwitch = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setActiveTheme(themes[+!event.target.checked]);
	};

	useEffect(() => {
		console.log(activeTheme.name);
	}, [activeTheme]);

	return (
		<ThemeProvider theme={activeTheme}>
			<FormControlLabel
				label={activeTheme.name}
				labelPlacement={"top"}
				control={
					<Switch
						checked={isEnhancedTheme}
						onChange={handleThemeSwitch}
						color="primary"
					/>
				}
			/>
			{children && children}
		</ThemeProvider>
	);
};

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry({
	children,
}: { children: React.ReactNode }) {
	const options = { key: "mui" };

	const [{ cache, flush }] = useState(() => {
		const cache = createCache(options);
		cache.compat = true;
		const prevInsert = cache.insert;
		let inserted: string[] = [];
		cache.insert = (...args) => {
			const serialized = args[1];
			if (cache.inserted[serialized.name] === undefined) {
				inserted.push(serialized.name);
			}
			return prevInsert(...args);
		};
		const flush = () => {
			const prevInserted = inserted;
			inserted = [];
			return prevInserted;
		};
		return { cache, flush };
	});

	useServerInsertedHTML(() => {
		const names = flush();
		if (names.length === 0) {
			return null;
		}
		let styles = "";
		for (const name of names) {
			styles += cache.inserted[name];
		}
		return (
			<style
				key={cache.key}
				data-emotion={`${cache.key} ${names.join(" ")}`}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: styles,
				}}
			/>
		);
	});

	return (
		<CacheProvider value={cache}>
			<ThemeSwitcher>
				<CssBaseline enableColorScheme />
				{children}
			</ThemeSwitcher>
		</CacheProvider>
	);
}
