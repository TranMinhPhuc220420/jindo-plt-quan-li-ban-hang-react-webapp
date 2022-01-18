import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

const ViewHome = () => {
  //Variable
  const dispatch = useDispatch();
  const history = useHistory();

  //Component return view
  return (
    <div className={'container'}>
      <h1>View Home</h1>
    </div>
  )

};

export default ViewHome;
