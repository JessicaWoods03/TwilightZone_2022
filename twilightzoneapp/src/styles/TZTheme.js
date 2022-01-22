

import { makeStyles, createTheme } from '@material-ui/core/styles/';

export const TZTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ee5622',
    },
    secondary: {
      main: '#fb823e',
    },
    background: {
      paper: '#31263e',
      default: '#221e22',
    },
    text: {
      primary: '#eca72c',
    },
    info: {
      main: '#e64a19',
    },
  },
});

export const useStyles = makeStyles(({theme}) => ({
  page: {
    backgroundColor: TZTheme.palette.background.default,
    minHeight: "100vh",
    minWidth: "100vw",
    padding: 20,
    margin:0,
  },

  navbarbutton: {
    minWidth:"25vw",
    color:TZTheme.palette.primary.contrastText,
    textAlign:"center",
    fontSize:"11pt",
    //border-color: rgb(65, 105, 225),
    backgroundColor:TZTheme.palette.background.default,
    borderStyle:"solid",
    padding:".5em",
    cursor:"pointer",
    "&:hover":{
      backgroundColor:TZTheme.palette.background.paper,
     }
  }, 

  navbar: {
    zIndex: 1000,
    position: "fixed",
    minWidth: "100vw",
    padding: "auto",
    margin: "auto",
}

}));