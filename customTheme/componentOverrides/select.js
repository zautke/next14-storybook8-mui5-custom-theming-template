import theme from '../buildBaseTheme';


const MuiSelect = {
  root: {
    border: 'none',
    backgroundColor: theme.palette.colorGuide['grey-02'],

    disabled: {
      backgroundColor: theme.palette.colorGuide['grey-02'],
      '& svg': {
        color: theme.palette.common.white,
      }
    },
  },
  error: {},
  focused: {},
  select: {},
  selectMenu: {
    //width: 'calc(100% - 32px)',
  },
  icon: {
    color: theme.palette.colorGuide['grey-03'],
    width: 22,
    height: 'auto',
    padding: '4px 6px 2px 0'
  },
};

export default {
  MuiSelect,
};
