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
  const viewActive = useSelector(state => state.app.view_active);
  const viewProfile = {
    name: 'Hồ sơ',
    pathname: '/admin/ho-so',
    icon: 'account_circle',
  };

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

  const isViewActive = (view) => {
    return (viewActive.pathname == view.pathname);
  };

  return (
    <Drawer anchor="right" open={overNavLeft} onClose={handlerCloseNavLeft}>
      <div role="presentation">
        <List>
          <ListItem className={isViewActive(viewProfile) ? 'menu-active' : ''}
                    button
                    onClick={() => {
                      handlerClickItemMenu(viewProfile)
                    }}>
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
            <ListItem
              button
              className={isViewActive(menuItem) ? 'menu-active' : ''}
              onClick={() => handlerClickItemMenu(menuItem)} key={index}
            >
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
