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
  const [heightView, setHeightView] = useState(0);
  const [isMobile, setIsMobile] = useState(PltCommon.isMobile);

  // Variable store

  useEffect(() => {
    setHeightView(PltCommon.getHeightBody() - (55 + 66));
  }, []);

  //Component return view
  return (
    <div style={{height: heightView}}>
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
