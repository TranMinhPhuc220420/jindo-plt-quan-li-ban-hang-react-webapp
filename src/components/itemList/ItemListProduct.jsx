// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {setAppOpenDialogDetail, setAppOpenDialogEdit, setAppSnackBar, setDataProducts} from "../../store/action";

// Component Material UI
import {
  ListItem, ListItemText, Typography, ListItemSecondaryAction,
  Divider, Button,
  Menu, MenuItem
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
const ItemListProduct = (props) => {
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlerClickEdit = (dataEdit) => {
    dispatch(setAppOpenDialogEdit({
      is_show: true,
      dataEdit: props.dataProduct
    }));

    handleClose();
  };

  const handlerClickDelete = () => {
    MyUtils.Alter.showAsk(
      PltLang.getMsg('TITLE_ASK_CONFIRM_DELETE_FATHER'),
      PltLang.getMsg('TXT_DESCRIPTION_ASK_CONFIRM_DELETE_FATHER'),
      PltLang.getMsg('TXT_BTN_CONFIRM_DELETE'),
      async (isConfirm) => {
        if (isConfirm === true) {
          const formData = new FormData();
          formData.append('id', props.dataProduct.id);
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
    );

    handleClose();
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

  const handlerListItemClick = () => {
    dispatch(setAppOpenDialogDetail({
      is_show: true,
      dataDetail: props.dataProduct
    }));
  };
  // End methods *******************

  // Return content this component
  return (
    <ListItem className="item-list-product" button onClick={handlerListItemClick}>
      <ListItemText>
        <Typography className="product-name product-name-vertical-2">
          {props.dataProduct.name}
        </Typography>

        <img style={{width: 50, height: 50}} src={DOMAIN_APP + props.dataProduct.image_url} alt=""/>
      </ListItemText>

      {/*<div style={{width: '80%'} }>*/}
      {/*  <ListItemText>*/}
      {/*    <Typography>*/}
      {/*      Loại: {dataItem.category.name}*/}
      {/*    </Typography>*/}
      {/*    <Typography>*/}
      {/*      Còn trong kho: {dataItem.rest}*/}
      {/*    </Typography>*/}
      {/*    <Typography>*/}
      {/*      Giá bán: {currencyFormatter.format(dataItem.price, { code: 'VND' })}*/}
      {/*    </Typography>*/}
      {/*    <Typography>*/}
      {/*      Ngày cập nhật: {Moment(dataItem.updated_at).format('DD-MM-yyyy')}*/}
      {/*    </Typography>*/}
      {/*  </ListItemText>*/}
      {/*</div>*/}

      <ListItemSecondaryAction>
        <Button aria-haspopup="true" onClick={handleClick}>
          <MoreVertIcon/>
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}
          keepMounted onClose={handleClose}
        >
          <MenuItem onClick={handlerClickEdit}>
            <EditIcon className="text-success mr-1"/>
            {PltLang.getMsg('TXT_BTN_UPDATE')}
          </MenuItem>
          <Divider/>
          <MenuItem onClick={handlerClickDelete}>
            <DeleteIcon className="text-danger mr-1"/>
            {PltLang.getMsg('TXT_BTN_DELETE')}
          </MenuItem>
        </Menu>
      </ListItemSecondaryAction>

    </ListItem>
  )
};

export default ItemListProduct;
