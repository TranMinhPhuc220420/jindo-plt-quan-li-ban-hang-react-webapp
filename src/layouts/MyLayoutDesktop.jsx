import React from 'react';
import { useHistory, NavLink } from "react-router-dom";
import clsx from 'clsx';

// Store redux
import { useSelector, useDispatch } from 'react-redux';
import { setAppViewActive, setUiLoadMark, setUiOpenNavLeft } from "../store/action";

// Component Material UI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, Icon,
  ListItem, ListItemIcon, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// PLT Solution
import { DOMAIN_APP } from "../constant";
import PltMenu from "../plt_menu";
import AdminRequest from "../requests/admin";
import PltCommon from "../plt_common";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MyLayoutDesktop = (props) => {
  //Variable
  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();
  const theme = useTheme();
  const overNavLeft = useSelector(((state) => state.ui.open_nav_left));
  const user = useSelector(((state) => state.user));

  const handleDrawerOpen = () => {
    dispatch(setUiOpenNavLeft(true));
  };

  const handleDrawerClose = () => {
    dispatch(setUiOpenNavLeft(false));
  };

  const handlerClickItemMenu = (dataView) => {
    history.push(dataView.pathname);
    dispatch(setAppViewActive(dataView));
    dispatch(setUiOpenNavLeft(false));
  };

  const handlerClickLogout = async () => {
    dispatch(setUiOpenNavLeft(false));
    dispatch(setUiLoadMark(true));
    const accessToken = await PltCommon.getAccessTokenUserCooke();

    await AdminRequest.logout(accessToken);

    window.location.reload();
  };

  return (
    <div className={classes.root}>
      {user && (
        <>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: overNavLeft,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: overNavLeft,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Admin PLT
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: overNavLeft,
              [classes.drawerClose]: !overNavLeft,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: overNavLeft,
                [classes.drawerClose]: !overNavLeft,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />

            {/* Menu */}
            <List>
              <ListItem button onClick={handlerClickItemMenu}>
                <ListItemAvatar>
                  <Avatar src={`${DOMAIN_APP}/images/avatar/default.png`} />
                </ListItemAvatar>

                <ListItemText primary={`Admin PLT`} />

                {/* <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="logout" onClick={handlerClickLogout}>
                <ExitToAppIcon />
              </IconButton>
            </ListItemSecondaryAction> */}

              </ListItem>

              <Divider />
              {PltMenu.getMenu().map((menuItem, index) => (
                <ListItem button onClick={() => handlerClickItemMenu(menuItem)} key={index}>
                  <ListItemIcon>
                    <Icon>{menuItem.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText>
                    {menuItem.name}
                  </ListItemText>
                </ListItem>
              ))}
              <ListItem button onClick={handlerClickLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>
                  Đăng xuất
                </ListItemText>
              </ListItem>
            </List>
            {/* End Menu */}

          </Drawer>
        </>
      )}

      <main className={classes.content}>
        {user && (
          <div className={classes.toolbar} />
        )}

        {props.children}

      </main>
    </div>
  );
};

export default MyLayoutDesktop;
