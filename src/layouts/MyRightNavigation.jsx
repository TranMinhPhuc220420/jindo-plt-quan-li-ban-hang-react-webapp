import React from 'react';
import {useHistory, NavLink} from "react-router-dom";

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {setAppViewActive, setUiLoadMark, setUiOpenNavLeft} from "../store/action";

// Component Material UI
import {
  Drawer, Divider,
  Button, IconButton, Icon,
  ListItemAvatar, Avatar,
  List, ListItemText, ListItemIcon, ListItem, ListItemSecondaryAction
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// PLT Solution
import {DOMAIN_APP} from "../constant";
import PltMenu from "../plt_menu";
import AdminRequest from "../requests/admin";
import PltCommon from "../plt_common";

const MyLeftNavigation = () => {
  //Variable
  const history = useHistory();
  const dispatch = useDispatch();

  const overNavLeft = useSelector(((state) => state.ui.open_nav_left));

  const handlerCloseNavLeft = () => {
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
    <Drawer anchor="right" open={overNavLeft} onClose={handlerCloseNavLeft}>
      <div role="presentation">
        <List>
          <ListItem button onClick={handlerClickItemMenu}>
            <ListItemAvatar>
              <Avatar src={`${DOMAIN_APP}/images/avatar/default.png`}/>
            </ListItemAvatar>

            <ListItemText primary={`Admin PLT`}/>

            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="logout" onClick={handlerClickLogout}>
                <ExitToAppIcon/>
              </IconButton>
            </ListItemSecondaryAction>

          </ListItem>

          <Divider/>
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
        </List>
      </div>
    </Drawer>
  );
};

export default MyLeftNavigation;
