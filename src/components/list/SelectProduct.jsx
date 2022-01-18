// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
  TextField,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Divider, Typography, IconButton, FormControl, Checkbox,
  ListItemAvatar, Avatar
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// PLT Solution
import PltCommon from "../../plt_common";
import {setAppOpenDialogEdit, setAppSnackBar, setDataCategorys, setDataProducts} from "../../store/action";
import {MyUtils} from "../../utils";
import PltLang from "../../plt_lang";
import ProductRequest from '../../requests/Product';
import {DOMAIN_APP} from "../../constant";

// Utils mores

// Main this component
const ListSelectProduct = (props) => {
  const dispatch = useDispatch();
  // Variable component
  const [name_product, setNameProduct] = useState('');

  // Variable store
  const dataProducts = useSelector((state) => {
    const products = state.data.products;
    if (name_product === '' || !name_product) {
      return products;
    }

    const productsByIdCatgegory = [];
    for (let i = 0; i < products.length; i++) {
      const low1 = PltCommon.subStrToLowWidthSpace(products[i].name);
      const low2 = PltCommon.subStrToLowWidthSpace(name_product);

      if (low1.indexOf(low2) !== -1) {
        productsByIdCatgegory.push(products[i]);
      }
    }

    return productsByIdCatgegory;
  });

  // Methods
  const showSnack = (text, color, isShow, time) => {
    if (!time) time = 3000;
    dispatch(setAppSnackBar({open: isShow, text: text, color: color}));

    setTimeout(() => {
      dispatch(setAppSnackBar({open: false, text: '', color: ''}));
    }, time);
  };

  const handlerClickClickItemList = (dataItem) => {
    props.onSelect(dataItem);
  };
  // End methods *******************

  // Return content this component
  return (
    <div className={'container'}>
      <FormControl className={'w-100 mt-2'}>
        <TextField variant="outlined" label={PltLang.getMsg('LABEL_INPUT_NAME_PRODUCT')}
                   value={name_product}
                   onChange={(event) => {
                     setNameProduct(event.target.value)
                   }}
        />
      </FormControl>

      <h6 className={'mt-3'}>
        <span className="border-bottom">
          {PltLang.getMsg('TXT_RESULT')}
        </span>
      </h6>
      <List>
        {dataProducts.length === 0 && (
          PltLang.getMsg('TXT_DATA_EMPTY')
        )}
        {dataProducts.map((dataItem, index) => (
          <div key={index}>
            <ListItem button onClick={() => {
              handlerClickClickItemList(dataItem)
            }}>
              <ListItemAvatar>
                <Avatar alt={dataItem.name} src={`${DOMAIN_APP}${dataItem.image_url}`}/>
              </ListItemAvatar>
              <ListItemText>
                {dataItem.name}
              </ListItemText>
            </ListItem>
            <Divider/>
          </div>
        ))}
      </List>
    </div>
  )
};

export default ListSelectProduct;
