import React, {FC, MouseEvent} from 'react';
import { FormControlLabel, IconButton, IconButtonProps, Switch, Theme } from "@mui/material";
import { Brightness4 as LightIcon } from "@mui/icons-material";

interface ThemeSwitcherProps {
  oChange: (event:React.ChangeEvent<HTMLInputElement>) => void;
  activeTheme: Theme;
  themes: Theme[];
  themeName?: string;
}


export const ThemeSwitcher = (props: ThemeSwitcherProps): JSX.Element => {
  const {
    activeTheme,
    themes,
    themeName
  } = props;

  const handleThemeSwitch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {};

  return (
    <FormControlLabel
      control={
        <Switch
          checked={themes[0] === activeTheme}
          onChange={handleThemeSwitch}
          color="primary"
          value="dynamic-class-name"
        />
      }
      label={themeName}
    />
  )
}

export default ThemeSwitcher;


