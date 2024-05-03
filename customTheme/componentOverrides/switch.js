import theme from '../buildBaseTheme';

const MuiSwitch = {
  colorSecondary: {
    '&$checked': {
      color: theme.palette.common.white,
      '& + $bar': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
    },
  },
  bar: {
    borderRadius: 10,
    width: 34,
    height: 20,
    marginTop: -10,
    marginLeft: -17,
    backgroundColor: theme.palette.colorGuide['grey-05'],
    opacity: 1,
  },
  icon: {
    width: 18,
    height: 18,
  },
  disabled: {
    '&$checked': {
      color: theme.palette.common.white,
      '& + $bar': {
        backgroundColor: 'red',
        opacity: 1,
      },
    },
    '&$switchBase': {
      color: 'white',
      '&$checked& + $bar': {
        backgroundColor: theme.palette.colorGuide['blue-disabled'],
        opacity: 1,
      },
      '& + $bar': {
        backgroundColor: theme.palette.colorGuide['grey-04'],
        opacity: 1,
      },
    },
  },
};

export default {
  MuiSwitch,
};
