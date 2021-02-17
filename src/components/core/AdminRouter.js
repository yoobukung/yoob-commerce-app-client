import { useState, useEffect, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth, isAdmin } from "../../functions/auth";

const AdminRouter = ({ component: Component, ...rest }) => {
  <Route {...rest} />;

  const AdminRouter = (props) => {
    if (isAdmin() === "admin") return <Component {...props} />;
    else
      return (
        <Redirect
          to={{ pathname: "/tologin", state: { from: props.location } }}
        />
      );
  };

  return (
    <Fragment>
      <AdminRouter />
    </Fragment>
  );
};

export default AdminRouter;
