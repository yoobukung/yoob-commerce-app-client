import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { getProductInCart } from "../../../functions/GetApi";

const CartItems = () => {
  const [cartItems, setCartItems] = useState(0);

  useEffect(async () => {
    const items = await getProductInCart();

    if (items !== "กรุณาเลือกสินค้าลงตะกร้าก่อน") {
      setCartItems(items.products);
    }
  }, []);

  return (
    <nav className="my-2 my-md-0 me-md-3">
      <Link className="p-2 text-dark" to="/cart">
        <ShoppingCartOutlined style={{ fontSize: "2rem", color: "#08c" }} />

        <span
          className="badge badge-warning text-dark"
          style={{
            display: cartItems.length === 0 ? "none" : cartItems.length,
            backgroundColor: "orange",
            position: "relative",
            top: "-1rem",
            fontSize: "0.9rem",
            left: "-10px",
            zIndex: "8",
            borderRadius: "50%",
          }}
        >
          {cartItems.length}
        </span>
      </Link>
    </nav>
  );
};

export default CartItems;
