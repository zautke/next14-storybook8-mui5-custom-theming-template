import theme from '../buildBaseTheme';

const MuiSnackbar = {
  root: {
    [theme.breakpoints.up('sm')]: {
      borderRadius: '3px',
    },
  },
};

const MuiSnackbarContent = {
  root: {
    [theme.breakpoints.up('sm')]: {
      borderRadius: '3px',
    },
    color: theme.palette.common.white,
    backgroundColor: theme.palette.interface['brand-deep-space'],
    padding: `0 0 0 ${theme.spacing.unit * 4}px`,
  },
  message: {
    ...theme.typography.regular,
    color: theme.palette.common.white,
    padding: `${theme.spacing.unit * 3}px 0px`,
  },
  action: {
    ...theme.typography.regular,
    color: theme.palette.common.white,
    height: '100%',
    marginRight: 0,
    borderLeft: '1px solid',
    borderColor: '#354969',
    paddingLeft: `${theme.spacing.unit * 3}px`,
    padding: `11px ${theme.spacing.unit * 3}px`,
  }
};

export default {
  MuiSnackbar,
  MuiSnackbarContent,
};
