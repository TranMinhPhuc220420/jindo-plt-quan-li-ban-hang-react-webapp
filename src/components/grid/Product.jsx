// Main import need
import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';

// Store redux
import {useSelector, useDispatch} from 'react-redux';

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
import {setAppOpenDialogEdit, setAppSnackBar, setDataCategorys, setDataProducts} from "../../store/action";
import {MyUtils} from "../../utils";
import PltLang from "../../plt_lang";
import CategoryRequest from "../../requests/Category";

// Utils mores
import Moment from 'moment';
import ProductRequest from "../../requests/Product";

// Main this component
const GridProduct = ({dataSearch}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Variable component

  // Variable store

  const dataProducts = useSelector(state => {
    const data = state.data.products;
    const keySearch = state.app.key_search;

    if ((!keySearch || keySearch === '') && dataSearch.categorySearch === '' && dataSearch.isSearchOverRest === false) {
      return data;
    }

    const dataFind = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      let isPush = false;

      if (!keySearch && keySearch != '') {
        const likeName = PltCommon.subStrToLowWidthSpace(item.name).indexOf(keySearch) !== -1;
        const likeCateogryName = PltCommon.subStrToLowWidthSpace(item.category.name).indexOf(keySearch) !== -1;
        if (likeName || likeCateogryName) {
          isPush = true;
        } else {
          isPush = false;
        }
      }

      if (dataSearch.categorySearch != '') {
        if (item.category.id === dataSearch.categorySearch) {
          if (dataSearch.isSearchOverRest == true) {
            if (item.rest <= 0) {
              isPush = true;
            } else {
              isPush = false;
            }
          } else {
            isPush = true;
          }
          isPush = true;
        } else {
          isPush = false;
        }
      }

      if (dataSearch.isSearchOverRest == true) {
        if (item.rest <= 0) {
          if (dataSearch.categorySearch != '') {
            if (item.category.id === dataSearch.categorySearch) {
              isPush = true;
            } else {
              isPush = false;
            }
          } else {
            isPush = true;
          }
        } else {
          isPush = false;
        }
      }

      if (isPush == true) {
        dataFind.push(item);
      }
    }
    return dataFind;
  });
  const gridIsLoading = useSelector(state => state.app.grid_is_loading);

  const columns = [
    {field: 'id', headerName: '#ID'},
    {field: 'name', headerName: 'Tên loại', flex: 1, editable: true},
    {field: 'price', headerName: 'Giá bán', width: 150, editable: true, type: 'number',},
    {field: 'rest', headerName: 'Trong kho còn', width: 150, editable: true, type: 'number',},
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
      getActions: ({id}) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="text-success"
            onClick={() => { handlerClickEdit(id) }}
          />,
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
  const getProductByID = (id) => {
    for (let i = 0; i < dataProducts.length; i++) {
      const item = dataProducts[i];

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
    const formData = new FormData();
    formData.append('id', dataChanged.id);
    formData.append(dataChanged.field, dataChanged.value);

    showSnack(PltLang.getMsg('TXT_UPLOADING_DATA'), 'text-primary', true);
    // Call request add new category
    const result = await ProductRequest.update(formData);
    showSnack('', '', false);

    if (result != null) {
      handlerAddNewSuccess();
    } else {
      handlerAddNewFail();
    }
  };
  const handlerClickEdit = (idEdit) => {
    const productEdit = getProductByID(idEdit);
    dispatch(setAppOpenDialogEdit({
      is_show: false,
      dataEdit: productEdit
    }));

    history.push('/admin/san-pham/chinh-sua/' + idEdit)
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
          const result = await ProductRequest.delete(formData);
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

    ProductRequest.getAll().then(data => {
      dispatch(setDataProducts(data));
    });
  };
  const handlerDeleteFail = () => {
    showSnack(PltLang.getMsg('TXT_DELETE_FAILD'), 'text-error', true);
    dispatch(setAppOpenDialogEdit(false));
  };
  const handlerAddNewSuccess = () => {
    showSnack(PltLang.getMsg('TXT_UPDATE_SUCCESS'), 'text-success', true);
    dispatch(setAppOpenDialogEdit(false));

    ProductRequest.getAll().then(data => {
      dispatch(setDataProducts(data));
    });
  };
  const handlerAddNewFail = () => {
    showSnack(PltLang.getMsg('TXT_UPDATE_FAILD'), 'text-error', true);
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
            rows={dataProducts}
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

export default GridProduct;
