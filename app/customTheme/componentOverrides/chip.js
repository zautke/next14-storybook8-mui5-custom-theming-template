import theme from '../buildBaseTheme';

const MuiChip = {
  root: {
    borderRadius: 3,
    ...theme.typography.regular,
    border: 'solid 1px ' + theme.palette.interface['grey-03'],
    backgroundColor: theme.palette.common.white,
    height: 'auto', // reset MUI height
    paddingLeft: 0, // reset padding
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: 'none', // disable MUI transitions
  },
  label: {
    paddingLeft: `${theme.spacing.unit * 2}px`,
    paddingRight: `${theme.spacing.unit * 2}px`,
    paddingTop: `${theme.spacing.unit * .25}px`,
    paddingBottom: `${theme.spacing.unit * .75}px`,
    '&:not(:first-child)': {
      paddingLeft: `${theme.spacing.unit * 1.5}px `, // if there's an avatar, reduce padding
    },
  },
  clickable: {
    '&:hover': {
      borderColor: theme.palette.interface['grey-04'],
      //boxShadow: '0 1px 2px 0 rgba(34, 54, 70, 0.1)',
      backgroundColor: theme.palette.common.white,
    },
    '&:focus': {
      '& $label': {
        color: theme.palette.common.white,
      },
      //boxShadow: '0 1px 2px 0 rgba(34, 54, 70, 0.1)',
      backgroundColor: theme.palette.interface['blue-base'],
      borderColor: theme.palette.interface['blue-base'],
    },
  },
  deletable: {
    '&:focus': {
      border: '1px solid ' + theme.palette.interface['blue-base'],
      backgroundColor: theme.palette.interface['blue-base'],
      '& $deleteIcon': {
        color: theme.palette.common.white,
      },
    },
  },
  avatar: {
    marginLeft: `${theme.spacing.unit}px`,
    marginRight: -`${theme.spacing.unit}px`,
  },
  deleteIcon: {
    color: theme.palette.icon.main,
    margin: '0 0 0 0',
    paddingTop: `${theme.spacing.unit}px`,
    paddingBottom: `${theme.spacing.unit}px`,
    paddingLeft: `${theme.spacing.unit / 2}px`,
    paddingRight: `${theme.spacing.unit / 2}px`,
    height: 24,
    width: 24,
    borderLeft: 'solid 1px ' + theme.palette.interface['grey-03'],
  }
};

export default {
  MuiChip,
};
