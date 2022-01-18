import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import {
  setDataBills,
  setDataCategorys,
  setDataCustomers, setDataInsurancess,
  setDataProducts,
  setUiLoadMark,
  setUiOpenNavLeft
} from "../store/action";
// Style
import '../assets/scss/app.scss';

// Components
import MyTopNavigation from "./MyTopNavigation";
import MyBottomNavigation from "./MyBottomNavigation";
import MyLayoutDesktop from "./MyLayoutDesktop";
import MyRightNavigation from "./MyRightNavigation";

import {
  Backdrop, CircularProgress, Snackbar, Button, IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';

import PltCommon from "../plt_common";
import AdminRequest from "../requests/admin";
import * as constant from "../constant";
import { setDataUserLogin } from "../store/action";
import { setDataAccessToken } from "../store/action";
import { MyUtils } from "../utils";
import PltLang from "../plt_lang";
import CategoryRequest from "../requests/Category";
import ProductRequest from "../requests/Product";
import CustomerRequest from "../requests/Customer";
import BillRequest from "../requests/Bill";
import InsurancesRequest from "../requests/Insurances";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MyLayout = (props) => {
  //Variable
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isCheckedAutoLogin, setIsCheckedAutoLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(PltCommon.isMobile);
  const user = useSelector(((state) => state.user));
  const overNavLeft = useSelector(((state) => state.ui.open_nav_left));
  const loadMark = useSelector(((state) => state.ui.load_mark));
  const snackBar = useSelector(((state) => state.app.snack_bar));

  // Life ci
  useEffect(async () => {
    if (isCheckedAutoLogin === false) {
      dispatch(setUiLoadMark(true));
      // Auto login app
      await handlerAutoLogin();
    }
    setIsCheckedAutoLogin(true);
    dispatch(setUiLoadMark(false));
  }, [isCheckedAutoLogin]);

  // Methods component
  // * * * * * * * * * * * * * * * * * * * * * * * * *
  /**
   * handlerAutoLogin
   * @return {Promise<boolean>}
   */
  const handlerAutoLogin = async () => {
    const accessToken = await PltCommon.getAccessTokenUserCooke();
    const { data, status, statusText } = await AdminRequest.getInfoByToken(accessToken);

    if (status == constant.RESPONSE_STATUS_OK) {
      await handlerLoginSuccess(data, false);
      return true;
    } else {
      handlerLoginFail();
      return false;
    }
  };

  /**
   * handlerLoginSuccess
   * @param {Object} data
   * @param {boolean} showNotification
   */
  const handlerLoginSuccess = async (data, showNotification) => {
    const { user, access_token } = data;

    // Check user login is admin or client
    const userRole = user.role;
    if (userRole == constant.KEY_OF_ROLE_ADMIN) {
      dispatch(setDataUserLogin(data.user));
      dispatch(setDataAccessToken(data.access_token));

      let isNeedReload = (history.location.pathname !== '/admin/trang-chu');
      if (showNotification == true) {
        MyUtils.Alter.showSuccess(
          PltLang.getMsg('TXT_TITLE_LOGIN_SUCCESS'),
          PltLang.getMsg('TXT_DESCRIPTION_LOGIN_SUCCESS')
        );
      }

      if (isNeedReload) {
        history.push('/admin/trang-chu');
        window.location.reload();
      } else {
        // Call init data for Admin
        await initDataForAdmin();
      }
    }
    else if (userRole == constant.KEY_OF_ROLE_CLIENT) {
      // TODO:: Handler when user login has role is client
    } else {
      // When role not define in app
      handlerLoginFail();
    }
  };

  /**
   * handlerLoginFail
   */
  const handlerLoginFail = (showNotification) => {
    if (showNotification) {
      MyUtils.Alter.showError(
        PltLang.getMsg('TXT_TITLE_LOGIN_FAIL'),
        PltLang.getMsg('TXT_DESCRIPTION_LOGIN_FAIL'),
        () => {
          if (history.location.pathname !== '/admin/dang-nhap') {
            history.push('/admin/dang-nhap');
            window.location.reload();
          }
        }
      );
    } else {
      if (history.location.pathname !== '/admin/dang-nhap') {
        history.push('/admin/dang-nhap');
        window.location.reload();
      }
    }
  };

  const initDataForAdmin = async () => {
    CategoryRequest.getAll().then(data => {
      dispatch(setDataCategorys(data));
    });
    ProductRequest.getAll().then(data => {
      dispatch(setDataProducts(data));
    });
    CustomerRequest.getAll().then(data => {
      dispatch(setDataCustomers(data));
    });
    BillRequest.getAll().then(data => {
      dispatch(setDataBills(data));
    });
    InsurancesRequest.getAll().then(data => {
      dispatch(setDataInsurancess(data));
    });
  };
  // * * * * * * * * * * * * * * * * * * * * * * * * *

  return (
    <div>
      {isMobile && (
        <>
          {user != null && (
            <>
              <MyRightNavigation />
              <MyTopNavigation />
            </>
          )}

          <div style={{ paddingTop: 56, overflow: 'scroll' }}>
            {props.children}
          </div>

          {user != null && (
            <>
              <MyBottomNavigation />
            </>
          )}
        </>
      )}

      {/* On app run in desktop */}
      {!isMobile && (
        <MyLayoutDesktop>
          {props.children}
        </MyLayoutDesktop>
      )}

      <Backdrop className={classes.backdrop} open={loadMark}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        autoHideDuration={3000}
        open={snackBar.open}
        message={snackBar.text}
        className={snackBar.color}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          <IconButton color="inherit" size="small">
            <CancelIcon />
          </IconButton>
        }
      />
    </div>
  )
};

export default MyLayout;
