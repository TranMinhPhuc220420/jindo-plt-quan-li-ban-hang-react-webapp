// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

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
import {setAppOpenDialogEdit, setAppSnackBar, setDataCategorys} from "../../store/action";
import CategoryRequest from "../../requests/Category";

// Main this component
const FormEditCategory = (props) => {
  const dispatch = useDispatch();
  // Variable component
  const [id, setId] = useState(props.dataEdit.id);
  const [name, setName] = useState(props.dataEdit.name);

  // Variable store

  // Methods

  // End methods *******************
  /**
   * validateAndGetFormData
   * @param event
   */
  const validateAndGetFormData = (event) => {
    const form = jQuery(event.target);
    const idCategory = form.find(':input[name=\'id_category\']').val().trim();
    const nameCategory = form.find(':input[name=\'name_category\']').val().trim();

    if (PltCommon.isStrEmpty(nameCategory)) {
      return false;
    }

    const formData = new FormData();
    formData.append('id', idCategory);
    formData.append('name', nameCategory);

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
      const result = await CategoryRequest.update(formData);
      showSnack('', '', false);

      if (result != null) {
        handlerEditSuccess();
      } else {
        handlerEditFail();
      }
    }
  };

  const handlerEditSuccess = () => {
    showSnack(PltLang.getMsg('TXT_UPDATE_SUCCESS'), 'text-success', true);
    dispatch(setAppOpenDialogEdit(false));

    CategoryRequest.getAll().then(data => {
      dispatch(setDataCategorys(data));
    });
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
            <TextField id="id_category" name="id_category"
                       label={PltLang.getMsg('LABEL_INPUT_ID')}
                       value={id}
                       disabled={true}
            />
          </FormControl>
          <FormControl className={'w-100'}>
            <TextField id="name_category" name="name_category"
                       value={name}
                       onChange={(event) => { setName(event.target.value) }}
                       label={PltLang.getMsg('LABEL_INPUT_NAME_CATEGORY')}
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

export default FormEditCategory;
