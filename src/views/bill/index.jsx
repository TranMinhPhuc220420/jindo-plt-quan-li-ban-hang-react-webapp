import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

// Store
import { useSelector, useDispatch } from 'react-redux'
import PltCommon from "../../plt_common";

// Component Material UI

// Component Plt Solution
import ViewBillMobile from "./mobile";
import ViewBillDesktop from "./desktop";

// Utils others


const ViewBill = () => {
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
        <ViewBillMobile/>
      )}
      {!isMobile && (
        <ViewBillDesktop/>
      )}
    </div>
  )

};

export default ViewBill;
