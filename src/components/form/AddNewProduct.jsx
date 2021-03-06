// Main import need
import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';

// Store redux
import {useSelector, useDispatch} from 'react-redux';
import {setAppOpenDialogAddNew, setAppSnackBar, setDataCategorys, setDataProducts} from "../../store/action";

// Component Material UI
import {
  Button,
  FormControl, TextField, Select, MenuItem, InputLabel, FilledInput,
  Card, CardContent, CardActions,
  Divider
} from '@material-ui/core';

// PLT Solution

// Utils mores
import PltLang from "../../plt_lang";
import PltCommon from "../../plt_common";
import ProductRequest from "../../requests/Product";
import {MyUtils} from "../../utils";

// Main this component
const FormAddNewProduct = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Variable store
  const catgorys = useSelector(state => state.data.categorys);
  const [isMobile, setIsMobile] = useState(PltCommon.isMobile);

  // Variable component
  const [name, setName] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [rest, setRest] = useState('');
  const [price, setPrice] = useState('');
  const [image_file, setImageFile] = useState({file: '', url_temp: ''});
  const heightAuto = PltCommon.getHeightBody() - (64);

  // Methods
  const validateAndGetFormData = () => {
    if (PltCommon.isStrEmpty(name)) {
      return false;
    }
    if (PltCommon.isStrEmpty(category_id)) {
      return false;
    }
    if (PltCommon.isStrEmpty(rest)) {
      return false;
    }
    if (PltCommon.isStrEmpty(price)) {
      return false;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('rest', rest);
    formData.append('price', price);
    formData.append('category_id', category_id);

    if (!image_file.file || image_file.file === '') {
      // return false;
    } else {
      formData.append('image_file', image_file.file);
    }

    return formData;
  };

  const showSnack = (text, color, isShow, time) => {
    if (!time) time = 3000;
    dispatch(setAppSnackBar({open: isShow, text: text, color: color}));

    setTimeout(() => {
      dispatch(setAppSnackBar({open: false, text: '', color: ''}));
    }, time);
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const formData = validateAndGetFormData();

    if (formData === false) {
      MyUtils.Alter.showError(
        PltLang.getMsg('TITLE_VALIDATE_FORM_FAIL'),
        PltLang.getMsg('TXT_DESCRIPTION_VALIDATE_FORM_FAIL')
      );
      dispatch(setAppOpenDialogAddNew(false));
    } else {
      showSnack(PltLang.getMsg('TXT_UPLOADING_DATA'), 'text-primary', true);
      // Call request add new category
      const result = await ProductRequest.create(formData);
      showSnack('', '', false);

      if (result != null) {
        handlerAddNewSuccess();
      } else {
        handlerAddNewFail();
      }
    }
  };

  const handlerAddNewSuccess = () => {
    showSnack(PltLang.getMsg('TXT_CREATE_NEW_SUCCESS'), 'text-success', true);

    ProductRequest.getAll().then(data => {
      dispatch(setDataProducts(data));

      dispatch(setAppOpenDialogAddNew(false));

      if (!isMobile) {
        history.push('/admin/san-pham');
      }
    });
  };
  const handlerAddNewFail = () => {
    showSnack(PltLang.getMsg('TXT_CREATE_NEW_FAILD'), 'text-error', true);
    dispatch(setAppOpenDialogAddNew(false));
  };
  // End methods *******************

  // Return content this component
  return (
    <form style={isMobile ? {height: heightAuto} : {}} onSubmit={handlerSubmit}>
      <Card className={'w-100 h-100 overflow-auto'}>
        <CardContent className="">
          <FormControl className="w-100">
            <TextField label={PltLang.getMsg('LABEL_INPUT_NAME_PRODUCT')}
                       type={'text'}
                       value={name}
                       onChange={(event) => {
                         setName(event.target.value)
                       }}
            />
          </FormControl>

          <FormControl className={'w-100 mt-4'}>
            <InputLabel>
              {PltLang.getMsg('LABEL_INPUT_CATEGORY_PRODUCT')}
            </InputLabel>
            <Select
              value={category_id}
              onChange={(event) => {
                setCategoryId(event.target.value)
              }}>
              {catgorys.map((item, index) => (
                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={'w-100 mt-4'}>
            <TextField label={PltLang.getMsg('LABEL_INPUT_REST_PRODUCT')}
                       type={'number'}
                       value={rest}
                       onChange={(event) => {
                         setRest(event.target.value)
                       }}
            />
          </FormControl>

          <FormControl className={'w-100 mt-4'}>
            <TextField label={PltLang.getMsg('LABEL_INPUT_PRICE_PRODUCT')}
                       type={'number'}
                       value={price}
                       onChange={(event) => {
                         setPrice(event.target.value)
                       }}
            />
          </FormControl>

          {isMobile && (
            <FormControl className={'w-100 mt-4'}>
              {image_file.url_temp !== '' && (
                <img src={image_file.url_temp} className={'w-100'} alt=""/>
              )}
              <FilledInput label={PltLang.getMsg('LABEL_INPUT_IMAGE_PRODUCT')}
                           type={'file'}
                           accept="image/png, image/jpeg, image/bmp"
                           onChange={(event) => {
                             const files = event.target.files;

                             if (files.length > 0) {
                               const file = files[0];
                               setImageFile({
                                 file: file,
                                 url_temp: PltCommon.getFileUrlTemp(file)
                               });
                             }
                           }}
              />
            </FormControl>
          )}
          {!isMobile && (
            <div className={'row'}>
              <div className="col-md-6">
                <FormControl className={'w-100 mt-4'}>
                  <FilledInput label={PltLang.getMsg('LABEL_INPUT_IMAGE_PRODUCT')}
                               type={'file'}
                               accept="image/png, image/jpeg, image/bmp"
                               onChange={(event) => {
                                 const files = event.target.files;

                                 if (files.length > 0) {
                                   const file = files[0];
                                   setImageFile({
                                     file: file,
                                     url_temp: PltCommon.getFileUrlTemp(file)
                                   });
                                 }
                               }}
                  />
                </FormControl>
              </div>
              <div className="col-md-6">
                {image_file.url_temp !== '' && (
                  <img src={image_file.url_temp} style={{ height: 100 }} alt=""/>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <Divider/>
        <CardActions className="justify-content-end">
          <Button className={'mr-2'} type="submit" variant="contained" color="primary">
            {PltLang.getMsg('TXT_BTN_ADD_NEW')}
          </Button>
        </CardActions>
      </Card>
    </form>
  )
};

export default FormAddNewProduct;
