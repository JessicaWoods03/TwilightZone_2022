import React from "react";
//Integrated from Evans_Branch Nov. 15th, 2021...this was pretty genius work from Evan-
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,
  ListItemIcon
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import BuildIcon from '@mui/icons-material/Build';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';

import HomePage from "../Login_Welcome_Jessi/HomePage";
import SightingsPage from "../Save_ghostReport_Andrew_T/SightingsPage";
import SearchPage from "../Search_ghosts_Evan/SearchPage/SearchPage"
import OptionPage from '../Login_Welcome_Jessi/SecondPage';
import MaintPage from '../Edit_Delete_ghostReport_Drew/SightingsMaint';
import EditSightingsPage from '../Edit_Delete_ghostReport_Drew/EditSightings';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = (props) => {
  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <BrowserRouter>
          <AppBar position="sticky" style={{ background: '#14213d' }}>
            <Toolbar>
              <Typography
                variant="h5"
                component="p"
                color="textSecondary"
                className={classes.title}
              >
                Twilight Zone
              </Typography>
              {isMobile ? (
                <>
                  <IconButton
                    color="textPrimary"
                    className={classes.menuButton}
                    edge="start"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchor}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    KeepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                  >
                    <MenuItem
                      onClick={() => setAnchor(null)}
                      component={Link}
                      to="/"
                    >
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Home</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchor(null)}
                      component={Link}
                      to="/SightingsPage"
                    >
                      <ListItemIcon>
                        <VisibilityIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Sightings </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchor(null)}
                      component={Link}
                      to="/search"
                    >
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Sightings Maintenance</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchor(null)}
                      component={Link}
                      to="/SightingMaint"
                    >
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Edit sightings</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchor(null)}
                      component={Link}
                      to="/EditSightings"
                    >
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Search</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchor(null)}
                      component={Link}
                      to="/options"
                    >
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Options </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <div style={{ marginRight: "2rem" }}>
                  <Button
                    variant="text"
                    component={Link}
                    to="/"
                    color="default"
                  >
                    <HomeIcon />
                    Home
                  </Button>
                  <Button
                    variant="text"
                    component={Link}
                    to="/SightingsPage"
                    color="default"
                  >
                    <VisibilityIcon />
                    Sightings
                  </Button>
{/*                   <Button
                    variant="text"
                    component={Link}
                    to="/SightingMaint"
                    color="default"
                  >
                    <BuildIcon />
                    Sighting Maintenance
                  </Button> */}
                  <Button
                    variant="text"
                    component={Link}
                    to="/EditSightings"
                    color="default"
                  >
                    <EditIcon />
                    Edit Sightings
                  </Button>
                  <Button
                    variant="text"
                    component={Link}
                    to="/search"
                    color="default"
                  >
                    <SearchIcon />
                    Search
                  </Button>
                  <Button
                    variant="text"
                    component={Link}
                    to="/options"
                    color="default"
                  >
                    <SettingsIcon />
                    Options
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/SightingsPage" component={SightingsPage} />
            <Route exact path="/SightingsMaint" component={MaintPage} />
            <Route exact path="/EditSightings" component={EditSightingsPage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/options" component={OptionPage} />
          </Switch>
        </BrowserRouter>
      </HideOnScroll>
    </div>
  );
};

export default Navbar;
