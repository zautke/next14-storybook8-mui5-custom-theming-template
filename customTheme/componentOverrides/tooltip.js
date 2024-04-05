import theme from '../buildBaseTheme';

const MuiTooltip = {
  tooltip: {
    ...theme.typography.small,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.interface['ink-dark'],
    padding: `7px ${theme.spacing.unit * 3}px 9px ${theme.spacing.unit * 3}px`,
    borderRadius: `${theme.spacing.unit}px`,
    border: '1px solid ' + theme.palette.interface['grey-04'],
    ...theme.zDepth.for('tooltip'),
  },
};

export default {
  MuiTooltip,
};
