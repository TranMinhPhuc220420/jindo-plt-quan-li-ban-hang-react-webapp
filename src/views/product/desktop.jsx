// Main import need
import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {
  setAppOpenDialogAddNew,
  setAppGridIsLoading,
  setDataProducts,
} from "../../store/action";

// Component Material UI
import {
  Button, Icon,
  LinearProgress
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

// PLT Solution
import DialogContainerForm from "../../components/dialog/ContainerForm";
import FormAddNewCategory from "../../components/form/AddNewCategory";
import FormEditCategory from "../../components/form/EditCategory";

// Utils mores
import PltLang from "../../plt_lang";
import PltCommon from "../../plt_common";

import ProductRequset from "../../requests/Product";
import GridProduct from "../../components/grid/Product";

// Main this component
const ViewProductDesktop = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // Variable component

  // Variable store

  // Methods
  const handlerShowDialogAddNew = () => {
    history.push('/admin/san-pham/them-moi');
  };

  const handlerRefreshData = () => {
    dispatch(setAppGridIsLoading(true));
    ProductRequset.getAll().then(data => {
      dispatch(setDataProducts(data));
      dispatch(setAppGridIsLoading(false));
    });
  };
  // End methods *******************

  // Return content this component
  return (
    <>
      {/* Toolbar */}
      <div className="toolbar mb-2">
        <div className="d-flex justify-content-between">
          <h4>{PltLang.getMsg('TXT_PRODUCT')}</h4>
          <div className="text-right">
            <Button color="primary" variant="contained" aria-label="add new"
                    className=""
                    onClick={handlerShowDialogAddNew}
            >
              <AddIcon></AddIcon>
              Thêm mới
            </Button>

            <Button color="primary" variant="contained" aria-label="add new"
                    className="ml-2"
                    onClick={handlerRefreshData}
            >
              <RefreshIcon></RefreshIcon>
              Tải lại
            </Button>
          </div>
        </div>
      </div>

      <GridProduct/>
    </>
  )
};

export default ViewProductDesktop;
