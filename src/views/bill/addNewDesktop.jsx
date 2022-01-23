// Main import need
import React, { useState, useEffect } from "react";

// Store redux
import { useSelector, useDispatch } from 'react-redux';
import {
} from "../../store/action";

// Component Material UI
import {
} from '@material-ui/core';

// PLT Solution
import FormAddNewBill from "../../components/form/AddNewBill";

// Utils mores

// Main this component
const ViewAddNewBillDesktop = (props) => {
  const dispatch = useDispatch();
  // Variable component

  // Variable store

  // Methods

  // End methods *******************

  // Return content this component
  return (
    <FormAddNewBill/>
  )
};

export default ViewAddNewBillDesktop;
