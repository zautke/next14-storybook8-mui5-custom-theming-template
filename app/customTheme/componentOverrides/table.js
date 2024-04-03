import theme from '../buildBaseTheme';

const color = theme.palette.color;

// theme.spacing(1) = 8px

const MuiTable = {
  root: {},
};

const MuiTableBody = {
  root: {},
};

const MuiTableHead = {
  root: {},
};

const MuiTableRow = {
  root: {
    backgroundColor: color['white'],
    '&$hover:hover': {
      backgroundColor: color['gray1'],
    },
    '&$selected': {
      backgroundColor: color['gray2'],
    },
  },
  head: {},
  selected: {},
};

const MuiTableCell = {
  root: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(2)}px $${theme.spacing(3)}px`, // '16px 24px 16px 24px'
    '&:last-child': {
      paddingRight: theme.spacing(3),
    },
  },
  body: {
    ...theme.typography.regular,
  },
  head: {
    ...theme.typography.label,
  },
};

const MuiTableSortLabel = {
  active: {
    color: color['teal1'],
  },
};

const MuiTablePagination = {
  root: {
    ...theme.typography.regular,
  },
  caption: {
    ...theme.typography.regular,
  },
  input: {
    border: 'none',
  },
  select: {
    minWidth: 0,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(3),
  },
  selectRoot: {
    ...theme.typography.regular,
  },
  selectIcon: {
    top: '5px',
    color: theme.palette.icon.main,
    width: theme.spacing(1)
  },
  actions: {
    '& svg': {
      color: theme.palette.icon.main,
      width: theme.spacing(2.5), // 20px
    },
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
};

export default {
  MuiTable,
  MuiTableBody,
  MuiTableHead,
  MuiTableRow,
  MuiTableCell,
  MuiTableSortLabel,
  MuiTablePagination
};
