import theme from '../buildBaseTheme';

const MuiStepper = {
  root: {
    width: '100%',
    borderBottom: '1px solid ' + theme.palette.interface['grey-03'],
    padding: 14,
  }
};

const MuiStep = {};
const MuiStepContent = {};
const MuiStepButton = {};
const MuiStepIcon = {
  root: {
    fontSize: 18,
  },
  text: {
      ...theme.typography.barlowFont,
  },
};
const MuiStepConnector = {};

const MuiStepLabel = {
  label: {
    ...theme.typography.regular,

    '&$completed': {
      ...theme.typography.regularSemibold,
    },
    '&$active': {
      ...theme.typography.regularSemibold,
    },
  }
};

export default {
  MuiStepper,
  MuiStep,
  MuiStepContent,
  MuiStepButton,
  MuiStepLabel,
  MuiStepIcon,
  MuiStepConnector,
};
