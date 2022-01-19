// Main import need
import React, { useState, useEffect } from "react";

// Store redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setAppOpenDialogAddNew,
  setDataCategorys,
  setAppGridIsLoading
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
import GridCagegory from "../../components/grid/Category";

// Utils mores
import PltLang from "../../plt_lang";
import PltCommon from "../../plt_common";

import CategoryRequest from "../../requests/Category";

// Main this component
const ViewCategoryDesktop = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store
  const openDialogAddNew = useSelector(state => state.app.open_dialog_add_new);
  const openDialogEdit = useSelector(state => state.app.open_dialog_edit);

  // Methods
  const handlerShowDialogAddNew = () => {
    dispatch(setAppOpenDialogAddNew(true));
  };

  const handlerRefreshData = () => {
    dispatch(setAppGridIsLoading(true));
    
    CategoryRequest.getAll().then(data => {
      dispatch(setDataCategorys(data));
      dispatch(setAppGridIsLoading(false));
    });
  }
  // End methods *******************

  // Return content this component
  return (
    <>
      {/* Toolbar */}
      <div className="toolbar mb-2">
        <div className="d-flex justify-content-between">
          <h4>{PltLang.getMsg('TXT_CATEGORY')}</h4>

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

      <GridCagegory />

      {openDialogAddNew && (
        <DialogContainerForm fullScreen={false} open={openDialogAddNew} title={PltLang.getMsg('TITLE_DIALOG_ADD_NEW')}>
          <FormAddNewCategory />
        </DialogContainerForm>
      )}

      {openDialogEdit.is_show && (
        <DialogContainerForm open={openDialogEdit.is_show} title={PltLang.getMsg('TITLE_DIALOG_UPDATE')}>
          <FormEditCategory dataEdit={openDialogEdit.dataEdit} />
        </DialogContainerForm>
      )}
    </>
  )
};

export default ViewCategoryDesktop;
