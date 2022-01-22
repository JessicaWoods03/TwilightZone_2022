
import './App.css';
import LoginPage from './components/Login_Welcome_Jessi/LoginPage'
import EditSightings from './components/Edit_Delete_ghostReport_Drew/EditSightings';
import Button from '@material-ui/core/Button';
import OptionPage from './components/Login_Welcome_Jessi/SecondPage';
import NewUser from './components/Extra/NewUserAccountForm';
import HomePage from './components/Login_Welcome_Jessi/HomePage';
import {Route, Link, Router, BrowserRouter} from 'react-router-dom';
import React from 'react';
import Navbar from './components/NavBar/NavBar';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

//Update App from Evans_branch Nov. 15th 2021
const theme = createTheme({
  typography: {
    h1: {
      fontSize: "3rem"
    }
  },
  palette: {
    type: "dark",
    primary: {
      main: '#FFFFFF',
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: '#EE5622'
    }
  },
});
function App() {

  return (
    <ThemeProvider theme={theme} >
    <div className="App" width="100%">
     <Navbar />
     <Route exact path="/newUser" component= {NewUser}/> 
     <Route exact path="/EditSighting" component = {EditSightings}/>
    </div>
    </ThemeProvider>
  )
}
   

export default App;
