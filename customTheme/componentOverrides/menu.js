import theme from '../buildBaseTheme';

const MuiMenu = {
  paper: {
    padding: 0,
  },
};

const MuiMenuItem = {
  root: {
    ...theme.typography.regular,
    paddingRight: 12,
    paddingLeft: 12,
    '&$selected': {
      ...theme.typography.regularSemibold,
      backgroundColor: 'transparent',
    },
  },
  selected: {},
};

export default {
  MuiMenu,
  MuiMenuItem,
};
