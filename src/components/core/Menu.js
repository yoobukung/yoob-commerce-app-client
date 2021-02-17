import { Link } from "react-router-dom";
import SearchProduct from "./Menucomponent/SearchProduct";
import CartItems from "./Menucomponent/CartItems";
import MenuAuthenticate from "./Menucomponent/MenuAuthenticate";
import MenuAuth from "./Menucomponent/MenuAuth";

const Menu = () => {
  return (
    <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm ">
      <Link className="h5 me-3 fw-normal text-dark" to="/">
        <p className="h5 my-0 me-md-auto fw-normal text-dark">E-commerce App</p>
      </Link>
      <label className=" my-0  fw-normal">ค้นหาสินค้า </label>
      &nbsp; &nbsp;
      <SearchProduct />
      <MenuAuthenticate />
      <CartItems />
      <MenuAuth />
    </header>
  );
};

export default Menu;
