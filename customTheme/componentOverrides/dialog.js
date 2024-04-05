import theme from '../buildBaseTheme';

const MuiDialog = {
  paper: {
    ...theme.zDepth.for('modal'),
    //rounded: true,
  }
}

const MuiDialogTitle = {
  root: {
    padding: '11px 16px',
    ...theme.typography.title3Dkbg,
    lineHeight: 'normal',
    backgroundColor: theme.palette.primary.main,
  }
};
//
const MuiDialogContent = {
  root: {
    padding: `24px 16px 20px 16px`,
    '&:first-child': {
      paddingTop: 24,
    },
  }
};

const MuiDialogContentText = {
  root: {
    ...theme.typography.regular,
    opacity: 1,
  }
};

const MuiDialogActions = {
  root: {
    margin: 0,
    padding: '0px 16px 16px 16px',
  },
  action: {
    margin: 0,
    marginLeft: `8px`,
  }
};

export default {
  MuiDialog,
  MuiDialogTitle,
  MuiDialogContent,
  MuiDialogContentText,
  MuiDialogActions,
};
