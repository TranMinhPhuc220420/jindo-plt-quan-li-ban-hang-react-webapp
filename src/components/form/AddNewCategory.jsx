// Main import need
import React, { useState, useEffect } from "react";

// Store redux
import { useSelector, useDispatch } from 'react-redux';

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
import { MyUtils } from "../../utils";
import {
  setAppOpenDialogAddNew,
  setAppSnackBar,
  setDataCategorys,
  setAppGridIsLoading
} from "../../store/action";
import CategoryRequest from "../../requests/Category";

// Main this component
const FormAddNewCategory = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store

  // Methods

  // End methods *******************
  /**
   * validateAndGetFormData
   * @param event
   */
  const validateAndGetFormData = (event) => {
    const form = jQuery(event.target);
    const nameCategory = form.find(':input[name=\'name_category\']').val().trim();

    if (PltCommon.isStrEmpty(nameCategory)) {
      return false;
    }

    const formData = new FormData();
    formData.append('name', nameCategory);

    return formData;
  };

  const showSnack = (text, color, isShow, time) => {
    if (!time) time = 3000;
    dispatch(setAppSnackBar({ open: isShow, text: text, color: color }));

    setTimeout(() => {
      dispatch(setAppSnackBar({ open: false, text: '', color: '' }));
    }, time);
  };

  /**
   * handlerSubmitAddNew
   * @param event
   */
  const handlerSubmitAddNew = async (event) => {
    event.preventDefault();
    dispatch(setAppGridIsLoading(true));

    const formData = validateAndGetFormData(event);

    if (formData === false) {
      MyUtils.Alter.showError(
        PltLang.getMsg('TITLE_VALIDATE_FORM_FAIL'),
        PltLang.getMsg('TXT_DESCRIPTION_VALIDATE_FORM_FAIL')
      );
      dispatch(setAppOpenDialogAddNew(false));
    } else {
      showSnack(PltLang.getMsg('TXT_UPLOADING_DATA'), 'text-primary', true);
      // Call request add new category
      const result = await CategoryRequest.create(formData);
      showSnack('', '', false);

      if (result != null) {
        handlerAddNewSuccess();
      } else {
        handlerAddNewFail();
      }
    }

    dispatch(setAppGridIsLoading(false));
  };

  const handlerAddNewSuccess = () => {
    showSnack(PltLang.getMsg('TXT_CREATE_NEW_SUCCESS'), 'text-success', true);
    dispatch(setAppOpenDialogAddNew(false));

    CategoryRequest.getAll().then(data => {
      dispatch(setDataCategorys(data));
    });
  };
  const handlerAddNewFail = () => {
    showSnack(PltLang.getMsg('TXT_CREATE_NEW_FAILD'), 'text-error', true);
    dispatch(setAppOpenDialogAddNew(false));
  };

  // Return content this component
  return (
    <form onSubmit={handlerSubmitAddNew}>
      <Card style={{ width: 345 }}>
        <CardContent>
          <FormControl className={'w-100'}>
            <TextField id="name_category" name="name_category" label={PltLang.getMsg('LABEL_INPUT_NAME_CATEGORY')} />
          </FormControl>
        </CardContent>
        <CardActions className="justify-content-end">
          <Button type="submit" variant="contained" color="primary">
            {PltLang.getMsg('TXT_BTN_ADD_NEW')}
          </Button>
        </CardActions>
      </Card>
    </form>
  )
};

export default FormAddNewCategory;
