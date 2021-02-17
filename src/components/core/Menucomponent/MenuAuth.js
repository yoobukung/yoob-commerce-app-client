import { Fragment } from "react";
import { isAuth, signoutBrowser } from "../../../functions/auth";
import { Link } from "react-router-dom";

const MenuAuth = () => {
  const handleClick = () => {
    signoutBrowser();
    window.location.reload();
  };

  return (
    <Fragment>
      {isAuth() ? (
        <Link className="btn btn-outline-primary m-4" onClick={handleClick}>
          logout
        </Link>
      ) : (
        <Fragment>
          <Link className="btn btn-outline-primary m-2 " to="/signin">
            Sign In
          </Link>
          <Link className="btn btn-outline-primary m-2" to="/signup">
            Sign Up
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MenuAuth;
