//import palette from '../palette';   // <-- for future use

export const defaultPropsOverrides = {
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      }
    },
  }
};

export default defaultPropsOverrides;

