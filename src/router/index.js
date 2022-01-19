import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

// Views
import ViewLogin from "../views/login";
import ViewHome from "../views/home";
import ViewCategory from "../views/category";
import ViewProduct from "../views/product";
import ViewCustomer from "../views/customer";
import ViewBill from "../views/bill";
import ViewInsurances from "../views/insurances";
import ViewAddNewProductDesktop from "../views/product/addNewDesktop";
import ViewEditProductDesktop from "../views/product/editDesktop";

const RouterMain = () => {
  const user = useSelector(((state) => state.user));

  return (
    <Switch>
      <Route path="/admin/dang-nhap" component={ViewLogin} exact/>

      {user!=null && (
        <>
          <Route path="/admin/trang-chu" component={ViewHome} exact/>
          <Route path="/admin/loai-san-pham" component={ViewCategory} exact/>
          <Route path="/admin/san-pham" component={ViewProduct} exact/>
          <Route path="/admin/san-pham/them-moi" component={ViewAddNewProductDesktop} exact/>
          <Route path="/admin/san-pham/chinh-sua/:idEdit" component={ViewEditProductDesktop} exact/>
          <Route path="/admin/khach-hang" component={ViewCustomer} exact/>
          <Route path="/admin/hoa-don" component={ViewBill} exact/>
          <Route path="/admin/phieu-bao-hanh" component={ViewInsurances} exact/>
        </>
      )}
    </Switch>
  )
};

export default RouterMain;
