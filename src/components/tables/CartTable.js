import React, { Fragment, useEffect, useState } from "react";
import { getProductInCart } from "../../functions/GetApi";
import { Link } from "react-router-dom";
import axios from "axios";
import { isAuth } from "../../functions/auth";

const CartTable = () => {
  const [state, setState] = useState({
    productInCart: [],
    quantity: null,
    Cart: null,
  });

  const { productInCart, quantity, Cart } = state;

  useEffect(async () => {
    const res = await getProductInCart();

    if (res !== "กรุณาเลือกสินค้าลงตะกร้าก่อน") {
      setState({ ...state, productInCart: res.products, Cart: res.id });
    }
  }, []);
  let index = 0;

  const hanldeDelete = (productId, cartId, productname) => async (e) => {
    if (window.confirm(`คุณต้องการลบข้อมูลสินค้า "${productname}" ใช่ไหม `)) {
      try {
        await axios.delete(`${process.env.REACT_APP_SERVER_API}/cart/delete`, {
          headers: {
            Authorization: `Bearer ${isAuth()}`,
          },
          data: {
            cartId,
            productId,
          },
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const bodyCartItems = productInCart.map((prod) => {
    return (
      <Fragment key={prod.id}>
        <tr>
          <th scope="row" className="text-center">
            {(index += 1)}
          </th>
          <td>{prod.name} </td>
          <td className="text-end">{prod.price.toLocaleString()} บาท</td>
          <td className="text-end">
            {prod.cartItem.quantity.toLocaleString()}
          </td>
          <td className="text-end">
            {(prod.cartItem.quantity * prod.price).toLocaleString()} บาท
          </td>
          <td className="text-center">
            <Link to={`/products/${prod.name}`} className="btn ">
              <p className="btn btn-outline-info">ดูสินค้าที่ซื้อ</p>
            </Link>
          </td>
          <td
            className="text-center"
            onClick={hanldeDelete(prod.id, Cart, prod.name)}
          >
            <p className="btn btn-danger">ลบ</p>
          </td>
        </tr>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <Link to="/checkout" className="btn btn-success ms-3">
        ชำระค่าสินค้า
      </Link>
      <table className="table table-hover mt-4 ">
        <thead>
          <tr className="text-center">
            <th scope="col-1">ลำดับที่</th>
            <th scope="col-3">ชื่อสินค้า</th>
            <th scope="col-2">ราคา</th>
            <th scope="col-2">จำนวนที่ซื้อ</th>
            <th scope="col-2">รวมเป็นเงิน</th>
            <th scope="col-1">ดูสินค้า</th>
            <th scope="col-1">นำออก</th>
          </tr>
        </thead>
        <tbody>{bodyCartItems}</tbody>
      </table>
    </Fragment>
  );
};

export default CartTable;
