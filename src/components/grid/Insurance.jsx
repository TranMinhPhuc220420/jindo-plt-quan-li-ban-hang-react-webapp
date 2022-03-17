// Main import need
import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
  LinearProgress
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

import {
  DataGrid,
  GridToolbar, GridActionsCellItem,
} from '@mui/x-data-grid';


// PLT Solution
import {
  setAppOpenDialogDetail,
  setAppSnackBar,
} from "../../store/action";
import PltLang from "../../plt_lang";

// Utils mores
import Moment from 'moment';

// Main this component
const GridInsurance = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // Variable component

  // Variable store
  const dataInsurances = useSelector(state => state.data.insurances);
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
          />
        ];
      }
    },
    {
      field: 'bill',
      headerName: 'Khách hàng',
      flex: 1,
      valueFormatter: (params) => {
        return params.value.customer.name;
      },
    },
    {
      field: 'production',
      headerName: 'Sản phẩm',
      flex: 1,
      valueFormatter: (params) => {
        return params.value.name;
      },
    },
    {
      field: 'bill_id',
      headerName: 'Mã hoá đơn',
      valueFormatter: (params) => {
        return `#${params.value}`;
      },
    },
    {
      field: 'to_date',
      headerName: 'Thời hạn',
      valueFormatter: (params) => {
        return `${params.value} tháng`;
      },
    },
    {
      field: 'note',
      headerName: 'Ghi chú',
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'Ngày tạo',
      width: 150,
      valueFormatter: (params) => {
        return Moment(params.value).format('DD-MM-YYYY hh:mm');
      },
    },
  ];

  // Methods
  const getInsuranceByID = (id) => {
    for (let i = 0; i < dataInsurances.length; i++) {
      const item = dataInsurances[i];

      if (item.id === id) {
        return item
      }
    }
    return null;
  };

  const handlerClickShowDetail = (idEdit) => {
    const insuranceShowDetail = getInsuranceByID(idEdit);
    dispatch(setAppOpenDialogDetail({
      is_show: true,
      dataDetail: insuranceShowDetail
    }));
  };

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
    <>
      <div style={{display: 'flex', height: '95%'}}>
        <div style={{flexGrow: 1}}>

          {gridIsLoading && (
            <LinearProgress/>
          )}

          <DataGrid
            style={{backgroundColor: '#fff'}}
            rows={dataInsurances}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
            // onCellEditCommit={handleCellEditCommit}
          />
        </div>
      </div>

    </>
  )
};

export default GridInsurance;
