// Main import need
import React, {useState, useEffect} from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
  Button, Avatar,
  FormControl, TextField,
  Card, CardContent, CardActions, Typography,
  Accordion, AccordionSummary, AccordionDetails, AccordionActions, ListItemAvatar,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// PLT Solution

// Utils mores
import Moment from 'moment';
import jQuery from "jquery";
import PltCommon from "../../plt_common";
import {MyUtils} from "../../utils";
import {setAppOpenDialogEdit, setAppSnackBar, setDataCategorys} from "../../store/action";
import CategoryRequest from "../../requests/Category";
import PltLang from "../../plt_lang";
import {DOMAIN_APP} from "../../constant";
import currencyFormatter from "currency-formatter";

// Main this component
const PanelDetailInsurances = (props) => {
  const dispatch = useDispatch();
  // Variable component
  const [isShowProductPanel, setIsShowProductPanel] = useState(true);
  const [isShowCustomerPanel, setIsShowCustomerPanel] = useState(true);

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

  /**
   * handlerSubmitEdit
   * @param event
   */
  const handlerSubmitEdit = async (event) => {
    event.preventDefault();
  };

  // Return content this component
  return (
    <Card className="h-100 panel-detail-insurance">
      <CardContent>
        <table>
          <tbody>
            <tr>
              <td>Mã bảo hành:</td>
              <td>
                <span>#{props.dataDetail.id}</span>
              </td>
            </tr>
            <tr>
              <td>Thời hạn:</td>
              <td>
                <strong>{props.dataDetail.to_date} tháng</strong>
              </td>
            </tr>
            <tr>
              <td>Ngày tạo:</td>
              <td>
                {Moment(props.dataDetail.created_at).format('DD/MM/YYYY')}
              </td>
            </tr>
            <tr>
              <td>Ghi chú:</td>
              <td>
                {props.dataDetail.note}
              </td>
            </tr>
          </tbody>
        </table>

        <Accordion className="w-100 mt-2" expanded={isShowProductPanel}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>} onClick={() => {
            const tempBool = !isShowProductPanel;
            setIsShowProductPanel(tempBool);
          }}>
            <div className="d-flex w-100 h-100 justify-content-start align-items-center">
              <Typography className={'ml-2'}>Sản phẩm</Typography>
            </div>
          </AccordionSummary>

          <AccordionDetails className={'flex-column'}>
            <div className="d-flex border-bottom mb-1">
              <Avatar alt={props.dataDetail.production.name}
                      src={`${DOMAIN_APP}${props.dataDetail.production.image_url}`}/>
              <Typography className="ml-2">
                {props.dataDetail.production.name}
              </Typography>
            </div>
            <Typography className="font-weight-bold text-right">
              Giá bán:
              <span className="product-price"> {PltCommon.formatVietnamMoney(props.dataDetail.production.price)} </span>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="w-100 mt-2" expanded={isShowCustomerPanel}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>} onClick={() => {
            const tempBool = !isShowCustomerPanel;
            setIsShowCustomerPanel(tempBool);
          }}>
            <div className="d-flex w-100 h-100 justify-content-start align-items-center">
              <Typography className={'ml-2'}>Khách hàng</Typography>
            </div>
          </AccordionSummary>

          <AccordionDetails className="align-items-center">
            <ListItemAvatar>
              <div className="avatar-customer" dangerouslySetInnerHTML={
                {__html: PltCommon.getAvatarCustomer(props.dataDetail.bill.customer.name)}
              }></div>
            </ListItemAvatar>

            <div className="ml-2">
              <Typography>
                Tên: {props.dataDetail.bill.customer.name}
              </Typography>
              <Typography>
                Sđt: <a href={`tel:${props.dataDetail.bill.customer.phone}`}>{props.dataDetail.bill.customer.phone}</a>
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>

      </CardContent>
    </Card>
  )
};

export default PanelDetailInsurances;
