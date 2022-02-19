// Main import need
import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {
  setAppOpenDialogAddNew,
  setAppSnackBar,
  setDataBills,
  setDataInsurances,
  setDataProducts, setDataCustomers
} from "../../store/action";

// Component Material UI
import {
  Button, IconButton,
  FormControl, Checkbox, TextField, Select, MenuItem, InputLabel, FilledInput,
  FormControlLabel,
  Card, CardContent, CardActions,
  Divider, List, ListItem, Avatar, ListItemAvatar,
  Accordion,
  AccordionSummary, AccordionDetails, AccordionActions,
  Typography,
} from '@material-ui/core';
import IconAdd from '@material-ui/icons/Add';
import IconDelete from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// PLT Solution
import DialogContainerList from "../dialog/ContainerList";
import ListSelectProduct from "../list/SelectProduct";

import PltLang from "../../plt_lang";
import PltCommon from "../../plt_common";
import {MyUtils} from "../../utils";
import {DOMAIN_APP} from "../../constant";
import BillRequest from "../../requests/Bill";
import ProductRequest from "../../requests/Product";
import InsurancesRequest from "../../requests/Insurances";
import CustomerRequest from "../../requests/Customer";

// Utils mores
import currencyFormatter from "currency-formatter";
import Moment from 'moment';

// Main this component
const FormAddNewBill = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Variable component
  const [isMobile, setIsMobile] = useState(PltCommon.isMobile);
  const [openDialogListProcduct, setOpenDialogListProcduct] = useState(false);
  const [hasCustomerInData, setHasCustomerInData] = useState(false);
  const [customerSelectedInData, setCustomerSelectedInData] = useState({name: '', phone: ''});
  const [customer_id, setCustomerId] = useState('');
  const [name_customer, setNameCustomer] = useState('');
  const [phone_customer, setPhoneCustomer] = useState(PltLang.getMsg('TXT_NOT_USE'));
  const [category_id, setCategoryId] = useState('');
  const [date_sell, setDateSell] = useState(
    Moment().format('yyyy-MM-DD')
  );
  const [time_sell, setTimeSell] = useState(
    Moment().format('hh:mm')
  );
  const [list_products, setListProduct] = useState([]);
  const [note, setNote] = useState('');
  const heightAuto = PltCommon.getHeightBody() - (64);

  // Variable store
  const catgorys = useSelector(state => state.data.categorys);
  const products = useSelector((state) => {
    const products = state.data.products;
    if (category_id === '' || !category_id) {
      return products;
    }

    const productsByIdCatgegory = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.id === category_id) {
        productsByIdCatgegory.push(products[i]);
      }
    }

    return productsByIdCatgegory;
  });
  const customers = useSelector(state => state.data.customers);

  // Methods
  const validateAndGetFormData = () => {
    const formData = new FormData();
    formData.append('has_customer_in_data', hasCustomerInData);
    formData.append('total_price', getCountPrice());
    formData.append('total_discount', getCountDicount());
    formData.append('date_sell', `${date_sell} ${time_sell}`);

    if (hasCustomerInData) {
      if (PltCommon.isStrEmpty(customer_id)) {
        return {result: false, formData: null, mess: 'Khách hàng đang trống'};
      } else {
        formData.append('customer_id', customer_id);
      }
    } else {
      if (PltCommon.isStrEmpty(name_customer)) {
        return {result: false, formData: null, mess: 'Tên khách hàng đang trống'};
      } else {
        formData.append('name_customer', name_customer);
      }
      if (PltCommon.isStrEmpty(phone_customer)) {
        // return {result: false, formData: null, mess: 'Số điện thoại khách hàng đang trống'};
        setPhoneCustomer(PltLang.getMsg('TXT_NOT_USE'));
      }

      formData.append('phone_customer', phone_customer);
    }
    // if (PltCommon.isStrEmpty(note))
    formData.append('note', note);

    if (list_products.length === 0) {
      return {result: false, formData: null, mess: 'Hoá đơn không có sản phẩm được chọn'};
    } else {
      const arrProductId = [];

      for (let i = 0; i < list_products.length; i++) {
        const item = list_products[i];
        arrProductId.push({
          "production_id": item.data.id,
          "discount": item.discout,
          "total": item.total,
          "insurance": {
            "has_insurance": item.has_insurances,
            "note": item.insurances.note,
            "to_date": item.insurances.to_date
          }
        });
      }
      formData.append('arr_production', JSON.stringify(arrProductId));
    }

    // total_price
    // total_discount


    return {result: true, formData: formData, mess: 'success'};
  };

  const showSnack = (text, color, isShow, time) => {
    if (!time) time = 3000;
    dispatch(setAppSnackBar({open: isShow, text: text, color: color}));

    setTimeout(() => {
      dispatch(setAppSnackBar({open: false, text: '', color: ''}));
    }, time);
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const {result, formData, mess} = validateAndGetFormData();
    if (formData == null) {
      MyUtils.Alter.showError(
        PltLang.getMsg('TITLE_VALIDATE_FORM_FAIL'),
        mess
      );
      // dispatch(setAppOpenDialogAddNew(false));
    } else {
      showSnack(PltLang.getMsg('TXT_UPLOADING_DATA'), 'text-primary', true);
      // Call request add new category
      const result = await BillRequest.create(formData);
      showSnack('', '', false);

      if (result != null) {
        handlerAddNewSuccess();
      } else {
        handlerAddNewFail();
      }
    }
  };

  const handlerAddNewSuccess = () => {
    showSnack(PltLang.getMsg('TXT_CREATE_NEW_SUCCESS'), 'text-success', true);

    BillRequest.getAll().then(data => {
      dispatch(setDataBills(data));
    });
    InsurancesRequest.getAll().then(data => {
      dispatch(setDataInsurances(data));
    });
    ProductRequest.getAll().then(data => {
      dispatch(setDataProducts(data));
    });

    if (hasCustomerInData === false) {
      CustomerRequest.getAll().then(data => {
        dispatch(setDataCustomers(data));
      });
    }

    if (!isMobile) {
      history.push('/admin/hoa-don')
    } else {
      dispatch(setAppOpenDialogAddNew(false));
    }
  };

  const handlerAddNewFail = () => {
    showSnack(PltLang.getMsg('TXT_CREATE_NEW_FAILD'), 'text-error', true);

    if (!isMobile) {
      history.push('/admin/hoa-don')
    } else {
      dispatch(setAppOpenDialogAddNew(false));
    }
  };

  const handlerChangeCheckBox = (event) => {
    setHasCustomerInData(event.target.checked);
  };

  const handlerShowDialogListProduct = (isShow) => {
    console.log(isShow)
    setOpenDialogListProcduct(isShow);
  };

  const handlerSelectProduct = (data) => {
    handlerShowDialogListProduct(false);

    const dataClone = [...list_products];
    dataClone.push({
      data: data,
      discout: 0,
      total: 1,
      error_total: false,
      has_insurances: false,
      insurances: {
        note: '',
        to_date: Moment(new Date()).format('yyyy-MM-DD'),
      }
    });

    setListProduct(dataClone);
  };

  const handlerRemoveProduct = (index) => {
    let dataClone = [...list_products];
    dataClone.splice(index, 1);
    setListProduct(dataClone);
  };

  const getCountPrice = () => {
    const data = list_products;
    let price = 0;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      price += (item.data.price * item.total);
    }

    return price;
  };

  const getCountDicount = () => {
    const data = list_products;
    let price = 0;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      price += (item.discout * item.total);
    }

    return price;
  };
  const getCountInsurances = () => {
    const data = list_products;
    let count = 0;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.has_insurances === true) {
        count++;
      }
    }

    return count;
  };
  // End methods *******************

  // Return content this component
  return (
    <form style={{height: isMobile ? heightAuto : 'auto'}} onSubmit={handlerSubmit}>
      <Card className={'w-100 h-100 overflow-auto'}>
        <CardContent className="">
          <div className={'mb-4'}>
            <h6 className={''}>
            <span className="border-bottom">
              {PltLang.getMsg('TXT_CUSTOMER')}
            </span>
            </h6>

            <FormControlLabel
              label={PltLang.getMsg('LABEL_CHECKBOX_HAS_CUSTOMER_IN_DATA')}
              control={
                <Checkbox checked={hasCustomerInData} color="primary" onChange={handlerChangeCheckBox}/>
              }
            />
            {hasCustomerInData === true && (
              <>
                <FormControl className={'w-100'} variant="outlined">
                  <InputLabel id={'customer-has-in-data'}>
                    {PltLang.getMsg('LABEL_INPUT_NAME_CUSTOMER')}
                  </InputLabel>
                  <Select
                    id={'customer-has-in-data'}
                    value={customer_id}
                    label={PltLang.getMsg('LABEL_INPUT_NAME_CUSTOMER')}
                    onChange={(event) => {
                      const value = event.target.value;
                      setCustomerId(value);
                      for (let i = 0; i < customers.length; i++) {
                        const item = customers[i];
                        if (item.id === value) {
                          setCustomerSelectedInData(item);
                          break;
                        }
                      }
                    }}>
                    {customers.map((item, index) => (
                      <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={'w-100 mt-4'}>
                  <TextField id="phone_customer" name="phone_customer"
                             variant="outlined"
                             label={PltLang.getMsg('LABEL_INPUT_PHONE_CUSTOMER')}
                             value={customerSelectedInData.phone}
                             disabled={true}
                  />
                </FormControl>
              </>
            )}
            {hasCustomerInData === false && (
              <>
                <FormControl className={'w-100'}>
                  <TextField id="name_customer" name="name_customer"
                             variant="outlined"
                             label={PltLang.getMsg('LABEL_INPUT_NAME_CUSTOMER')}
                             value={name_customer}
                             onChange={(event) => {
                               setNameCustomer(event.target.value)
                             }}
                  />
                </FormControl>
                <FormControl className={'w-100 mt-4'}>
                  <TextField id="phone_customer" name="phone_customer"
                             variant="outlined"
                             label={PltLang.getMsg('LABEL_INPUT_PHONE_CUSTOMER')}
                             value={phone_customer}
                             onChange={(event) => {
                               setPhoneCustomer(event.target.value)
                             }}
                  />
                </FormControl>
              </>
            )}
          </div>

          <div className="mb-4">
            <FormControl>
              <TextField label={PltLang.getMsg('LABEL_INPUT_DATE_SELL')}
                         variant="outlined"
                         type={'date'}
                         value={date_sell}
                         onChange={(event) => {
                           let value = Moment(event.target.value).format('yyyy-MM-DD');
                           setDateSell(value);
                         }}
              />
            </FormControl>
            <FormControl>
              <TextField label={PltLang.getMsg('LABEL_INPUT_TIME_SELL')}
                         variant="outlined"
                         type={'time'}
                         value={time_sell}
                         onChange={(event) => {
                           setTimeSell(event.target.value);
                         }}
              />
            </FormControl>
          </div>

          <div className="mb-4">
            <div className="title d-flex justify-content-between align-items-center">
              <h6 className={''}>
                <span className="border-bottom">
                  {PltLang.getMsg('TXT_PRODUCT')}
                </span>
              </h6>

              <Button variant="outlined" color={'primary'}
                      onClick={() => {
                        handlerShowDialogListProduct(true)
                      }}
              >
                <IconAdd/>
                {PltLang.getMsg('TXT_BTN_ADD_PRODUCT')}
              </Button>
            </div>
            <List>
              {list_products.map((itemData, index) => (
                <ListItem key={index}>
                  <Accordion className="w-100">
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                      <div className="d-flex w-100 h-100 justify-content-start align-items-center">
                        <Avatar alt={itemData.data.name} src={`${DOMAIN_APP}${itemData.data.image_url}`}/>
                        <Typography className={'ml-2'}>{itemData.data.name}</Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className={'flex-column'}>
                      <FormControl className={'w-100'}>
                        <TextField label={PltLang.getMsg('LABEL_INPUT_DISCOUNT')}
                                   variant="outlined"
                                   type={'number'}
                                   value={itemData.discout}
                                   onChange={(event) => {
                                     const dataClone = [...list_products];
                                     let value = event.target.value;
                                     if (!value || value === '') value = 0;
                                     dataClone[index].discout = Number.parseFloat(value);
                                     setListProduct(dataClone);
                                   }}
                        />
                      </FormControl>

                      <FormControl className={'w-100 mt-3'}>
                        <TextField label={PltLang.getMsg('LABEL_INPUT_TOTAL')}
                                   helperText={`Còn ${itemData.data.rest} sản phẩm`}
                                   error={itemData.error_total}
                                   variant="outlined"
                                   type={'number'}
                                   value={itemData.total}
                                   onChange={(event) => {
                                    //  setTimeout(() => {
                                       const dataClone = [...list_products];
                                       let value = Number.parseInt(event.target.value);
                                       if (!value || value === '') value = 0;
                                      //  console.log(value)
                                      //  const dataProduct = dataClone[index].data;
                                      //  if (dataProduct.rest >= dataClone[index].total) {
                                        //    dataClone.error_total = false;
                                        dataClone[index].total = value;
                                        setListProduct(dataClone);
                                      //  } else {
                                      //   //  dataClone.error_total = true;
                                      //   //  setListProduct(dataClone);
                                      //  }
                                    //  }, 200);
                                   }}
                        />
                      </FormControl>

                      <FormControl className={'w-100'}>
                        <FormControlLabel
                          label={PltLang.getMsg('LABEL_CHECKBOX_HAS_INSURANCES')}
                          control={
                            <Checkbox checked={itemData.has_insurances} color="primary" onChange={(event) => {
                              const dataClone = [...list_products];
                              dataClone[index].has_insurances = event.target.checked;
                              setListProduct(dataClone);
                            }
                            }/>
                          }
                        />
                      </FormControl>

                      {itemData.has_insurances && (
                        <>
                          <FormControl className={'w-100'}>
                            <div className="d-flex justify-content-center align-items-center">
                              <TextField label={PltLang.getMsg('LABEL_INPUT_TO_DATE_INSURANCES')}
                                         variant="outlined"
                                         type={'number'}
                                         value={itemData.insurances.to_date}
                                         onChange={(event) => {
                                           const dataClone = [...list_products];
                                           dataClone[index].insurances.to_date = event.target.value;
                                           setListProduct(dataClone);
                                         }}
                              />
                              <span className="ml-2 h6">/tháng</span>
                            </div>
                          </FormControl>

                          <FormControl className={'w-100 mt-4'}>
                            <TextField label={PltLang.getMsg('LABEL_INPUT_NOTE')}
                                       rows={4}
                                       multiline
                                       variant="outlined"
                                       value={itemData.insurances.note}
                                       onChange={(event) => {
                                         const dataClone = [...list_products];
                                         dataClone[index].insurances.note = event.target.value;
                                         setListProduct(dataClone);
                                       }}
                            />
                          </FormControl>
                        </>
                      )}
                    </AccordionDetails>
                    <AccordionActions>
                      <Button variant="contained" color={'secondary'} onClick={() => {
                        handlerRemoveProduct(index)
                      }}>
                        <IconDelete/>
                        {PltLang.getMsg('TXT_BTN_DELETE')}
                      </Button>
                    </AccordionActions>
                  </Accordion>
                </ListItem>
              ))}
            </List>
          </div>

          {/* Preview bill */}
          <div className="mb-4">
            <h6>
              <span className="border-bottom">
                {PltLang.getMsg('TXT_PREVIEW_BILL')}
              </span>
            </h6>
            <Card>
              <CardContent>
                {hasCustomerInData === true && (
                  <div>
                    <Typography inputMode={'text'}>
                      {PltLang.getMsg('LABEL_INPUT_NAME_CUSTOMER')}: {customerSelectedInData.name}
                    </Typography>
                    <Typography inputMode={'text'}>
                      {PltLang.getMsg('LABEL_INPUT_PHONE')}: {customerSelectedInData.phone}
                    </Typography>
                  </div>
                )}
                {hasCustomerInData === false && (
                  <div>
                    <Typography inputMode={'text'}>
                      {PltLang.getMsg('LABEL_INPUT_NAME_CUSTOMER')}: {name_customer}
                    </Typography>
                    <Typography inputMode={'text'}>
                      {PltLang.getMsg('LABEL_INPUT_PHONE')}: {phone_customer}
                    </Typography>
                  </div>
                )}
                <Typography inputMode={'text'}>
                  {PltLang.getMsg('TXT_COUNT_PRODUCT_BILL')}: {list_products.length}
                </Typography>
                <Typography inputMode={'text'}>
                  {PltLang.getMsg('TXT_COUNT_PRICE_BILL')}: {currencyFormatter.format(getCountPrice(), {code: 'VND'})}
                </Typography>
                <Typography inputMode={'text'}>
                  {PltLang.getMsg('TXT_COUNT_PRICE_DISCOUNT_BILL')}: {currencyFormatter.format(getCountDicount(), {code: 'VND'})}
                </Typography>
                <Typography inputMode={'text'}>
                  {PltLang.getMsg('TXT_COUNT_PRODUCT_HAS_INSURANCES')}: {getCountInsurances()}
                </Typography>
                <Typography className={'mt-3'} inputMode={'text'}>
                  <strong>{PltLang.getMsg('TXT_COUNT_PRICE_PAY_BILL')}:</strong>
                  <span> {currencyFormatter.format((getCountPrice() - getCountDicount()), {code: 'VND'})} </span>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <Divider/>
        <CardActions className="justify-content-end">
          <Button className={'mr-2'} type="submit"
                  variant="contained" color="primary"
          >
            {PltLang.getMsg('TXT_BTN_ADD_NEW')}
          </Button>
        </CardActions>
      </Card>

      <DialogContainerList
        open={openDialogListProcduct}
        fullScreen={true}
        title={PltLang.getMsg('TITLE_DIALOG_LIST_PRODUCT')}
        onClose={() => {
          handlerShowDialogListProduct(false)
        }}
      >
        <ListSelectProduct onSelect={(dataItem) => {
          handlerSelectProduct(dataItem)
        }}/>
      </DialogContainerList>
    </form>
  )
};

export default FormAddNewBill;
