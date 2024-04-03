import theme from '../buildBaseTheme';

const MuiToolbar = {
  root: {
    [theme.breakpoints.up('sm')]: {
      minHeight: `${theme.spacing.unit * 12}px`,
    },
  },
};

export default {
  MuiToolbar,
};
