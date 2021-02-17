import { Route, Switch } from "react-router-dom";

import Home from "./components/core/Home";
import Menu from "./components/core/Menu";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Categories from "./Pages/catergory/Categories";
import CreateCategory from "./Pages/catergory/CreateCategory";
import EditCategory from "./Pages/catergory/EditCategory";
import Cart from "./Pages/checkout/Cart";
import CheckOut from "./Pages/checkout/CheckOut";
import CreateProduct from "./Pages/products/CreateProduct";
import EditProduct from "./Pages/products/EditProduct";
import Products from "./Pages/products/Products";
import User from "./Pages/user/User";
import Notfound from "./Pages/Notfound";
import PrivateRoute from "./components/core/PrivateRoute";
import GotoLogin from "./components/cards/GotoLogin";
import DetailsUser from "./components/details/DetailsUser";
import DetailsOrder from "./components/details/DetailsOrder";
import CheckReview from "./Pages/checkout/CheckReview";
import OrderTable from "./components/tables/OrderTable";
import DetailsPayments from "./components/details/DetailsPayments";
import Shipping from "./Pages/checkout/Shipping";
import MenuFooter from "./components/core/MenuFooter";
import MyproductDashboard from "./components/dashboard/MyproductDashboard";
import "./style/base.css";
import AdminRouter from "./components/core/AdminRouter";
import FormAddress from "./components/forms/FormAddress";

const MainRouter = () => {
  return (
    <>
      <Menu />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/signup" component={Register} />
          <AdminRouter exact path="/categories" component={Categories} />
          <AdminRouter
            exact
            path="/categories/:categoryId/create"
            component={CreateCategory}
          />
          <AdminRouter
            exact
            path="/categories/:categoryId/edit"
            component={EditCategory}
          />

          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/address/add" component={FormAddress} />
          <PrivateRoute exact path="/checkout" component={CheckOut} />
          <PrivateRoute exact path="/checkout/review" component={CheckReview} />
          <Route exact path="/products/:prodName" component={Products} />

          <PrivateRoute
            exact
            path="/product/create"
            component={CreateProduct}
          />
          <PrivateRoute
            exact
            path="/product/edit/:productId"
            component={EditProduct}
          />
          <PrivateRoute exact path="/user" component={User} />
          <PrivateRoute
            exact
            path="/user/myproduct"
            component={MyproductDashboard}
          />

          <PrivateRoute exact path="/user/delivery" component={OrderTable} />
          <PrivateRoute
            exact
            path="/user/DetailsOrder/:orderid"
            component={DetailsOrder}
          />

          <PrivateRoute
            exact
            path="/user/mypayment"
            component={DetailsPayments}
          />

          <PrivateRoute exact path="/shipping" component={Shipping} />

          <Route exact path="/tologin" component={GotoLogin} />
          <Route exact path="*" component={Notfound} />
        </Switch>
      </main>
      <MenuFooter />
    </>
  );
};

export default MainRouter;
