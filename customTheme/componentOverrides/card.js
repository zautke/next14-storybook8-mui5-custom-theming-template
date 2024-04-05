import theme from '../buildBaseTheme';

const MuiCard = {
  root: {
    borderRadius: 3,
    ...theme.zDepth.for('card'),
    '&:hover': {
      ...theme.zDepth.for('card:hover'),
    },
  },
};

const MuiCardHeader = {
  root: {
    paddingBottom: 0,
    paddingTop: 24,
  },
  title: {
    ...theme.typography.title3,
  }
};

const MuiCardContent = {
  root: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: `${theme.spacing.unit * 6}px`,
      paddingLeft: `${theme.spacing.unit * 6}px`,
      paddingRight: `${theme.spacing.unit * 6}px`,
    },
    '&:last-child': {
      paddingBottom: `${theme.spacing.unit * 7}px`,
    },
  },
};

export default {
  MuiCard,
  MuiCardHeader,
  MuiCardContent,
};
