// Main import need
import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {
  setAppGridIsLoading,
  setDataInsurances,
} from "../../store/action";

// Component Material UI
import {
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

// PLT Solution

// Utils mores
import PltLang from "../../plt_lang";
import PltCommon from "../../plt_common";

import InsurancesRequest from "../../requests/Insurances";
import GridInsurance from "../../components/grid/Insurance";
import DialogContainerDetail from "../../components/dialog/ContainerDetail";
import PanelDetailInsurances from "../../components/panel/DetailInsurances";

// Main this component
const ViewInsurancesDesktop = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // Variable component

  // Variable store
  const openDialogDetail = useSelector(state => state.app.open_dialog_detail);

  // Methods
  const handlerShowDialogAddNew = () => {
    history.push('/admin/san-pham/them-moi');
  };

  const handlerRefreshData = () => {
    dispatch(setAppGridIsLoading(true));
    InsurancesRequest.getAll().then(data => {
      dispatch(setDataInsurances(data));
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
          <h4>{PltLang.getMsg('TXT_PRODUCT')}</h4>
          <div className="text-right">
            {/*<Button color="primary" variant="contained" aria-label="add new"*/}
            {/*        className=""*/}
            {/*        onClick={handlerShowDialogAddNew}*/}
            {/*>*/}
            {/*  <AddIcon></AddIcon>*/}
            {/*  Thêm mới*/}
            {/*</Button>*/}

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

      <GridInsurance/>

      {openDialogDetail.is_show && (
        <DialogContainerDetail fullScreen={false} open={openDialogDetail.is_show} title={PltLang.getMsg('TITLE_DIALOG_DETAIL')}>
          <PanelDetailInsurances dataDetail={openDialogDetail.dataDetail}/>
        </DialogContainerDetail>
      )}
    </>
  )
};

export default ViewInsurancesDesktop;
