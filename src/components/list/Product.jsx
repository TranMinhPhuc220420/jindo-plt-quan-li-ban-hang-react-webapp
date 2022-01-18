// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Divider, Typography, IconButton, ListItemAvatar, Avatar
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// PLT Solution
import PltCommon from "../../plt_common";
import {setAppOpenDialogEdit, setAppSnackBar, setDataCategorys, setDataProducts} from "../../store/action";
import {MyUtils} from "../../utils";
import PltLang from "../../plt_lang";
import ProductRequest from '../../requests/Product';

// Utils mores
import Moment from 'moment';
import {DOMAIN_APP} from "../../constant";
import currencyFormatter from 'currency-formatter';

// Main this component
const ListProduct = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store
  const dataProducts = useSelector(state => {
    const data = state.data.products;
    const keySearch = state.app.key_search;

    if (!keySearch || keySearch === '') {
      return data;
    }

    const dataFind = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const likeName = PltCommon.subStrToLowWidthSpace(item.name).indexOf(keySearch) !== -1;
      const likeCateogryName = PltCommon.subStrToLowWidthSpace(item.category.name).indexOf(keySearch) !== -1;
      if (likeName || likeCateogryName) {
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
          const result = await ProductRequest.delete(formData);
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

    ProductRequest.getAll().then(data => {
      dispatch(setDataProducts(data));
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
      {dataProducts.length === 0 && (
        PltLang.getMsg('TXT_DATA_EMPTY')
      )}
      {dataProducts.map((dataItem, index) => (
        <div key={index}>
          {/*<img className="w-25" alt={dataItem.name} src={`${DOMAIN_APP}${dataItem.image_url}`}/>*/}
          <ListItem>
            <div style={{width: '80%'} }>
              <ListItemText>
                <Typography variant="h6">
                  {dataItem.name}
                </Typography>
                <Typography>
                  Loại: {dataItem.category.name}
                </Typography>
                <Typography>
                  Còn trong kho: {dataItem.rest}
                </Typography>
                <Typography>
                  Giá bán: {currencyFormatter.format(dataItem.price, { code: 'VND' })}
                </Typography>
                <Typography>
                  Ngày cập nhật: {Moment(dataItem.updated_at).format('DD-MM-yyyy')}
                </Typography>
              </ListItemText>
            </div>

            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" className={'mr-1'}
                          onClick={() => {
                            handlerClickEdit(dataItem)
                          }}
              >
                <EditIcon/>
              </IconButton>
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

export default ListProduct;
