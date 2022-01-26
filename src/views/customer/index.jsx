import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

// Store
import { useSelector, useDispatch } from 'react-redux'
import { setDataCategorys } from "../../store/action";
import PltCommon from "../../plt_common";
import {List} from "@material-ui/core";

// Component Material UI
import ViewCustomerMobile from "./mobile";
import ViewCustomerDesktop from "./desktop";

// Component Plt Solution

// Utils others


const ViewCustomer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Variable component
  const heightAuto = PltCommon.getHeightBody() - (55 + 66);
  const [isMobile, setIsMobile] = useState(PltCommon.isMobile);

  // Variable store

  //Component return view
  return (
    <div style={{height: heightAuto}}>
      {isMobile && (
        <ViewCustomerMobile/>
      )}
      {!isMobile && (
        <ViewCustomerDesktop/>
      )}
    </div>
  )

};

export default ViewCustomer;
