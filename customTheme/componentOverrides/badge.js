import theme from '../buildBaseTheme';

const RADIUS = 8; // changed from MUI default of 12

const MuiBadge = {
  badge: {
    top: -RADIUS + 2, // +: down ; -: up
    right: -RADIUS , // +: left ; -: right
    width: RADIUS * 2,
    height: RADIUS * 2,

    ...theme.typography.smallSemibold,
    // spec calls for the above but it renders differently than Zeplin
    // using 10.4 renders much closer to the visual of Zeplin
    fontSize: 10.4,
    ...theme.palette.common.white,
    lineHeight: 'normal',
    textAlign: 'center',
  },
};

export default {
  MuiBadge,
};
