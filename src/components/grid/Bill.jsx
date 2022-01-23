// Main import need
import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {setAppOpenDialogEdit, setAppSnackBar, setDataBills} from "../../store/action";

// Component Material UI
import {
  LinearProgress,
  Button,
  Chip, Avatar, Divider, Typography,
  List, ListItem, ListItemAvatar, ListItemText,
} from '@material-ui/core';

import {
  DataGrid,
  GridToolbar, GridActionsCellItem,
} from '@mui/x-data-grid';

import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

// PLT Solution
import PltCommon from "../../plt_common";
import {MyUtils} from "../../utils";
import PltLang from "../../plt_lang";
import BillRequest from "../../requests/Bill";

// Utils mores
import Moment from 'moment';
import currencyFormatter from "currency-formatter";
import {DOMAIN_APP} from "../../constant";
import DialogContainerList from "../dialog/ContainerList";

// Main this component
const GridBill = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Variable component
  const [openDialogProducts, setOpenDialogProducts] = useState(false);
  const [openDialogInsurances, setOpenDialogInsurances] = useState(false);
  const [dataBillShow, setDataBillShow] = useState(null);

  // Variable store

  const dataBills = useSelector(state => state.data.bills);
  const gridIsLoading = useSelector(state => state.app.grid_is_loading);

  const columns = [
    {
      field: 'id',
      headerName: '#ID'
    },
    {
      field: 'customer',
      headerName: 'Khách hàng',
      flex: 1,
      valueFormatter: (params) => {
        return params.value.name
      },
    },
    {
      field: 'productions',
      type: 'actions',
      headerName: 'Sản phẩm',
      cellClassName: 'actions',
      width: 200,
      getActions: (record) => {
        const data = record.row;
        console.log(data)
        return [
          <Chip color="primary"
                avatar={<Avatar src={`${DOMAIN_APP + data.productions[0].image_url}`}/>}
                label={data.productions.length + ' sản phẩm'}
                clickable
                onDelete={() => {
                  handlerShowDialogListProducts(data)
                }}
                deleteIcon={<VisibilityIcon/>}
          />
        ];
      },
    },
    {
      field: 'total_discount',
      headerName: 'Giảm',
      valueFormatter: (params) => {
        return currencyFormatter.format(params.value, {code: 'VND'})
      },
    },
    {
      field: 'total_price',
      headerName: 'Tổng',
      valueFormatter: (params) => {
        return currencyFormatter.format(params.value, {code: 'VND'})
      },
    },
    {
      field: 'insurances',
      type: 'actions',
      headerName: 'Bảo hành',
      cellClassName: 'actions',
      width: 200,
      getActions: (record) => {
        const data = record.row;
        if (data.insurances.length > 0) {
          return [
            <Chip color="primary"
                  variant="contained"
                  label={'Có ' + data.insurances.length + ' bảo hành'}
                  clickable
                  onDelete={() => {
                    handlerShowDialogListInsurances(data)
                  }}
                  deleteIcon={<VisibilityIcon/>}
            />
          ];
        } else {
          return [
            <Chip color="primary"
                  variant="outlined"
                  label={'Không có bảo hành'}
            />
          ];
        }
      },
    },
    {
      field: 'date_sell',
      headerName: 'Ngày bán',
      width: 150,
      valueFormatter: (params) => {
        return Moment(params.value).format('DD-MM-YYYY hh:mm');
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({id}) => {
        return [
          // <GridActionsCellItem
          //     icon={<EditIcon/>}
          //     label="Edit"
          //     className="text-success"
          //     onClick={() => {
          //         handlerClickEdit(id)
          //     }}
          // />,
          <GridActionsCellItem
            icon={<DeleteIcon/>}
            label="Delete"
            className="text-danger"
            onClick={() => {
              handlerClickDelete(id)
            }}
          />,
        ];
      }
    }
  ];

  // Methods
  const getBillByID = (id) => {
    for (let i = 0; i < dataBills.length; i++) {
      const item = dataBills[i];

      if (item.id === id) {
        return item
      }
    }
    return null;
  };

  const showSnack = (text, color, isShow, time) => {
    if (!time) time = 3000;
    dispatch(setAppSnackBar({open: isShow, text: text, color: color}));

    setTimeout(() => {
      dispatch(setAppSnackBar({open: false, text: '', color: ''}));
    }, time);
  };

  const handleCellEditCommit = async (dataChanged, event) => {
    // const formData = new FormData();
    // formData.append('id', dataChanged.id);
    // formData.append(dataChanged.field, dataChanged.value);
    //
    // showSnack(PltLang.getMsg('TXT_UPLOADING_DATA'), 'text-primary', true);
    // // Call request add new category
    // const result = await ProductRequest.update(formData);
    // showSnack('', '', false);
    //
    // if (result != null) {
    //     handlerAddNewSuccess();
    // } else {
    //     handlerAddNewFail();
    // }
  };

  const handlerClickEdit = (idEdit) => {
    // const productEdit = getBillByID(idEdit);
    // dispatch(setAppOpenDialogEdit({
    //     is_show: false,
    //     dataEdit: productEdit
    // }));
    //
    // history.push('/admin/san-pham/chinh-sua/' + idEdit)
  };

  const handlerClickDelete = (idEdit) => {
    MyUtils.Alter.showAsk(
      PltLang.getMsg('TITLE_ASK_CONFIRM_DELETE_FATHER'),
      PltLang.getMsg('TXT_DESCRIPTION_ASK_CONFIRM_DELETE_FATHER'),
      PltLang.getMsg('TXT_BTN_CONFIRM_DELETE'),
      async (isConfirm) => {
        if (isConfirm === true) {
          const formData = new FormData();
          formData.append('id', idEdit);
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

  const handlerDeleteSuccess = () => {
    showSnack(PltLang.getMsg('TXT_DELETE_SUCCESS'), 'text-success', true);
    dispatch(setAppOpenDialogEdit(false));

    BillRequest.getAll().then(data => {
      dispatch(setDataBills(data));
    });
  };

  const handlerDeleteFail = () => {
    showSnack(PltLang.getMsg('TXT_DELETE_FAILD'), 'text-error', true);
    dispatch(setAppOpenDialogEdit(false));
  };

  const handlerShowDialogListProducts = (data) => {
    setDataBillShow(data);
    setOpenDialogProducts(true);
  };

  const handlerShowDialogListInsurances = (data) => {
    setDataBillShow(data);
    setOpenDialogInsurances(true);
  };
  // End methods *******************

  // Return content this component
  return (
    <>
      {dataBills.length === 0 && (
        PltLang.getMsg('TXT_DATA_EMPTY')
      )}

      <div style={{display: 'flex', height: '95%'}}>
        <div style={{flexGrow: 1}}>

          {gridIsLoading && (
            <LinearProgress/>
          )}

          <DataGrid
            style={{backgroundColor: '#fff'}}
            rows={dataBills}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            onCellEditCommit={handleCellEditCommit}
          />
        </div>
      </div>


      {/* Dialog show list Product has in bill */}
      {((dataBillShow != null) && (openDialogProducts == true)) && (
        <DialogContainerList
          open={openDialogProducts}
          fullScreen={false}
          title={`Sản phẩm có trong hoá đơn của ${dataBillShow.customer.name}`}
          onClose={() => {
            setDataBillShow(null);
            setOpenDialogProducts(false);
          }}
        >
          <List>
            {dataBillShow.productions.map((itemData, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={itemData.name} src={`${DOMAIN_APP}${itemData.image_url}`}/>
                  </ListItemAvatar>
                  <ListItemText>
                    <span>
                        {itemData.name}
                    </span>
                    <Chip
                      color="primary"
                      variant="contained"
                      className="ml-2"
                      label={currencyFormatter.format(itemData.price, {code: 'VND'})}
                    />
                  </ListItemText>
                </ListItem>

                {dataBillShow.productions[index + 1] && (
                  <Divider/>
                )}
              </div>
            ))}
          </List>
        </DialogContainerList>
      )}

      {/* Dialog show list Insurances has in bill */}
      {((dataBillShow != null) && (openDialogInsurances == true)) && (
        <DialogContainerList
          open={openDialogInsurances}
          fullScreen={false}
          title={`Phiếu bảo hành có trong hoá đơn của ${dataBillShow.customer.name}`}
          onClose={() => {
            setDataBillShow(null);
            setOpenDialogInsurances(false);
          }}
        >
          <List>
            {dataBillShow.insurances.map((itemData, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={itemData.production.name} src={`${DOMAIN_APP}${itemData.production.image_url}`}/>
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography>
                      {itemData.production.name}
                    </Typography>
                    <Chip
                      color="primary"
                      label={`${itemData.to_date} tháng`}
                      clickable
                      onDelete={() => {
                      }}
                      deleteIcon={<CalendarTodayIcon/>}
                    />
                  </ListItemText>
                </ListItem>

                {dataBillShow.insurances[index + 1] && (
                  <Divider/>
                )}
              </div>
            ))}
          </List>
        </DialogContainerList>
      )}

    </>
  )
};

export default GridBill;