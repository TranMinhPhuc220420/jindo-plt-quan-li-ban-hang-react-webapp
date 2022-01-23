// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Divider, Typography, IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// PLT Solution
import PltCommon from "../../plt_common";
import {
  setAppOpenDialogEdit,
  setAppSnackBar,
  setDataBills,
  setDataCategorys,
  setDataInsurancess
} from "../../store/action";
import {MyUtils} from "../../utils";
import PltLang from "../../plt_lang";
import CategoryRequest from "../../requests/Category";
import BillRequest from "../../requests/Bill";
import InsurancesRequest from "../../requests/Insurances";

// Utils mores
import Moment from 'moment';
// var currencyFormatter = require('currency-formatter');
import currencyFormatter from 'currency-formatter';

// Main this component
const ListBill = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store
  const dataBills = useSelector(state => {
    const data = state.data.bills;
    const keySearch = state.app.key_search;

    if (!keySearch || keySearch === '') {
      return data;
    }

    const dataFind = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      let likeCustmerName = PltCommon.subStrToLowWidthSpace(item.customer.name).indexOf(keySearch) !== -1;
      let likeProductName = false;
      for (let j = 0; j < item.productions.length; j++) {
        const itemProduct = item.productions[j];
        if (PltCommon.subStrToLowWidthSpace(itemProduct.name).indexOf(keySearch) !== -1) {
          likeProductName = true;
          break;
        }
      }

      if (likeCustmerName || likeProductName) {
        dataFind.push(item);
      }
    }

    return dataFind;
  });

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
          const result = await BillRequest.delete(formData);
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

    BillRequest.getAll().then(data => {
      dispatch(setDataBills(data));
    });
    InsurancesRequest.getAll().then(data => {
      dispatch(setDataInsurancess(data));
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
      {dataBills.length === 0 && (
        PltLang.getMsg('TXT_DATA_EMPTY')
      )}
      {dataBills.map((dataItem, index) => (
        <div key={index}>
          <ListItem>
            <div style={{width: '80%'} }>
              <ListItemText>
                <Typography variant="h6">
                  {dataItem.customer.name}
                </Typography>
                <Typography>
                  Sản phẩm: {dataItem.productions.length}
                </Typography>
                <Typography>
                  Phiếu bảo hành: {dataItem.insurances.length}
                </Typography>
                <Typography>
                  Giảm: {currencyFormatter.format(dataItem.total_discount, { code: 'VND' })}
                </Typography>
                <Typography>
                  Tổng: {currencyFormatter.format(dataItem.total_price, { code: 'VND' })}
                </Typography>

                <Typography>
                  Ngày bán: {Moment(dataItem.date_sell).format('DD-MM-yyyy')}
                </Typography>
                {dataItem.note !== '' && (
                  <Typography>
                    Ghi chú: {dataItem.note}
                  </Typography>
                )}
              </ListItemText>
            </div>

            <ListItemSecondaryAction>
              {/*<IconButton edge="end" aria-label="edit" className={'mr-1'}*/}
              {/*            onClick={() => {*/}
              {/*              handlerClickEdit(dataItem)*/}
              {/*            }}*/}
              {/*>*/}
              {/*  <EditIcon/>*/}
              {/*</IconButton>*/}
              <IconButton edge="end" aria-label="delete" color={'secondary'}
                          onClick={() => {
                            handlerClickDelete(dataItem)
                          }}
              >
                <DeleteIcon/>
              </IconButton>
            </ListItemSecondaryAction>

          </ListItem>
          <Divider/>
        </div>
      ))}
    </List>
  )
};

export default ListBill;
