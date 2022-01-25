// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
  List, Divider
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
import ItemListProduct from "../itemList/ItemListProduct";

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

  // End methods *******************

  // Return content this component
  return (
    <List id="list_product_main">
      {dataProducts.length === 0 && (
        PltLang.getMsg('TXT_DATA_EMPTY')
      )}
      {dataProducts.map((dataItem, index) => (
        <div key={index}>
          <ItemListProduct dataProduct={dataItem}/>
          <Divider/>
        </div>
      ))}
    </List>
  )
};

export default ListProduct;
