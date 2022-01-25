// Main import need
import React, { useState, useEffect } from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
} from '@material-ui/core';

// PLT Solution
import DialogContainerForm from "../../components/dialog/ContainerForm";
import ListProduct from "../../components/list/Product";
import FormAddNewProduct from "../../components/form/AddNewProduct";
import FormEditProduct from "../../components/form/EditProduct";

// Utils mores
import PltLang from "../../plt_lang";
import DialogContainerDetail from "../../components/dialog/ContainerDetail";
import PanelDetailProduct from "../../components/panel/DetailProduct";

// Main this component
const ViewProductMobile = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store
  const openDialogAddNew = useSelector(state => state.app.open_dialog_add_new);
  const openDialogEdit = useSelector(state => state.app.open_dialog_edit);
  const openDialogDetail = useSelector(state => state.app.open_dialog_detail);

  // Methods

  // End methods *******************

  // Return content this component
  return (
    <>
      <ListProduct/>

      {openDialogAddNew && (
        <DialogContainerForm fullScreen={true} open={openDialogAddNew} title={PltLang.getMsg('TITLE_DIALOG_ADD_NEW')}>
          <FormAddNewProduct/>
        </DialogContainerForm>
      )}

      {openDialogEdit.is_show && (
        <DialogContainerForm fullScreen={true} open={openDialogEdit.is_show} title={PltLang.getMsg('TITLE_DIALOG_UPDATE')}>
          <FormEditProduct dataEdit={openDialogEdit.dataEdit}/>
        </DialogContainerForm>
      )}

      {openDialogDetail.is_show && (
        <DialogContainerDetail fullScreen={true} open={openDialogDetail.is_show} title={PltLang.getMsg('TITLE_DIALOG_DETAIL')}>
          <PanelDetailProduct dataProduct={openDialogDetail.dataDetail}/>
        </DialogContainerDetail>
      )}
    </>
  )
};

export default ViewProductMobile;
