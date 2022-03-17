import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

// Store
import { useSelector, useDispatch } from 'react-redux'
import {  } from "../../store/action";
import PltCommon from "../../plt_common";
import ViewInsurancesMobile from "./mobile";
import ViewInsurancesDesktop from "./desktop";

// Component Material UI

// Component Plt Solution

// Utils others


const ViewInsurances = () => {
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
        <ViewInsurancesMobile/>
      )}
      {!isMobile && (
        <ViewInsurancesDesktop/>
      )}
    </div>
  )

};

export default ViewInsurances;
