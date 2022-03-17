// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
  Button, Avatar,
  FormControl, TextField, Box,
  Card, CardContent, CardActions, Typography,
  Accordion, AccordionSummary, AccordionDetails, AccordionActions, Chip,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';

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
  setDataInsurances
} from "../../store/action";
import CategoryRequest from "../../requests/Category";
import PltLang from "../../plt_lang";
import {DOMAIN_APP} from "../../constant";
import currencyFormatter from "currency-formatter";
import BillRequest from "../../requests/Bill";
import InsurancesRequest from "../../requests/Insurances";

// Main this component
const PanelDetailBill = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store
  // const dataInsurances = useSelector(state => state.data.insurances);
  const [dataInsurances, setDataInsurances] = useState(props.dataBill.insurances);


  // Methods
  const showSnack = (text, color, isShow, time) => {
    if (!time) time = 3000;
    dispatch(setAppSnackBar({open: isShow, text: text, color: color}));

    setTimeout(() => {
      dispatch(setAppSnackBar({open: false, text: '', color: ''}));
    }, time);
  };

  const getCountPrice = (isAboutDiscount) => {
    const data = props.dataBill.productions;
    let price = 0;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      price += Number.parseFloat(item.price * props.dataBill.totals[i].total);
    }

    if (isAboutDiscount) {
      return price - getCountDiscount();
    } else {
      return price;
    }
  };

  const getCountDiscount = () => {
    const data = props.dataBill.discounts;
    let price = 0;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      price += item.discount;
    }

    return price;
  };

  const handlerClickDelete = () => {
    MyUtils.Alter.showAsk(
      PltLang.getMsg('TITLE_ASK_CONFIRM_DELETE_FATHER'),
      PltLang.getMsg('TXT_DESCRIPTION_ASK_CONFIRM_DELETE_BILL'),
      PltLang.getMsg('TXT_BTN_CONFIRM_DELETE'),
      async (isConfirm) => {
        if (isConfirm === true) {
          const formData = new FormData();
          formData.append('id', props.dataBill.id);
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

  const handlerClickPrint = async () => {
    const accessToken = await PltCommon.getAccessTokenUserCooke();
    window.open(`${DOMAIN_APP}/admin/hoa-don/in-hoa-don/${props.dataBill.id}/${accessToken}`);
  };

  const handlerDeleteSuccess = () => {
    showSnack(PltLang.getMsg('TXT_DELETE_SUCCESS'), 'text-success', true);
    dispatch(setAppOpenDialogEdit(false));

    BillRequest.getAll().then(data => {
      dispatch(setDataBills(data));
    });
    InsurancesRequest.getAll().then(data => {
      dispatch(setDataInsurances(data));
    });
  };

  const handlerDeleteFail = () => {
    showSnack(PltLang.getMsg('TXT_DELETE_FAILD'), 'text-error', true);
    dispatch(setAppOpenDialogEdit(false));
  };
  // End methods *******************

  // Return content this component
  return (
    <div className="panel-detail-bill">
      <Box>
        <CardContent>
          <div className="customer mb-3 p-1 my-shadow">
            <table>
              <tbody>
              <tr className="title">
                <td><PersonIcon/></td>
                <td><span>Khách hàng</span></td>
              </tr>
              {/* <tr>
                <td></td>
                <td>Mã ID:</td>
                <td>
                  <Typography className="customer-id">
                    #{props.dataBill.customer.id}
                  </Typography>
                </td>
              </tr> */}
              <tr>
                <td></td>
                <td>Tên:</td>
                <td>
                  <Typography className="customer-name">
                    {props.dataBill.customer.name}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Sđt:</td>
                <td>
                  <Typography className="customer-phone">
                    <a href={`tel:${props.dataBill.customer.phone}`}>
                      {props.dataBill.customer.phone}
                    </a>
                  </Typography>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div className="list-product">
            <div className="title">
              <DashboardIcon/>
              <span> DS sản phẩm </span>
            </div>
            {props.dataBill.productions.map((itemProduct, index) => (
              <div className="product-item my-2 d-flex" key={index}>
                <img className="product-image" src={DOMAIN_APP + itemProduct.image_url} alt=""/>

                <div className="info-product w-100">
                  <div className="product-name">
                    <span>{itemProduct.name}</span>
                  </div>

                  <div className="d-flex justify-content-between">
                    {/*if */}
                    {itemProduct.insurance ? (
                      <Chip
                        label={`Bảo hành ${itemProduct.insurance.to_date} tháng`}
                        variant="outlined" size="small"
                        color="primary"
                      />
                    ) : (
                      <Chip
                        label={`Không bảo hành`}
                        variant="outlined" size="small"
                        color="secondary"
                      />
                    )
                    }

                    <span> x{props.dataBill.totals[index].total} </span>
                  </div>


                  <div className="total-price text-right w-100">
                    {props.dataBill.discounts[index].discount != 0 ?
                      (
                        <>
                        <span className="price-is-discount">
                          {currencyFormatter.format(itemProduct.price, {code: 'VND'})}
                        </span>
                          <span className="price-after-discount">
                          {currencyFormatter.format(
                            (
                              Number.parseFloat(itemProduct.price)
                              -
                              Number.parseFloat(props.dataBill.discounts[index].discount)
                            ),
                            {code: 'VND'})}
                        </span>
                        </>
                      )
                      :
                      (
                        <span className="price">
                          {currencyFormatter.format(itemProduct.price, {code: 'VND'})}
                        </span>
                      )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="result my-3 p-1 my-shadow">
            <table>
              <tbody>
              <tr className="title">
                <td><MonetizationOnIcon/></td>
                <td><span>Tổng hoá đơn</span></td>
              </tr>
              {/* <tr>
                <td></td>
                <td>Mã hoá đơn:</td>
                <td>
                  <Typography className="bill-id">
                    #{props.dataBill.id}
                  </Typography>
                </td>
              </tr> */}
              <tr>
                <td></td>
                <td>Tổng tiền hàng:</td>
                <td>
                  <Typography className="bill-count-price">
                    {PltCommon.formatVietnamMoney(getCountPrice())}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Giảm giá:</td>
                <td>
                  <Typography className="bill-count-discount">
                    {PltCommon.formatVietnamMoney(getCountDiscount())}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>Thành tiền:</td>
                <td>
                  <Typography className="bill-result-price">
                    {PltCommon.formatVietnamMoney(getCountPrice(true))}
                  </Typography>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </CardContent>

        <CardActions className="justify-content-end">
          <Button variant="contained" color="secondary" className="w-20"
                  onClick={handlerClickDelete}
          >
            <DeleteIcon/>
            {PltLang.getMsg('TXT_BTN_DELETE')}
          </Button>
          <Button variant="contained" color="primary" className="w-50"
                  onClick={handlerClickPrint}
          >
            <PrintIcon/>
            <span className="ml-1">
              {PltLang.getMsg('TXT_BTN_PRINT_BILL')}
            </span>
          </Button>
        </CardActions>
      </Box>
    </div>
  )
};

export default PanelDetailBill;
