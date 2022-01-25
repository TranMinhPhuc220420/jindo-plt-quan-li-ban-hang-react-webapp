// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
  Button,
  CardContent, CardActions, ListItemText, Typography, ListItem,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

// PLT Solution

// Utils mores
import Moment from 'moment';
import jQuery from "jquery";
import PltCommon from "../../plt_common";
import {MyUtils} from "../../utils";
import {
  setAppOpenDialogEdit,
  setAppSnackBar,
  setDataBills,
  setDataCategorys,
  setDataInsurancess
} from "../../store/action";
import CategoryRequest from "../../requests/Category";
import PltLang from "../../plt_lang";
import {DOMAIN_APP} from "../../constant";
import currencyFormatter from "currency-formatter";
import BillRequest from "../../requests/Bill";
import InsurancesRequest from "../../requests/Insurances";

// Main this component
const PanelDetailProduct = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store

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
    <div className="panel-detail-product">
      <CardContent>
        <ListItemText>
          <Typography className="product-name">
            {props.dataProduct.name}
          </Typography>

          <img style={{width: 100, height: 100}} src={DOMAIN_APP + props.dataProduct.image_url} alt=""/>
        </ListItemText>

        <Typography>
          Loại: {props.dataProduct.category.name}
        </Typography>
        <Typography>
          Còn trong kho: {props.dataProduct.rest}
        </Typography>
        <Typography>
          Giá bán: {PltCommon.formatVietnamMoney(props.dataProduct.price)}
        </Typography>
        <Typography>
          Ngày cập nhật: {Moment(props.dataProduct.updated_at).format('DD-MM-yyyy')}
        </Typography>

      </CardContent>

      <CardActions>
        <Button variant="contained" color="secondary" className="w-100"
        >
          <DeleteIcon/>
          {PltLang.getMsg('TXT_BTN_DELETE')}
        </Button>
      </CardActions>
    </div>
  )
};

export default PanelDetailProduct;
