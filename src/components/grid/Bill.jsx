// Main import need
import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {setAppOpenDialogDetail, setAppOpenDialogEdit, setAppSnackBar, setDataBills} from "../../store/action";

// Component Material UI
import {
  LinearProgress,
  Button,
  Chip, Avatar, Divider, Typography,
  List, ListItem, ListItemAvatar, ListItemText,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

import {
  DataGrid,
  GridToolbar, GridActionsCellItem,
} from '@mui/x-data-grid';


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

  // Variable store
  const dataBills = useSelector(state => state.data.bills);
  const gridIsLoading = useSelector(state => state.app.grid_is_loading);

  const columns = [
    {
      field: 'id',
      headerName: '#ID',
      width: 50,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({id}) => {
        return [
          <GridActionsCellItem
            icon={<AssignmentIcon/>}
            label="Detail"
            className="text-primary"
            onClick={() => {
              handlerClickShowDetail(id)
            }}
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon/>}
          //   label="Delete"
          //   className="text-danger"
          //   onClick={() => {
          //     handlerClickDelete(id)
          //   }}
          // />,
        ];
      }
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
        return [
          <Chip color="primary"
                avatar={<Avatar src={`${DOMAIN_APP + data.productions[0].image_url}`}/>}
                label={data.productions.length + ' sản phẩm'}
                // clickable
                // onDelete={() => {
                //   handlerShowDialogListProducts(data)
                // }}
                // deleteIcon={<VisibilityIcon/>}
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
                  variant="outlined"
                  label={'Có ' + data.insurances.length + ' bảo hành'}
                  // clickable
                  // onDelete={() => {
                  //   handlerShowDialogListInsurances(data)
                  // }}
                  // deleteIcon={<VisibilityIcon/>}
            />
          ];
        } else {
          return [
            <Chip color="secondary"
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

  const handlerClickShowDetail = (idEdit) => {
    const productShowDetail = getBillByID(idEdit);
    dispatch(setAppOpenDialogDetail({
      is_show: true,
      dataDetail: productShowDetail
    }));
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
  // End methods *******************

  // Return content this component
  return (
    <>
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
    </>
  )
};

export default GridBill;