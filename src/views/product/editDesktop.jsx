// Main import need
import React, { useState, useEffect } from "react";
import { useParams }  from "react-router-dom";

// Store redux
import { useSelector, useDispatch } from 'react-redux';
import {
} from "../../store/action";

// Component Material UI
import {
} from '@material-ui/core';

// PLT Solution
import FormEditProduct from "../../components/form/EditProduct";

// Utils mores
import PltLang from "../../plt_lang";
import PltCommon from "../../plt_common";

// Main this component
const ViewEditProductDesktop = (props) => {
  const dispatch = useDispatch();
  let { idEdit } = useParams();

  // Variable component

  // Variable store
  const openDialogEdit = useSelector(state => state.app.open_dialog_edit);
  const dataProducts = useSelector(state => state.data.products);

  // Methods
  const getProductByID = (id) => {
    for (let i = 0; i < dataProducts.length; i++) {
      const item = dataProducts[i];

      if (item.id == id) {
        return item
      }
    }
    return null;
  };
  // End methods *******************

  // Return content this component
  return (
    <div>
      {getProductByID(idEdit) && (
        <FormEditProduct dataEdit={getProductByID(idEdit)}/>
      )}
    </div>
  )
};

export default ViewEditProductDesktop;
