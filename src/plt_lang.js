const PltLang = {
  locale: 'vi',

  'vi': {
    TXT_TITLE_LOGIN_SUCCESS: 'Đăng nhập thành công',
    TXT_DESCRIPTION_LOGIN_SUCCESS: 'Chào Admin, bắt đầu quản lý dữ liệu của mình nào! 😎',
    TXT_TITLE_LOGIN_FAIL: 'Đăng nhập không thành công',
    TXT_DESCRIPTION_LOGIN_FAIL: 'Bạn thử đăng nhập lại xem sao, nếu không được vui lòng liên hệ với quản trị viên',
    TXT_BTN_LOGIN: 'Đăng nhập',
    TXT_BTN_ADD_NEW: 'Thêm mới',
    TXT_BTN_UPDATE: 'Cập nhật',
    TXT_BTN_DELETE: 'Xoá',
    TXT_BTN_PRINT: 'In',
    TXT_BTN_PRINT_BILL: 'In hoá đơn',
    TXT_BTN_ADD_PRODUCT: 'Thêm sản phẩm',
    TXT_TITLE_CARD_LOGIN: 'PLT Solution - Đăng nhập',
    TITLE_DIALOG_ADD_NEW: 'Thêm dữ liệu mới',
    TITLE_VALIDATE_FORM_FAIL: 'Form dữ liệu không đúng',
    TXT_DESCRIPTION_VALIDATE_FORM_FAIL: 'Form nhập liệu không đúng, vui lòng nhập lại theo hướng dẫn',
    TXT_UPLOADING_DATA: 'Đang tải lên...',
    TXT_CREATE_NEW_SUCCESS: 'Tạo mới thành công',
    TXT_CREATE_NEW_FAILD: 'Tạo mới không thành công',
    TXT_UPDATE_SUCCESS: 'Cập nhật thành công',
    TXT_UPDATE_FAILD: 'Cập nhật không thành công',
    TXT_DELETE_SUCCESS: 'Xoá thành công',
    TXT_DELETE_FAILD: 'Xoá không thành công',
    TITLE_DIALOG_UPDATE: 'Cập nhật dữ liệu',
    TITLE_DIALOG_DETAIL: 'Xem chi tiết dữ liệu',
    TITLE_ASK_CONFIRM_DELETE_FATHER: 'Bạn có chắc muốn xoá không?',
    TXT_BTN_CONFIRM_DELETE: 'Ok, xoá nó đi',
    TXT_DESCRIPTION_ASK_CONFIRM_DELETE_FATHER: 'Đây là dữ liệu cha của dữ liệu khác. Khi bạn xoá dữ liệu này, thì các dữ liệu con thuộc dữ liệu này cũng sẽ xoá theo',
    TXT_DESCRIPTION_ASK_CONFIRM_DELETE_BILL: 'Khi bạn xoá. Nếu hoá đơn có các Phiếu bảo hành, chúng cũng sẽ được xoá đi cùng với hoá đơn',
    TXT_CUSTOMER: 'Khách hàng',
    TXT_PRODUCT: 'Sản phẩm',
    TXT_CATEGORY: 'Loại sản phẩm',
    TXT_NOT_USE: 'Không dùng',
    TITLE_DIALOG_LIST_PRODUCT: 'Chọn sản phẩm',
    TXT_RESULT: 'Kết quả',
    TXT_BIll: 'Hoá đơn',
    TXT_PREVIEW_BILL: 'Tóm tắc thanh toán',
    LABEL_INPUT_USERNAME: 'Tên đăng nhập',
    LABEL_INPUT_PASSWORD: 'Mật khẩu',
    LABEL_INPUT_ID: '#ID',
    LABEL_INPUT_NAME_CATEGORY: 'Tên loại sản phẩm',
    LABEL_INPUT_NAME_PRODUCT: 'Tên sản phẩm',
    LABEL_INPUT_CATEGORY_PRODUCT: 'Loại cho sản phẩm',
    LABEL_INPUT_REST_PRODUCT: 'Lượng sản phẩm còn trong kho',
    LABEL_INPUT_PRICE_PRODUCT: 'Giá sản phẩm bán',
    LABEL_INPUT_IMAGE_PRODUCT: 'Hình mô tả sản phẩm',
    LABEL_INPUT_NAME_CUSTOMER: 'Tên khách hàng',
    LABEL_INPUT_PHONE: 'Số điện thoại',
    TXT_COUNT_PRICE_BILL: 'Giá tiền',
    TXT_COUNT_PRICE_DISCOUNT_BILL: 'Giảm',
    TXT_COUNT_PRICE_PAY_BILL: 'Tổng thanh toán',
    TXT_COUNT_PRODUCT_HAS_INSURANCES: 'Tổng sản phẩm được bảo hành',
    TXT_DATA_EMPTY: 'Dữ liệu trống',
    TXT_COUNT_PRODUCT_BILL: 'Tổng sản phẩm',
    LABEL_INPUT_PHONE_CUSTOMER: 'Số điện thoại khách hàng',
    LABEL_CHECKBOX_HAS_CUSTOMER_IN_DATA: 'Đã có dữ liệu khách hàng',
    LABEL_INPUT_DISCOUNT: 'Giá giảm',
    LABEL_INPUT_DATE_SELL: 'Ngày bán',
    LABEL_INPUT_TIME_SELL: 'Giờ bán',
    LABEL_CHECKBOX_HAS_INSURANCES: 'Có bảo hành',
    LABEL_INPUT_TO_DATE_INSURANCES: 'Số tháng bảo hàng',
    LABEL_INPUT_NOTE: 'Ghi chú',
    LABEL_INPUT_PASSWORD_NEW: 'Mật khẩu mới',
    LABEL_INPUT_PASSWORD_CONFIRM: 'Nhập lại mật khẩu mới',
  },

  /**
   * Get message with locale
   * @param {String} key_msg a key get message
   * @returns {String} a message get by key message
   */
  getMsg: (key_msg) => {
    let msgReturn = PltLang[PltLang.locale][key_msg];

    if (typeof msgReturn == 'undefined') {
      return key_msg;
    } else {
      return msgReturn;
    }
  }
};

export default PltLang;
