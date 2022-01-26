// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Divider, Typography, IconButton, LinearProgress
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentIcon from '@material-ui/icons/Assignment';

// PLT Solution
import PltCommon from "../../plt_common";
import {setAppOpenDialogEdit, setAppSnackBar, setDataCategorys} from "../../store/action";
import {MyUtils} from "../../utils";
import PltLang from "../../plt_lang";
import CategoryRequest from "../../requests/Category";
import Moment from "moment";
import ItemListProduct from "../itemList/ItemListProduct";
import ItemListInsurance from "../itemList/ItemListInsurance";

// Utils mores

// Main this component
const ListInsurances = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store
  const dataInsurances = useSelector(state => {
    const data = state.data.insurances;
    const keySearch = state.app.key_search;

    if (!keySearch || keySearch === '') {
      return data;
    }

    const dataFind = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      let likeCustmerName = PltCommon.subStrToLowWidthSpace(item.bill.customer.name).indexOf(keySearch) !== -1;
      let likeProductName = PltCommon.subStrToLowWidthSpace(item.production.name).indexOf(keySearch) !== -1;

      if (likeCustmerName || likeProductName) {
        dataFind.push(item);
      }
    }

    return dataFind;
  });
  const isLoadingInsurances = useSelector(state => state.app.is_loading_insurances);

  // Methods
  const showSnack = (text, color, isShow, time) => {
    if (!time) time = 3000;
    dispatch(setAppSnackBar({open: isShow, text: text, color: color}));

    setTimeout(() => {
      dispatch(setAppSnackBar({open: false, text: '', color: ''}));
    }, time);
  };

  const handlerClickEdit = (dataEdit) => {
    dispatch(setAppOpenDialogEdit({
      is_show: true,
      dataEdit: dataEdit
    }))
  };

  const handlerClickDelete = (dataEdit) => {
    MyUtils.Alter.showAsk(
      PltLang.getMsg('TITLE_ASK_CONFIRM_DELETE_FATHER'),
      PltLang.getMsg('TXT_DESCRIPTION_ASK_CONFIRM_DELETE_FATHER'),
      PltLang.getMsg('TXT_BTN_CONFIRM_DELETE'),
      async (isConfirm) => {
        if (isConfirm === true) {
          const formData = new FormData();
          formData.append('id', dataEdit.id);
          showSnack(PltLang.getMsg('TXT_UPLOADING_DATA'), 'text-primary', true);
          const result = await CategoryRequest.delete(formData);
          showSnack('', '', false);

          if (result) {
            handlerDeleteSuccess();
          } else {
            handlerDeleteFail();
          }
        }
      }
    )
  };

  const handlerDeleteSuccess = () => {
    showSnack(PltLang.getMsg('TXT_DELETE_SUCCESS'), 'text-success', true);
    dispatch(setAppOpenDialogEdit(false));

    CategoryRequest.getAll().then(data => {
      dispatch(setDataCategorys(data));
    });
  };
  const handlerDeleteFail = () => {
    showSnack(PltLang.getMsg('TXT_DELETE_FAILD'), 'text-error', true);
    dispatch(setAppOpenDialogEdit(false));
  };
  // End methods *******************

  // Return content this component
  return (
    <List>
      { isLoadingInsurances ?
        (
          <LinearProgress/>
        )
        :
        (
          <>
            {dataInsurances.length == 0 ?
              <span>
                {PltLang.getMsg('TXT_DATA_EMPTY')}
              </span>
              :
              <>
                {dataInsurances.map((dataItem, index) => (
                  <div key={index}>
                    <ItemListInsurance dataInsurance={dataItem}/>
                    <Divider/>
                  </div>
                ))}
              </>
            }
          </>
        )
      }
    </List>
  )
};

export default ListInsurances;
