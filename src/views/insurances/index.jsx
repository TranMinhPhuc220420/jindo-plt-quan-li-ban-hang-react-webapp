import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

// Store
import { useSelector, useDispatch } from 'react-redux'
import { setDataCategorys } from "../../store/action";
import PltCommon from "../../plt_common";
import ViewInsurancesMobile from "./mobile";
import {List} from "@material-ui/core";

// Component Material UI

// Component Plt Solution

// Utils others


const ViewInsurances = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Variable component
  const heightAuto = PltCommon.getHeightBody() - (55 + 66);
  const [isMobile, setIsMobile] = useState(PltCommon.isMobile);

  // Variable store

  //Component return view
  return (
    <div className={'container'} style={{height: heightAuto}}>
      {isMobile && (
        <ViewInsurancesMobile/>
      )}
    </div>
  )

};

export default ViewInsurances;
