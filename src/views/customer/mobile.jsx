// Main import need
import React, { useState, useEffect } from "react";

// Store redux
import {useSelector, useDispatch} from 'react-redux';

// Component Material UI
import {
} from '@material-ui/core';

// PLT Solution
import ListCustomer from "../../components/list/Customer";
import DialogContainerForm from "../../components/dialog/ContainerForm";
import FormAddNewCustomer from "../../components/form/AddNewCustomer";
import FormEditCustomer from "../../components/form/EditCustomer";

// Utils mores
import PltLang from "../../plt_lang";
import PltCommon from "../../plt_common";

// Main this component
const ViewCustomerMobile = (props) => {
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
      <ListCustomer/>

      {openDialogAddNew && (
        <DialogContainerForm fullScreen={false} open={openDialogAddNew} title={PltLang.getMsg('TITLE_DIALOG_ADD_NEW')}>
          <FormAddNewCustomer/>
        </DialogContainerForm>
      )}

      {openDialogEdit.is_show && (
        <DialogContainerForm fullScreen={false}  open={openDialogEdit.is_show} title={PltLang.getMsg('TITLE_DIALOG_UPDATE')}>
          <FormEditCustomer dataEdit={openDialogEdit.dataEdit}/>
        </DialogContainerForm>
      )}
    </>
  )
};

export default ViewCustomerMobile;
