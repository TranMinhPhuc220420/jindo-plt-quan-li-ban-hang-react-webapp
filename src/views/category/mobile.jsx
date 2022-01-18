// Main import need
import React, { useState, useEffect } from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
} from '@material-ui/core';

// PLT Solution
import DialogContainerForm from "../../components/dialog/ContainerForm";
import FormAddNewCategory from "../../components/form/AddNewCategory";
import FormEditCategory from "../../components/form/EditCategory";
import ListCagegory from "../../components/list/Category";

// Utils mores
import PltLang from "../../plt_lang";
import PltCommon from "../../plt_common";

// Main this component
const ViewCategoryMobile = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store
  const openDialogAddNew = useSelector(state => state.app.open_dialog_add_new);
  const openDialogEdit = useSelector(state => state.app.open_dialog_edit);

  // Methods

  // End methods *******************

  // Return content this component
  return (
    <>
      <ListCagegory/>

      {openDialogAddNew && (
        <DialogContainerForm fullScreen={false} open={openDialogAddNew} title={PltLang.getMsg('TITLE_DIALOG_ADD_NEW')}>
          <FormAddNewCategory/>
        </DialogContainerForm>
      )}

      {openDialogEdit.is_show && (
        <DialogContainerForm open={openDialogEdit.is_show} title={PltLang.getMsg('TITLE_DIALOG_UPDATE')}>
          <FormEditCategory dataEdit={openDialogEdit.dataEdit}/>
        </DialogContainerForm>
      )}
    </>
  )
};

export default ViewCategoryMobile;
