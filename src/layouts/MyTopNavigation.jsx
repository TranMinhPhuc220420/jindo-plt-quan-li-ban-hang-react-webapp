import React from 'react';
import {useHistory} from "react-router-dom";

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {setAppKeySearchItemList, setUiOpenNavLeft} from "../store/action";

import {alpha, makeStyles} from '@material-ui/core/styles';
import {
  Icon,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton, InputBase
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import PltCommon from "../plt_common";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {},
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const MyTopNavigation = () => {
  //Variable
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const viewActive = useSelector(state => state.app.view_active);

  const handlerOpenNavLeft = () => {
    dispatch(setUiOpenNavLeft(true));
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Icon className="mr-2">{viewActive.icon}</Icon>
          {/*<Typography variant="h6" className={classes.title}>*/}
          {/*  {viewActive.name}*/}
          {/*</Typography>*/}

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={'Tìm kiếm cho ' + viewActive.name.toLowerCase()}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => {
                dispatch(setAppKeySearchItemList(PltCommon.subStrToLowWidthSpace(event.target.value)))
              }}
            />
          </div>

          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                      onClick={handlerOpenNavLeft}
          >
            <MenuIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MyTopNavigation;
