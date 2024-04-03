import theme from '../buildBaseTheme';

// theme.spacing = 8

const MuiDrawer = {
  paper: {
    backgroundImage: `linear-gradient(154deg, #1b406c, ${theme.palette.interface['']})`,
    ...theme.typography.regular,
    color: theme.palette.interface[''],

    // target MuiList styles within Drawer specifically
    '& div[class*="root-"][class*="button-"]:hover': {
      backgroundColor: 'rgba(10, 113, 208, 0.15)',
    },
    '& div[class*="MuiListSubheader-sticky"]': {
      paddingLeft: theme.spacing * 2,
    },
    '& div[class*="gutters-"]': {
      paddingLeft: theme.spacing * 2,
    },
    '& div[class*="MuiListItem-button"]': {
      paddingTop: theme.spacing * 2,
      paddingBottom: theme.spacing * .6 // 10,
    },
    '& div[class*="MuiListItemIcon-root"]': {

    },
  },
};

export default {
  MuiDrawer,
};
