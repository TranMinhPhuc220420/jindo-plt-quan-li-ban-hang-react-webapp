import React from 'react';

// Component Material UI
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, BottomNavigationAction, Toolbar,
  IconButton, Button, Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RestoreIcon from '@material-ui/icons/Restore';
import {useDispatch, useSelector} from "react-redux";
import {setAppOpenDialogAddNew} from "../store/action";

// Make styles
const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

const MyBottomNavigation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const viewActive = useSelector(state => state.app.view_active);

  // Methods
  const handlerShowDialogAddNew = () => {
    dispatch(setAppOpenDialogAddNew(true));
  };

  const isShowBtnAddNew = () => {
    const isViewAdmin = viewActive.pathname !== '/admin/trang-chu';
    const isInsuracen = viewActive.pathname !== '/admin/phieu-bao-hanh';

    return isViewAdmin && isInsuracen;
  };
  // End methods *******************

  // Return content this component
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {/*<BottomNavigationAction label="Recents" color="inherit" icon={<RestoreIcon />} />*/}

        {isShowBtnAddNew() && (
          <>
            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={handlerShowDialogAddNew}>
              <AddIcon />
            </Fab>
            <div className={classes.grow} />
          </>
        )}
        {/*{!isShowBtnAddNew() && (*/}
        {/*  <BottomNavigationAction label="Recents" icon={<RestoreIcon color="inherit" />} />*/}
        {/*)}*/}

        {/*<BottomNavigationAction label="Recents" icon={<RestoreIcon color="inherit" />} />*/}

      </Toolbar>
    </AppBar>
  );
};

export default MyBottomNavigation;