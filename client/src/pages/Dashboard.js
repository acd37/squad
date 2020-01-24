import React from 'react';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  InputBase,
  Typography
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/ListOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import PeopleIcon from '@material-ui/icons/People';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';

import Profile from './Profile';
import Account from './Account';
import Tasks from './Tasks';
import Squad from './Squad';
import Feed from './Feed';
import PrivateRoute from '../utils/PrivateRoute';
import { Route, Link, Switch } from 'react-router-dom';
import NotFound from './NotFound';

import { useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';

const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    backgroundColor: '#fff',
    color: '#000',
    boxShadow: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.dark,
    color: 'rgba(255, 255, 255, 0.60)'
  },
  drawerIcon: {
    color: 'rgba(255, 255, 255, 0.60)'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  normalizeLink: {
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.60)'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.05)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  }
}));

function Dashboard(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div
        style={{
          backgroundColor: theme.palette.primary.darkAccent,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 20,
          color: '#fff'
        }}
        className={classes.toolbar}
      >
        <PeopleIcon style={{ marginRight: 20, color: theme.palette.primary.main }} />
        <Typography variant="h6">Squad</Typography>
      </div>
      <Divider />
      <List>
        <Link to="/dashboard/feed" className={classes.normalizeLink}>
          <ListItem button>
            <ListItemIcon>
              <SmsOutlinedIcon className={classes.drawerIcon} />
            </ListItemIcon>
            <ListItemText primary="Feed" />
          </ListItem>
        </Link>

        <Link to="/dashboard/profile" className={classes.normalizeLink}>
          <ListItem button>
            <ListItemIcon>
              <AccountIcon className={classes.drawerIcon} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>

        <Link to="/dashboard/squad" className={classes.normalizeLink}>
          <ListItem button>
            <ListItemIcon>
              <GroupOutlinedIcon className={classes.drawerIcon} />
            </ListItemIcon>
            <ListItemText primary="Squad" />
          </ListItem>
        </Link>

        <Link to="/dashboard/tasks" className={classes.normalizeLink}>
          <ListItem button>
            <ListItemIcon>
              <ListIcon className={classes.drawerIcon} />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
        </Link>

        <Link to="/dashboard/account" className={classes.normalizeLink}>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon className={classes.drawerIcon} />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </Link>

        <Divider inset style={{ margin: '5%', border: '0.1px solid rgba(255, 255, 255, 0.20)' }} />

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <InboxIcon className={classes.drawerIcon} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div style={{ paddingLeft: 30 }}>
          <Switch>
            <PrivateRoute exact path="/dashboard/profile" component={Profile} />
            <PrivateRoute exact path="/dashboard/account" component={Account} />
            <PrivateRoute exact path="/dashboard/tasks" component={Tasks} />
            <PrivateRoute exact path="/dashboard/squad" component={Squad} />
            <PrivateRoute exact path="/dashboard/feed" component={Feed} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
