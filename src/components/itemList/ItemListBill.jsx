// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {setAppOpenDialogDetail, setAppSnackBar} from "../../store/action";

// Component Material UI
import {
  ListItem, ListItemText, Typography, Chip
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// PLT Solution

// Utils mores
import Moment from 'moment';
import {DOMAIN_APP} from "../../constant";
import currencyFormatter from "currency-formatter";
import PltCommon from "../../plt_common";

// Main this component
const ItemListBill = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store

  // Methods

  // End methods *******************
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
      dataDetail: props.dataItem
    }));
  };

  // Return content this component
  return (
    <ListItem button className="item-list-bill"
              onClick={handlerListItemClick}
    >
      <ListItemText>
        <div className="d-flex align-items-center justify-content-between">
          <Typography className="customer-name">
            {props.dataItem.customer.name}
          </Typography>

          <span className="status">
            Hoàn thành
          </span>
        </div>

        {props.dataItem.productions[0] && (
          <div className="product-main d-flex">
            <img className="product-image" src={DOMAIN_APP + props.dataItem.productions[0].image_url} alt=""/>
            <div className="info-product">
              <div className="product-name">
                <span>{props.dataItem.productions[0].name}</span>
              </div>

              {/*if */}
              {props.dataItem.insurances.length != 0 ? (
                <Chip
                  label={`Có ${props.dataItem.insurances.length} phiếu bảo hành`}
                  variant="outlined" size="small"
                  color="primary"
                />
              ) : (
                <Chip
                  label={`Không có phiếu bảo hành`}
                  variant="outlined" size="small"
                  color="secondary"
                />
              )
              }
            </div>
          </div>
        )}

        <div className="total-bill d-flex justify-content-between align-items-end border-top border-bottom my-1">
          <div>
            <span>
              Ngày bán: {Moment(props.dataItem.date_sell).format('DD-MM-yyyy')}
            </span>
          </div>
          <table>
            <tbody>
              <tr>
                <td>Sản phẩm:</td>
                <td>
                  <div className="total-products">
                    x{props.dataItem.productions.length}
                  </div>
                </td>
                </tr>
              <tr>
                <td>Thành tiền:</td>
                <td>
                  <span className="total-price">
                    {
                      PltCommon.formatVietnamMoney(
                        PltCommon.getCountPriceBill(props.dataItem, true)
                      )
                    }
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {props.dataItem.note !== '' && (
          <Typography>
            Ghi chú: {props.dataItem.note}
          </Typography>
        )}
      </ListItemText>
    </ListItem>
  )
};

export default ItemListBill;
