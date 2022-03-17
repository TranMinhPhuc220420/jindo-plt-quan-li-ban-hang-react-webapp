import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

// Store
import { useSelector, useDispatch } from 'react-redux'
import PltCommon from "../../plt_common";
import ViewProductMobile from "./mobile";
import ViewProductDesktop from "./desktop";

// Component Material UI

// Component Plt Solution

// Utils others


const ViewProduct = () => {
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
        <ViewProductMobile/>
      )}
      {!isMobile && (
        <ViewProductDesktop/>
      )}
    </div>
  )

};

export default ViewProduct;
