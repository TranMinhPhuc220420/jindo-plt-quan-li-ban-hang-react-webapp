import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

// Store
import { useSelector, useDispatch } from 'react-redux'
import PltCommon from "../../plt_common";

// Component Material UI

// Component Plt Solution
import FormEditProfile from "../../components/form/EditProfile";

// Utils others


const ViewProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Variable component
  const heightAuto = PltCommon.getHeightBody() - (55 + 66);
  const [isMobile, setIsMobile] = useState(PltCommon.isMobile);

  // Variable store

  //Component return view
  return (
    <div className={'container'} style={{height: heightAuto}}>
      <FormEditProfile/>
    </div>
  )

};

export default ViewProfile;
