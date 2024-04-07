import theme from '../buildBaseTheme'
console.log("button.js")

const MuiButton = {
  root: {
    ...theme.typography.button,
    padding: '4px 12px 6px 12px',
    minHeight: 0, // default: 36
    textAlign: 'center',
    textTransform: 'capitalize',
    borderRadius: 3,
    border: 0,
    minWidth: 0,
    ///...theme.zDepth.for('button'),

    '&$text:not($contained):not($outlined)': {
      color: theme.palette.colorGuide['blue-base'],
      backgroundColor: 'transparent',
      '&:active': {
        color: theme.palette.colorGuide['blue-pressed'], // important to make it override hover color
        backgroundColor: 'transparent',
      },
      '&:hover:not(:active)': {
        color: theme.palette.colorGuide['blue-hover'],
        backgroundColor: 'transparent',
      },
      '&$focusVisible': {
        color: theme.palette.colorGuide['blue-hover'],
        backgroundColor: 'transparent',
      },
      '&$disabled': {
        color: theme.palette.colorGuide['blue-disabled'],
      },
    },
  },

  text: {},
  textPrimary: {},

  contained: {
    ...theme.typography.regularSemibold,
    ...theme.typography.whiteText,
    backgroundColor: theme.palette.colorGuide['blue-base'],
    boxShadow: '0 1px 2px 0 rgba(34, 54, 70, 0.1)',
    '&:active': {
      boxShadow: 'none',
      backgroundColor: theme.palette.colorGuide['blue-pressed'] + '!important', // important to make it override hover bg
    },
    '&:hover': {
      backgroundColor: theme.palette.colorGuide['blue-hover'],
    },
    '&$focusVisible': {
      backgroundColor: theme.palette.colorGuide['blue-hover'],
      border: `solid 1px ${theme.palette.colorGuide['blue-pressed']}`,
    },
    '&$disabled': {
      backgroundColor: theme.palette.colorGuide['blue-disabled'],
    },
  },

  outlined: {
    ...theme.typography.regular,
    color: theme.palette.colorGuide['ink-base'],
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.colorGuide['grey-04']}`,
    '&:hover': {
      border: `1px solid ${theme.palette.colorGuide['grey-05']}`,
      backgroundColor: 'transparent',
    },
    '&$focusVisible': {
      border: `1px solid ${theme.palette.colorGuide['grey-05']}`,
      backgroundColor: 'transparent',
    },
    '&:active': {
      border: `1px solid ${theme.palette.colorGuide['grey-04']}`,
      backgroundColor: theme.palette.colorGuide['grey-03'],
    },
    '&$disabled': {
      border: `1px solid ${theme.palette.colorGuide['grey-03']}`,
      color: theme.palette.action.disabled, // ink-light
      backgroundColor: 'transparent'
    },
  },
};

const MuiButtonBase = {
  styleOverrides: {
    root: {
      '&$disabled': {
        color: theme.palette.action.disabled,
      }
    },
  },
};

export default {
  MuiButton,
  MuiButtonBase,
};

