import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import * as actionType from '../../store/actionType'
import { setDataUserLogin, setDataAccessToken } from '../../store/action'
// Components
import {
  FormControl, TextField,
  Button,
  Card, CardMedia, CardActions, CardContent,
  Typography
} from "@material-ui/core";
import $ from "jquery";

import * as constant from '../../constant';
import AdminRequest from "../../requests/admin";
import {MyUtils} from "../../utils";
import PltLang from "../../plt_lang";
import PltCommon from "../../plt_common";

const ViewLogin = () => {
  //Variable
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [isDisableButtonSubmit, setIsDisableButtonSubmit] = useState(false);
  const [isCheckedAutoLogin, setIsCheckedAutoLogin] = useState(false);

  // Life ci
  useEffect(async () => {
    // if (isCheckedAutoLogin == false) {
    //   // Auto login app
    //   await handlerAutoLogin();
    // }

    // setIsCheckedAutoLogin(true);
  }, [isCheckedAutoLogin]);

  // Methods component
  // * * * * * * * * * * * * * * * * * * * * * * * * *
  /**
   * handlerAutoLogin
   * @return {Promise<boolean>}
   */
  const handlerAutoLogin = async () => {
    const accessToken = await PltCommon.getAccessTokenUserCooke();
    const {data, status, statusText} = await AdminRequest.getInfoByToken(accessToken);

    if (status == constant.RESPONSE_STATUS_OK) {
      handlerLoginSuccess(data, false);
      return true;
    } else {
      return false;
    }
  };

  /**
   * validateForm
   * @returns {boolean|FormData}
   */
  const validateForm = (event) => {
    const form = $(event.target);
    const username = form.find(':input[name=\'username\']').val().trim();
    const password = form.find(':input[name=\'password\']').val().trim();

    if (username == '' || password == '') {
      return false;
    }

    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return data;
  };

  /**
   * handlerFormLogin
   * @param event
   * @returns {Promise<void>}
   */
  const handlerFormLogin = async (event) => {
    event.preventDefault();

    setIsDisableButtonSubmit(true);

    //Execute validate form and after that return result validate or form data to send login
    const resultValid = validateForm(event);

    if (resultValid == false) {
      // TODO
    } else {
      const username = resultValid.get('username');
      const password = resultValid.get('password');
      const {data, status, statusText} =  await AdminRequest.loginByEmailPassword(username, password);

      if (status == constant.RESPONSE_STATUS_OK) {
        handlerLoginSuccess(data, false);
      } else {
        handlerLoginFail();
      }
    }

    setIsDisableButtonSubmit(false);
  };

  /**
   * handlerLoginSuccess
   * @param {Object} data
   * @param {boolean} showNotification
   */
  const handlerLoginSuccess = (data, showNotification) => {
    const {user, access_token} = data;

    // Check user login is admin or client
    const userRole = user.role;
    if (userRole === constant.KEY_OF_ROLE_ADMIN) {
      dispatch(setDataUserLogin(data.user));
      dispatch(setDataAccessToken(data.access_token));

      if (showNotification === true) {
        MyUtils.Alter.showSuccess(
          PltLang.getMsg('TXT_TITLE_LOGIN_SUCCESS'),
          PltLang.getMsg('TXT_DESCRIPTION_LOGIN_SUCCESS'),
          () => {
            history.push("/admin/trang-chu");
            window.location.reload();
          }
        );
      } else {
        history.push("/admin/trang-chu");
        window.location.reload();
      }
    }
    else if (userRole === constant.KEY_OF_ROLE_CLIENT) {
      // TODO:: Handler when user login has role is client
    } else {
      // When role not define in app
      handlerLoginFail();
    }
  };

  /**
   * handlerLoginFail
   */
  const handlerLoginFail = () => {
    MyUtils.Alter.showError(
      PltLang.getMsg('TXT_TITLE_LOGIN_FAIL'),
      PltLang.getMsg('TXT_DESCRIPTION_LOGIN_FAIL')
    );
  };
  // * * * * * * * * * * * * * * * * * * * * * * * * *

  //Component return view
  return (
    <div className={'container'}>
      <section id={'views_login'}>
          <Card sx={{maxWidth: 345}}>
            <CardMedia component="img" height="200" image={ `${constant.DOMAIN_APP}/images/banner-login-app.png` }/>

            <form id="formLoginByUsernamePassword" onSubmit={handlerFormLogin}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">

                </Typography>

                <FormControl className="mt-3 w-100" variant="outlined">
                  <TextField id="username" name="username" variant="outlined" required
                             label={PltLang.getMsg('LABEL_INPUT_PASSWORD')}/>
                </FormControl>

                <FormControl className="mt-3 w-100" variant="outlined">
                  <TextField id="password" name="password" type="password" variant="outlined" required
                             label={PltLang.getMsg('LABEL_INPUT_PASSWORD')} />
                </FormControl>

              </CardContent>

              <CardActions className="justify-content-center">
                <Button disabled={isDisableButtonSubmit}
                        type="submit" variant="contained" color="primary"
                >
                  {PltLang.getMsg('TXT_BTN_LOGIN')}
                </Button>
              </CardActions>
            </form>

          </Card>
      </section>
    </div>
  )
};

export default ViewLogin;
