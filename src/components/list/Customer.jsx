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

// PLT Solution
import PltCommon from "../../plt_common";
import {setAppOpenDialogEdit, setAppSnackBar, setDataCategorys, setDataCustomers} from "../../store/action";
import {MyUtils} from "../../utils";
import PltLang from "../../plt_lang";
import CategoryRequest from "../../requests/Category";
import CustomerRequest from "../../requests/Customer";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ItemListCustomer from "../itemList/ItemListCustomer";

// Utils mores

// Main this component
const ListCustomer = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store
  const dataCustomers = useSelector(state => {
    const data = state.data.customers;
    const keySearch = state.app.key_search;

    if (!keySearch || keySearch === '') {
      return data;
    }

    const dataFind = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      let likeCustmerName = PltCommon.subStrToLowWidthSpace(item.name).indexOf(keySearch) !== -1;

      if (likeCustmerName) {
        dataFind.push(item);
      }
    }

    return dataFind;
  });
  const isLoadingCustomers = useSelector(state => state.app.is_loading_customers);

  // Methods
  const showSnack = (text, color, isShow, time) => {
    if (!time) time = 3000;
    dispatch(setAppSnackBar({open: isShow, text: text, color: color}));

    setTimeout(() => {
      dispatch(setAppSnackBar({open: false, text: '', color: ''}));
    }, time);
  };
  // End methods *******************

  // Return content this component
  return (
    <List className="my-list-item-action">
      { isLoadingCustomers ?
        (
          <LinearProgress/>
        )
        :
        (
          <>
            {dataCustomers.length == 0 ?
              <span>
                {PltLang.getMsg('TXT_DATA_EMPTY')}
              </span>
              :
              <>
                {dataCustomers.map((dataItem, index) => (
                  <div key={index}>
                    <ItemListCustomer dataCustomer={dataItem}/>
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

export default ListCustomer;
