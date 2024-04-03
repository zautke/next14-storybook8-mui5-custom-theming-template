import theme from '../buildBaseTheme';

const MuiList = {
  padding: {
    paddingTop: 4,
    paddingBottom: 4,
  },
};

const MuiListItem = {
  root: {
    '&:hover, &$button:hover': {
      backgroundColor: theme.palette.interface[''],
    },
  },
  default: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  gutters: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 12,
      paddingRight: 12,
    }
  },
};

const MuiListItemText = {
  root: {
    paddingRight: 0,
    paddingLeft: 12,
    '&:first-child': { // the default; no avatar, icon or other prefixing component
      paddingLeft: 0,
      paddingRight: 0,
      ...theme.typography.regular,
    },
  },
  primary: {
    ...theme.typography.regular,
    color: theme.palette.interface[''],
  },
  secondary: {
    ...theme.typography.small,
  }
};

const MuiListItemIcon = {
  root: {
    marginRight: 0,
    color: theme.palette.icon.main,
    height: 15,
    width: 15,
    '&:first-child': {
      paddingRight: 0,
    },
  }
};

const MuiListSubheader = {
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: `${theme.spacing.unit * 3}px`,
      paddingBottom: `${theme.spacing.unit * 2}px`,
      paddingLeft: 12,
      paddingRight: 12,
    }
  }
}


export default {
  MuiList,
  MuiListItem,
  MuiListItemIcon,
  MuiListItemText,
  MuiListSubheader,
};
