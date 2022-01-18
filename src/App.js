import React, { useState, useEffect } from "react";
import { BrowserRouter as Router  } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

// Style
import './assets/scss/app.scss';

// Components
import RouterMain from "./router";
import MyLayout from "./layouts";

const App = (props) => {
  //Variable
  const dispatch = useDispatch();

  return (
    <Router>
      <MyLayout>
        <RouterMain />
      </MyLayout>
    </Router>
  )
};

export default App;
