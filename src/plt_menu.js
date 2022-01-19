const PltMenu = {
  menu: [
    {
      name: 'Trang Chủ',
      pathname: '/admin/trang-chu',
      icon: 'home',
    },
    {
      name: 'Loại sản phẩm',
      pathname: '/admin/loai-san-pham',
      icon: 'category',
    },
    {
      name: 'Sản phẩm',
      pathname: '/admin/san-pham',
      icon: 'inventory_2',
    },
    {
      name: 'Hoá đơn',
      pathname: '/admin/hoa-don',
      icon: 'receipt_long',
    },
    {
      name: 'Phiếu bảo hành',
      pathname: '/admin/phieu-bao-hanh',
      icon: 'settings_accessibility',
    },
    {
      name: 'Khách hàng',
      pathname: '/admin/khach-hang',
      icon: 'group',
    },
  ],

  getMenu: () => {
    return PltMenu.menu;
  }
};

export default PltMenu;