import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

export const MyUtils = {
  /**
   * Alter notification
   */
  Alter: {
    serverError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Máy chủ đang có vấn đề',
        text: 'Bạn thử F5 tải lại trang thử xem nào, nếu không được nữa thì mong phản hồi về chúng tối để có thể sửa lỗi nó 😱🙏',
        heightAuto: false,
        footer: '<a href>Viết phản hồi lỗi</a>'
      });
    },

    /**
     * Show alert type warning
     * @param {String} title is title alter
     * @param {String} message is message notification about warning
     */
    showWarning: (title, message) => {
      Swal.fire({
        icon: 'warning',
        title: title,
        text: message,
        heightAuto: false,
      });
    },

    /**
     * Show alert type warning
     * @param {String} title is title alter
     * @param {String} message is message notification about warning
     * @param {Function} callback
     */
    showError: (title, message, callback) => {
      Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        heightAuto: false,
      }).then(() => {
        if (callback) {
          callback();
        }
      });
    },

    /**
     * Show alert type warning
     * @param {String} title is title alter
     * @param {String} message is message notification about warning
     * @param {Function} callback
     */
    showSuccess: (title, message, callback) => {
      Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        heightAuto: false,
      }).then(() => {
        if (callback) {
          callback();
        }
      });
    },

    showAsk: (title, message, confirmButtonText, callback) => {
      if (!confirmButtonText) {
        confirmButtonText = 'Yes, delete it!';
      }

      Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText
      }).then((result) => {
        callback(result.isConfirmed)
      })
    },
  },
};
