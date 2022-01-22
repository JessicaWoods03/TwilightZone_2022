import React from 'react';
import { Link } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles';
import {TZTheme, useStyles} from '../../styles/TZTheme';


function Navbar() {
    const classes = useStyles(TZTheme);

    return (
      <ThemeProvider theme={TZTheme}>  
      <div className={classes.navbar}>
         <Link to="/"><input type="button" value="Home" className={classes.navbarbutton}/></Link>
         <Link to="/Sightingspage"><input type="button" value="Sightings Page" className={classes.navbarbutton}/></Link>
         <Link to="/SearchPage"><input type="button" value="Search Page" className={classes.navbarbutton} /></Link>
         <Link to="/AccountSettings"><input type="button" value="Account Settings" className={classes.navbarbutton} /></Link>
         <Link to="/Options"><input type="button" value="Options" className={classes.navbarbutton}/></Link>
      </div>
      </ThemeProvider>
    );
}

export default Navbar; 