// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {setAppSnackBar, setAppOpenDialogEdit} from "../../store/action";

// Component Material UI
import {
  Button,
  FormControl, TextField,
  Card, CardContent, CardActions,
} from '@material-ui/core';
import PltLang from "../../plt_lang";

// PLT Solution

// Utils mores
import jQuery from "jquery";
import PltCommon from "../../plt_common";
import {MyUtils} from "../../utils";
import AdminRequest from "../../requests/admin";

// Main this component
const FormEditProfile = (props) => {
  const dispatch = useDispatch();
  // Variable component
  const [pw_new, setPWNew] = useState('');
  const [pw_confirm, setPWConfirm] = useState('');

  // Variable store

  // Methods

  // End methods *******************
  /**
   * validateAndGetFormData
   * @param event
   */
  const validateAndGetFormData = (event) => {
    if (PltCommon.isStrEmpty(pw_new)) {
      return false;
    }
    if (PltCommon.isStrEmpty(pw_confirm)) {
      return false;
    }

    const formData = new FormData();
    formData.append('password', pw_new);
    formData.append('password_confirmed', pw_confirm);

    return formData;
  };

  const showSnack = (text, color, isShow, time) => {
    if (!time) time = 3000;
    dispatch(setAppSnackBar({open: isShow, text: text, color: color}));

    setTimeout(() => {
      dispatch(setAppSnackBar({open: false, text: '', color: ''}));
    }, time);
  };

  /**
   * handlerSubmitEdit
   * @param event
   */
  const handlerSubmitEdit = async (event) => {
    event.preventDefault();

    const formData = validateAndGetFormData(event);

    if (formData === false) {
      MyUtils.Alter.showError(
        PltLang.getMsg('TITLE_VALIDATE_FORM_FAIL'),
        PltLang.getMsg('TXT_DESCRIPTION_VALIDATE_FORM_FAIL')
      );
      dispatch(setAppOpenDialogEdit(false));
    } else {
      showSnack(PltLang.getMsg('TXT_UPLOADING_DATA'), 'text-primary', true);
      // Call request add new category
      const result = await AdminRequest.update(formData);
      showSnack('', '', false);

      if (result != null) {
        handlerEditSuccess();
      } else {
        handlerEditFail();
      }
    }
  };

  const handlerEditSuccess = async () => {
    showSnack(PltLang.getMsg('TXT_UPDATE_SUCCESS'), 'text-success', true);
    dispatch(setAppOpenDialogEdit(false));

    await AdminRequest.logout();
    window.location.reload();
  };
  const handlerEditFail = () => {
    showSnack(PltLang.getMsg('TXT_UPDATE_FAILD'), 'text-error', true);
    dispatch(setAppOpenDialogEdit(false));
  };

  // Return content this component
  return (
    <form onSubmit={handlerSubmitEdit}>
      <Card>
        <CardContent>
          <FormControl className={'w-100'}>
            <TextField
              label={PltLang.getMsg('LABEL_INPUT_PASSWORD_NEW')}
              value={pw_new}
              onChange={(event) => {
                setPWNew(event.target.value)
              }}
            />
          </FormControl>

          <FormControl className={'w-100 mt-4'}>
            <TextField
              label={PltLang.getMsg('LABEL_INPUT_PASSWORD_CONFIRM')}
              value={pw_confirm}
              onChange={(event) => {
                setPWConfirm(event.target.value)
              }}
            />
          </FormControl>

        </CardContent>
        <CardActions className="justify-content-end">
          <Button type="submit" variant="contained" color="primary">
            {PltLang.getMsg('TXT_BTN_UPDATE')}
          </Button>
        </CardActions>
      </Card>
    </form>
  )
};

export default FormEditProfile;
