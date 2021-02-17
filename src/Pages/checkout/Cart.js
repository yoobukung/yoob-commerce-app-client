import React from "react";
import CartTable from "../../components/tables/CartTable";

const Cart = () => {
  return (
    <div className="container">
      <h1 className="text-center mb-3">ตะกร้าสินค้า</h1>

      <CartTable />
      <div className="mt-5"></div>
    </div>
  );
};

export default Cart;
