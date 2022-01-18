// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {setAppOpenDialogEdit, setAppSnackBar, setDataCustomers} from "../../store/action";

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
import CustomerRequest from "../../requests/Customer";

// Main this component
const FormEditCustomer = (props) => {
  const dispatch = useDispatch();
  // Variable component
  const [id, setId] = useState(props.dataEdit.id);
  const [name, setName] = useState(props.dataEdit.name);
  const [phone, setPhone] = useState(props.dataEdit.phone);

  // Variable store

  // Methods

  // End methods *******************
  /**
   * validateAndGetFormData
   * @param event
   */
  const validateAndGetFormData = (event) => {
    const form = jQuery(event.target);
    const idCustomer = form.find(':input[name=\'id_customer\']').val().trim();
    const nameCustomer = form.find(':input[name=\'name_customer\']').val().trim();
    const phoneCustomer = form.find(':input[name=\'phone_customer\']').val().trim();

    if (PltCommon.isStrEmpty(idCustomer)) {
      return false;
    }
    if (PltCommon.isStrEmpty(nameCustomer)) {
      return false;
    }
    if (PltCommon.isStrEmpty(phoneCustomer)) {
      return false;
    }

    const formData = new FormData();
    formData.append('id', idCustomer);
    formData.append('name', nameCustomer);
    formData.append('phone', phoneCustomer);

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
      const result = await CustomerRequest.update(formData);
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

    CustomerRequest.getAll().then(data => {
      dispatch(setDataCustomers(data));
    });
  };
  const handlerEditFail = () => {
    showSnack(PltLang.getMsg('TXT_UPDATE_FAILD'), 'text-error', true);
    dispatch(setAppOpenDialogEdit(false));
  };

  // Return content this component
  return (
    <form onSubmit={handlerSubmitEdit}>
      <Card style={{width: 345}}>
        <CardContent>
          <FormControl className={'w-100'}>
            <TextField id="id_customer" name="id_customer"
                       label={PltLang.getMsg('LABEL_INPUT_ID')}
                       disabled={true}
                       value={id}
                       onChange={(event) => {setId(event.target.value)}}
            />
          </FormControl>

          <FormControl className={'w-100 mt-4'}>
            <TextField id="name_customer" name="name_customer"
                       label={PltLang.getMsg('LABEL_INPUT_NAME_CUSTOMER')}
                       value={name}
                       onChange={(event) => {setName(event.target.value)}}
            />
          </FormControl>

          <FormControl className={'w-100 mt-4'}>
            <TextField id="phone_customer" name="phone_customer"
                       label={PltLang.getMsg('LABEL_INPUT_PHONE_CUSTOMER')}
                       value={phone}
                       onChange={(event) => {setPhone(event.target.value)}}
            />
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

export default FormEditCustomer;
