import theme from '../buildBaseTheme';

const MuiRadio = {
  root: {
    // "unchecked" base styles
    color: theme.palette.interface['grey-04'],
    backgroundColor: 'transparent',
    '&:hover': {
      color: theme.palette.interface['blue-hover'],
      backgroundColor: 'transparent',
    },
    '&:active': {
      color: theme.palette.interface['blue-pressed'],
    },

    '& svg': {
      fontSize: 16,
    }
  },
  colorSecondary: {
    '&$disabled': {
      color: theme.palette.interface['grey-04'],
      backgroundColor: 'transparent',
    },
    '&$checked': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
      '&:hover': {
        color: theme.palette.interface['blue-hover'],
        backgroundColor: 'transparent',
      },
      '&:active': {
        color: theme.palette.interface['blue-pressed'],
      },
    },
  },
};

export default {
  MuiRadio,
};
