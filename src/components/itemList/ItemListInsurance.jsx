// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {setAppOpenDialogDetail, setAppOpenDialogEdit, setAppSnackBar, setDataProducts} from "../../store/action";

// Component Material UI
import {
  ListItem, ListItemText, Typography, ListItemSecondaryAction,
  Divider, Button,
  Menu, MenuItem, Chip
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// PLT Solution

// Utils mores
import Moment from 'moment';
import {DOMAIN_APP} from "../../constant";
import currencyFormatter from "currency-formatter";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {MyUtils} from "../../utils";
import PltLang from "../../plt_lang";
import ProductRequest from "../../requests/Product";

// Main this component
const ItemListInsurance = (props) => {
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

  const handlerListItemClick = () => {
    dispatch(setAppOpenDialogDetail({
      is_show: true,
      dataDetail: props.dataInsurance
    }));
  };
  // End methods *******************

  // Return content this component
  return (
    <ListItem className="item-list-insurance" button onClick={handlerListItemClick}>
      <ListItemText>
        <div className="d-flex justify-content-between align-items-center">
          <div className="left">
            <Typography className="customer-name" variant="h6">
              {props.dataInsurance.bill.customer.name}
            </Typography>
            <Typography>
              Mã hoá đơn: <span className="bill-id">#{props.dataInsurance.bill.id}</span>
            </Typography>
          </div>

          <div className="right">
            <Chip
              label={`Bảo hành ${props.dataInsurance.to_date} tháng`}
              variant="outlined"
              color="primary"
            />
          </div>
        </div>

        <div className="product-main d-flex justify-content-between align-items-center">
          <img className="product-image" src={DOMAIN_APP + props.dataInsurance.production.image_url} alt=""/>
          <div className="info-product">
            <div className="product-name-vertical-2">
              <span>{props.dataInsurance.production.name}</span>
            </div>
          </div>
        </div>
      </ListItemText>
    </ListItem>
  )
};

export default ItemListInsurance;
