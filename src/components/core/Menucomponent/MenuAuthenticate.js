import { Fragment } from "react";
import { isAuth, isAdmin } from "../../../functions/auth";
import { Link } from "react-router-dom";

const MenuAuthenticate = () => {
  const MenuAuth = () => {
    if (isAuth()) {
      return (
        <Fragment>
          <Link className="p-2 text-dark" to="/user">
            Profile
          </Link>
          <Link className="p-2 text-dark" to="/user/mypayment">
            แจ้งการชำระเงิน
          </Link>
          <Link className="p-2 text-dark" to="/user/delivery">
            รายการสั่งซื้อ
          </Link>
          <Link className="p-2 text-dark" to="/user/myproduct">
            สินค้าที่คุณขาย
          </Link>
          <Link className="p-2 text-dark" to="/shipping">
            สินค้าที่ต้องส่ง
          </Link>
          {isAdmin() === "admin" ? (
            <Link className="p-2 text-dark" to="/categories">
              Categories
            </Link>
          ) : (
            ""
          )}
        </Fragment>
      );
    } else {
      return "";
    }
  };
  return <Fragment>{MenuAuth()}</Fragment>;
};

export default MenuAuthenticate;
