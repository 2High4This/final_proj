import { blue } from '@mui/material/colors';

const buttonBlue = blue[500];
const drawerWidth = 240;
const styles = {

  offscreen: {
    display: `none`
  },

  errorMsg: {
    backgroundColor: `lightpink`,
    color: `firebrick`,
    fontWeight: `bold`,
    padding: `0.5rem`,
    marginBottom: `0.5rem`,
    width: `100%`
  },

  appbar: { width: `100%` },

  title: { margin: `1`, flexGrow: `1` },

  rootBox: {
    paddingLeft: `3rem`,
    alignItems: `flex-start`,
  },

  loginBox: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    margin: `auto`,
    marginTop: `30px`,
    padding: `2rem`,
    maxWidth: `400px`,
    borderRadius: `5px`,
    boxShadow: `5px 5px 10px #ccc`,
    ":hover": {
      boxShadow: `10px 10px 20px #ccc`
    }
  },

  loginTitle: {
    padding: `5px`,
    textAlign: `center`
  },

  loginButton: {
    borderRadius: `3px`,
    marginTop: `5px`,
    backgroundColor: buttonBlue,
  },

  drawer: {

    width: drawerWidth,

    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: `border-box`,
    }

  },

};

export { styles, drawerWidth };