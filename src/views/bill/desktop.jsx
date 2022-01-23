// Main import need
import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {
  setAppOpenDialogAddNew,
  setAppGridIsLoading,
  setDataBills,
} from "../../store/action";

// Component Material UI
import {
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

// PLT Solution
import GridBill from "../../components/grid/Bill";

// Utils mores
import PltLang from "../../plt_lang";
import PltCommon from "../../plt_common";
import BillRequest from "../../requests/Bill";

// Main this component
const ViewBillDesktop = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // Variable component

  // Variable store

  // Methods
  const handlerShowDialogAddNew = () => {
    history.push('/admin/hoa-don/them-moi');
  };

  const handlerRefreshData = () => {
    dispatch(setAppGridIsLoading(true));
    BillRequest.getAll().then(data => {
      dispatch(setDataBills(data));
      dispatch(setAppGridIsLoading(false));
    });
  };
  // End methods *******************

  // Return content this component
  return (
    <>
      {/* Toolbar */}
      <div className="toolbar mb-2">
        <div className="d-flex justify-content-between">
          <h4>{PltLang.getMsg('TXT_BIll')}</h4>
          <div className="text-right">
            <Button color="primary" variant="contained" aria-label="add new"
                    className=""
                    onClick={handlerShowDialogAddNew}
            >
              <AddIcon></AddIcon>
              Thêm mới
            </Button>

            <Button color="primary" variant="contained" aria-label="add new"
                    className="ml-2"
                    onClick={handlerRefreshData}
            >
              <RefreshIcon></RefreshIcon>
              Tải lại
            </Button>
          </div>
        </div>
      </div>

      <GridBill/>
    </>
  )
};

export default ViewBillDesktop ;