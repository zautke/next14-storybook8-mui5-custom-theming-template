import theme from '../buildBaseTheme';
import {colorGuide as color} from '../colorGuide';

const MuiTabs = {
  root: {
    backgroundColor: theme.palette.common.white,
    borderBottom: '1px solid ' + color['green-base'],
  },

  indicator: {
    backgroundColor: theme.palette.primary.main,
    height: 2,
   },
};

const MuiTab = {
  root: {
    marginRight: 16,
    '&:last-child': {
      marginRight: 0,
    },

    minWidth: 0,
    [theme.breakpoints.up('md')]: {
      minWidth: 0, // Override min-width: 160 -- this is a GLOBAL theme change...
    },

    '&:hover': {
      color: theme.palette.primary.main,
      fontWeight: 'normal',
    },
    '&$selected': { // "Active" state
      ...theme.typography.arialBase,
      lineHeight: 'normal',
    },
    '&:active': { // "Pressed" state
      color: color[''],
      fontWeight: 'normal',
   },
    '&$disabled': {
      color: color[''],
      fontWeight: 'normal',
    },
  },

  textColorInherit: { // "Inactive" state (default rest state)
      ...theme.typography.arialBase,
      lineHeight: 'normal',
      opacity: 1,
  },

  label: {
    fontSize: 'inherit', // original-> fontSize: theme.typography.pxToRem(14),
    whiteSpace: 'normal',

    [theme.breakpoints.up('md')]: {
      fontSize: 'inherit', // original-> fontSize: theme.typography.pxToRem(13),
    },
  },

  labelContainer: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    },
  },
};

export default {
  MuiTabs,
  MuiTab,
};
