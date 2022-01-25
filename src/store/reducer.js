import * as actions from './actionType';

const STATE = {
  access_token: null,
  user: null,
  ui: {
    open_nav_left: false,
    load_mark: true
  },
  app: {
    view_active: {
      name: 'Trang chủ',
      pathname: '/admin/trang-chu',
      icon: 'home'
    },
    open_dialog_add_new: false,
    open_dialog_edit: {
      is_show: false,
      dataEdit: null
    },
    open_dialog_detail: {
      is_show: false,
      dataDetail: null
    },
    open_dialog_delete: {
      is_show: false,
      dataDelete: null
    },
    snack_bar: {
      open: false,
      text: '',
      color: ''
    },
    key_search: '',
    grid_is_loading: false
  },
  data: {
    categorys: [],
    products: [],
    customers: [],
    bills: [],
    insurances: []
  }
};

const reducer = (state = STATE, action) => {
  const stateNew = {...state};
  const {type, payload} = action;

  switch (type) {
    // UI
    case actions.SET_UI_OPEN_NAV_LEFT:
      stateNew.ui.open_nav_left = payload;
      break;
    case actions.SET_UI_LOAD_MARK:
      stateNew.ui.load_mark = payload;
      break;

    // App
    case actions.SET_APP_VIEW_ACTIVE:
      stateNew.app.view_active = payload;
      break;
    case actions.SET_APP_OPEN_DIALOG_ADD_NEW:
      stateNew.app.open_dialog_add_new = payload;
      break;
    case actions.SET_APP_OPEN_DIALOG_EDIT:
      stateNew.app.open_dialog_edit = payload;
      break;
    case actions.SET_APP_OPEN_DIALOG_DETAIL:
      stateNew.app.open_dialog_detail = payload;
      break;
    case actions.SET_APP_SNACK_BAR:
      stateNew.app.snack_bar = payload;
      break;
    case actions.SET_APP_KEY_SEARCH_ITEM_LIST:
      stateNew.app.key_search = payload;
      break;
    case actions.SET_APP_GRID_IS_LOADING:
      stateNew.app.grid_is_loading = payload;
      break;
    
    // Data
    case actions.SET_DATA_USER_LOGIN:
      stateNew.user = payload;
      break;
    case actions.SET_DATA_ACCESS_TOKEN:
      stateNew.access_token = payload;
      break;
    case actions.SET_DATA_CATEGORYS:
      stateNew.data.categorys = payload;
      break;
    case actions.SET_DATA_PRODUCT:
      stateNew.data.products = payload;
      break;
    case actions.SET_DATA_CUSTOMERS:
      stateNew.data.customers = payload;
      break;
    case actions.SET_DATA_BILLS:
      stateNew.data.bills = payload;
      break;
    case actions.SET_DATA_INSURANCESS:
      stateNew.data.insurances = payload;
      break;


    default:
      console.log('Action not define');
      break;
  }

  return stateNew;
};

export default reducer;
