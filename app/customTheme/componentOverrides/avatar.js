import theme from '../buildBaseTheme';

const MuiAvatar = {
  root: {
    ...theme.typography.barlowFont,
    lineHeight: 'normal'
  },
  colorDefault: {
    color: '#ffffff',
    backgroundColor: theme.palette.interface['grey-05'],
  }
};

export default {
  MuiAvatar,
};
