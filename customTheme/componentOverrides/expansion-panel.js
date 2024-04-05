import theme from '../buildBaseTheme';

const MuiExpansionPanel = {
  root: {
  },
  disabled: {
    backgroundColor: theme.palette.interface['white'],
  }
};

const MuiExpansionPanelSummary = {
  root: {
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 6}px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 10}px`,
    minHeight: 12,
    '&$disabled': {
      opacity: 1,
    },
    '&$expanded': {
      minHeight: 24,
      borderBottom: '1px solid ' + theme.palette.interface['grey-03'],
    },
    '&:hover:not($expanded)': {
      backgroundColor: theme.palette.interface['grey-01'],
    },
  },
  content: {
    margin: 0,
    '&$expanded': {
      margin: 0,
    },
  },
  expandIcon: {
    left: 0,
    color: theme.palette.interface['blue-base'],
    '&$expanded': {
      transform: 'translateY(-50%) rotate(90deg)',
    }
  },
};

const MuiExpansionPanelDetails = {
  root: {
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 6}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
  },
};

const MuiExpansionPanelActions = {
  root: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  action: {
    padding: '8px 16px',
  }
};

export default {
  MuiExpansionPanel,
  MuiExpansionPanelSummary,
  MuiExpansionPanelDetails,
  MuiExpansionPanelActions
};
