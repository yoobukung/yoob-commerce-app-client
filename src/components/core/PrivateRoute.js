import { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../../functions/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  <Route {...rest} />;

  const PrivateRoute = (props) => {
    if (isAuth()) return <Component {...props} />;
    else
      return (
        <Redirect
          to={{ pathname: "/tologin", state: { from: props.location } }}
        />
      );
  };

  return (
    <Fragment>
      <PrivateRoute />
    </Fragment>
  );
};

export default PrivateRoute;
