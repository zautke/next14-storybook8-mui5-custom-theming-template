import theme from '../buildBaseTheme';


const MuiSelect = {
  root: {
    border: 'none',
    ...theme.zDepth.for('select'),

    disabled: {
      backgroundColor: theme.palette.interface['grey-02'],
      '& svg': {
        color: theme.palette.icon.disabled,
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
    color: theme.palette.icon.main,
    width: 22,
    height: 'auto',
    padding: '4px 6px 2px 0'
  },
};

export default {
  MuiSelect,
};
