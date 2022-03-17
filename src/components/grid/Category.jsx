// Main import need
import React, { useState, useEffect } from "react";

// Store redux
import { useSelector, useDispatch } from 'react-redux';

// Component Material UI
import {
  LinearProgress
} from '@material-ui/core';

import {
  DataGrid,
  GridToolbar, GridActionsCellItem,
} from '@mui/x-data-grid';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// PLT Solution
import PltCommon from "../../plt_common";
import { setAppOpenDialogEdit, setAppSnackBar, setDataCategorys } from "../../store/action";
import { MyUtils } from "../../utils";
import PltLang from "../../plt_lang";
import CategoryRequest from "../../requests/Category";

// Utils mores
import Moment from 'moment';


// Main this component
const GridCagegory = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store

  const dataCategorys = useSelector(state => {
    const data = state.data.categorys;
    const keySearch = state.app.key_search;

    if (!keySearch || keySearch === '') {
      return data;
    }

    const dataFind = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (PltCommon.subStrToLowWidthSpace(item.name).indexOf(keySearch) !== -1) {
        dataFind.push(item);
      }
    }

    return dataFind;
  });
  const gridIsLoading = useSelector(state => state.app.grid_is_loading);

  const columns = [
    { field: 'id', headerName: '#ID' },
    { field: 'name', headerName: 'Tên loại', flex: 1 },
    {
      field: 'created_at', headerName: 'Ngày tạo', width: 150,
      valueFormatter: (params) => {
        return Moment(params.value).format('DD-MM-YYYY hh:mm:ss');
      },
    },
    {
      field: 'updated_at', headerName: 'Ngày cập nhật', width: 150,
      valueFormatter: (params) => {
        return Moment(params.value).format('DD-MM-YYYY hh:mm:ss');
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="text-success"
            onClick={() => { handlerClickEdit(id) }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            className="text-danger"
            onClick={() => { handlerClickDelete(id) }}
          />,
        ];
      }
    }
  ];

  // Methods
  const getCategoryByID = (id) => {
    for (let i = 0; i < dataCategorys.length; i++) {
      const item = dataCategorys[i];
      
      if (item.id === id) {
        return item
      }
    }
    return null;
  };

  const showSnack = (text, color, isShow, time) => {
    if (!time) time = 3000;
    dispatch(setAppSnackBar({ open: isShow, text: text, color: color }));

    setTimeout(() => {
      dispatch(setAppSnackBar({ open: false, text: '', color: '' }));
    }, time);
  };

  const handlerClickEdit = (idEdit) => {
    const dataEdit = getCategoryByID(idEdit);
    dispatch(setAppOpenDialogEdit({
      is_show: true,
      dataEdit: dataEdit
    }))
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
          const result = await CategoryRequest.delete(formData);
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

    CategoryRequest.getAll().then(data => {
      dispatch(setDataCategorys(data));
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
      <div style={{ display: 'flex', height: '95%' }}>
        <div style={{ flexGrow: 1 }}>

          {gridIsLoading && (
            <LinearProgress />
          )}

          <DataGrid
            style={{backgroundColor: '#fff'}}
            rows={dataCategorys}
            columns={columns}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </div>

    </>
  )
};

export default GridCagegory;
