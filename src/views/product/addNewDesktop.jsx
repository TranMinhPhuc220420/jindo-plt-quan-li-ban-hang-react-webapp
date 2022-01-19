// Main import need
import React, { useState, useEffect } from "react";

// Store redux
import { useSelector, useDispatch } from 'react-redux';
import {
} from "../../store/action";

// Component Material UI
import {
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

// PLT Solution
import FormAddNewProduct from "../../components/form/AddNewProduct";

// Utils mores
import PltLang from "../../plt_lang";
import PltCommon from "../../plt_common";

// Main this component
const ViewAddNewProductDesktop = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store

  // Methods

  // End methods *******************

  // Return content this component
  return (
    <FormAddNewProduct/>
  )
};

export default ViewAddNewProductDesktop;
