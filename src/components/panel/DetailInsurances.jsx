// Main import need
import React, { useState, useEffect } from "react";

// Store redux
import { useSelector, useDispatch } from 'react-redux';

// Component Material UI
import {
  Button, Avatar,
  FormControl, TextField,
  Card, CardContent, CardActions, Typography,
  Accordion, AccordionSummary, AccordionDetails, AccordionActions,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// PLT Solution

// Utils mores
import Moment from 'moment';
import jQuery from "jquery";
import PltCommon from "../../plt_common";
import { MyUtils } from "../../utils";
import { setAppOpenDialogEdit, setAppSnackBar, setDataCategorys } from "../../store/action";
import CategoryRequest from "../../requests/Category";
import PltLang from "../../plt_lang";
import { DOMAIN_APP } from "../../constant";
import currencyFormatter from "currency-formatter";

// Main this component
const PanelDetailInsurances = (props) => {
  const dispatch = useDispatch();
  // Variable component
  const [id, setId] = useState(props.dataEdit.id);
  const [note, setNote] = useState(props.dataEdit.note);
  const [to_date, setToDate] = useState(Moment(props.dataEdit.to_date).format('yyyy-MM-DD'));

  // Variable store

  // Methods

  // End methods *******************
  const showSnack = (text, color, isShow, time) => {
    if (!time) time = 3000;
    dispatch(setAppSnackBar({ open: isShow, text: text, color: color }));

    setTimeout(() => {
      dispatch(setAppSnackBar({ open: false, text: '', color: '' }));
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
    <div>
      <Card>
        <CardContent>
          <Typography>
            Mã bảo hành: {props.dataEdit.id}
          </Typography>
          <Typography>
            Thời hạn: <strong>{props.dataEdit.to_date} tháng</strong>
          </Typography>
          <Typography>
            Ngày tạo: {Moment(props.dataEdit.created_at).format('DD/MM/YYYY')}
          </Typography>

          <Accordion className="w-100 mt-3">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="d-flex w-100 h-100 justify-content-start align-items-center">
                <Typography className={'ml-2'}>Sản phẩm</Typography>
              </div>
            </AccordionSummary>

            <AccordionDetails className={'flex-column'}>
              <div className="d-flex">
                <Avatar alt={props.dataEdit.production.name} src={`${DOMAIN_APP}${props.dataEdit.production.image_url}`} />
                <Typography className="ml-2">
                  {props.dataEdit.production.name}
                </Typography>
              </div>
              <Typography>
                Giá bán:
                <span> {currencyFormatter.format(props.dataEdit.production.price, { code: 'VND' })} </span>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion className="w-100 mt-3">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="d-flex w-100 h-100 justify-content-start align-items-center">
                <Typography className={'ml-2'}>Khách hàng</Typography>
              </div>
            </AccordionSummary>

            <AccordionDetails className={'flex-column'}>
              <Typography>
                Tên: {props.dataEdit.bill.customer.name}
              </Typography>
              <Typography>
                Sđt: <a href={`tel:${props.dataEdit.bill.customer.phone}`}>{props.dataEdit.bill.customer.phone}</a>
              </Typography>
            </AccordionDetails>
          </Accordion>

        </CardContent>
      </Card>
    </div>
  )
};

export default PanelDetailInsurances;
