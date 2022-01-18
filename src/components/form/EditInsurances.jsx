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
import Moment from 'moment';
import jQuery from "jquery";
import PltCommon from "../../plt_common";
import {MyUtils} from "../../utils";
import {setAppOpenDialogEdit, setAppSnackBar, setDataCategorys} from "../../store/action";
import CategoryRequest from "../../requests/Category";

// Main this component
const FormEditInsurances = (props) => {
  const dispatch = useDispatch();
  // Variable component
  const [id, setId] = useState(props.dataEdit.id);
  const [note, setNote] = useState(props.dataEdit.note);
  const [to_date, setToDate] = useState(Moment(props.dataEdit.to_date).format('yyyy-MM-DD'));

  // Variable store

  // Methods

  // End methods *******************
  /**
   * validateAndGetFormData
   * @param event
   */
  const validateAndGetFormData = (event) => {
    if (PltCommon.isStrEmpty(to_date)) {
      return false;
    }

    const formData = new FormData();
    formData.append('id', id);

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
          <FormControl className={'w-100 mt-4'}>
            <TextField label={PltLang.getMsg('LABEL_INPUT_TO_DATE_INSURANCES')}
                       variant="outlined"
                       type={'date'}
                       value={to_date}
                       onChange={(event) => {
                         // setToDate(event.target.value);
                       }}
            />
          </FormControl>

          <FormControl className={'w-100 mt-4'}>
            <TextField label={PltLang.getMsg('LABEL_INPUT_NOTE')}
                       rows={4}
                       multiline
                       variant="outlined"
                       value={note}
                       onChange={(event) => {
                         // setNote(event.target.value)
                       }}
            />
          </FormControl>

        </CardContent>
        {/*<CardActions className="justify-content-end">*/}
        {/*  <Button type="submit" variant="contained" color="primary">*/}
        {/*    {PltLang.getMsg('TXT_BTN_UPDATE')}*/}
        {/*  </Button>*/}
        {/*</CardActions>*/}
      </Card>
    </form>
  )
};

export default FormEditInsurances;
