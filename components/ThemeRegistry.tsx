// app/ThemeRegistry.tsx
'use client';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme, Theme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';
// import { theme } from '../theme/theme';
import theme from '../customTheme';
import { MuiThemeStateTuple, MuiThemeTuple } from '../customTheme/mui5';
import { FormControlLabel, Switch } from '@mui/material';

// import type {Theme, t} from '../mui-theme';

const defaultTheme = createTheme()

export const ThemeSwitcher = () => {
  const [activeTheme, setActiveTheme]:MuiThemeStateTuple<Theme> = useState<Theme>(theme);
  const themes: MuiThemeTuple = [theme, defaultTheme];

  const isEnhancedTheme: boolean = themes[0] === activeTheme;

  const handleThemeSwitch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setActiveTheme(themes[+!event.target.checked]);
  };

  useEffect( () => {
    console.log("activeTheme", activeTheme);
    console.log("defaultTheme", defaultTheme);
  }, [activeTheme])

  return (
    <FormControlLabel
      label={activeTheme.name}
      labelPlacement={'top'}
      control={
        <Switch
          checked={isEnhancedTheme}
          onChange={handleThemeSwitch}
          color="primary"
          value="dynamic-class-name"
        />
      }
    />
  )
}

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry({
  children
}: {
  children: React.ReactNode
}) {
  const options = {key: 'mui'}

  const [{ cache, flush }] = React.useState(() => {
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
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={createTheme()}>
        <CssBaseline enableColorScheme/>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
