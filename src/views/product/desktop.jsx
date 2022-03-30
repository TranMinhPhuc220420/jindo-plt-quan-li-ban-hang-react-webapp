// Main import need
import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {
  setAppGridIsLoading,
  setDataProducts,
} from "../../store/action";

// Component Material UI
import {alpha, makeStyles} from '@material-ui/core/styles';
import {
  Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

// PLT Solution

// Utils mores
import PltLang from "../../plt_lang";

import ProductRequset from "../../requests/Product";
import GridProduct from "../../components/grid/Product";

const useStyles = makeStyles((theme) => ({
  // txt_search: {
  //   width: 100
  // },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Main this component
const ViewProductDesktop = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Variable component
  const classes = useStyles();
  const [categorySearch, setCategorySearch] = useState('');
  const [isSearchOverRest, setIsSearchOverRest] = useState(false);

  // Variable store
  const catgorys = useSelector(state => state.data.categorys);

  // Methods
  const handlerShowDialogAddNew = () => {
    history.push('/admin/san-pham/them-moi');
  };

  const handlerRefreshData = () => {
    dispatch(setAppGridIsLoading(true));
    ProductRequset.getAll().then(data => {
      dispatch(setDataProducts(data));
      dispatch(setAppGridIsLoading(false));
    });
  };
  // End methods *******************

  // Return content this component
  return (
    <>
      {/* Toolbar */}
      <div className="toolbar mb-2">
        <div className="d-flex">
          <h4 style={{ width: 200}}>{PltLang.getMsg('TXT_PRODUCT')}</h4>

          <div className="form-search w-100 text-left d-flex align-items-center">
            <FormControl style={{ width: 250}}>
              <InputLabel>
                {PltLang.getMsg('LABEL_INPUT_CATEGORY_PRODUCT')}
              </InputLabel>
              <Select
                  value={categorySearch}
                  onChange={(event) => {
                    setCategorySearch(event.target.value)
                  }}>
                {catgorys.map((item, index) => (
                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className="w-100 mx-3 d-flex justify-content-center">
              <FormControlLabel
                  label={PltLang.getMsg('LABEL_CHECKBOX_PRODUCT_OVER_REST')}
                  control={
                    <Checkbox checked={isSearchOverRest} color="primary" onChange={(event) => {
                      setIsSearchOverRest(event.target.checked);
                    }
                    }/>
                  }
              />
            </FormControl>
          </div>

          <div style={{ width: 400}} className="text-right">
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

      <GridProduct dataSearch={{categorySearch, isSearchOverRest}}/>
    </>
  )
};

export default ViewProductDesktop;
