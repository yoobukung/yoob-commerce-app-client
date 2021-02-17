import { useEffect, useState, Fragment } from "react";
import { getOrderDetails } from "../../../functions/GetApi";
import { useLocation } from "react-router-dom";

const OrderItmesTable = () => {
  let location = useLocation();

  const [state, setState] = useState({
    headOrders: [],
    products: [],
    shippingCode: "",
    address: "",
  });

  const { headOrders, shippingCode, products, address } = state;

  const getLastPathname = location.pathname.split("/");

  useEffect(async () => {
    const iorder = await getOrderDetails(getLastPathname[3]);
    setState({
      ...state,
      headOrders: iorder.order,
      products: iorder.order.products,
      address: iorder.address,
    });
  }, []);

  let index = 0;

  const bodyOrderItems = products.map((product) => {
    return (
      <Fragment key={product.id}>
        <tr key={product.id}>
          <th scope="row" className="text-center">
            {(index += 1)}
          </th>
          <td className="text-center"> {product.name} </td>
          <td className="text-end pe-4">
            {" "}
            {product.price.toLocaleString()} บาท
          </td>
          <td className="text-end pe-4">
            {" "}
            {product.orderItem.quantity.toLocaleString()} หน่วย
          </td>
          <td className="text-end pe-4">
            {" "}
            {(product.price * product.orderItem.quantity).toLocaleString()} บาท
          </td>
          <td className="text-end pe-4">
            {product.orderItem.codeShipping === ""
              ? "ยังไม่ส่งสินค้า"
              : product.orderItem.codeShipping}
          </td>
        </tr>
      </Fragment>
    );
  });

  return (
    <table className="table mt-3">
      <thead>
        <tr>
          <th scope="col" className="col-1 text-center">
            ลำดับที่
          </th>
          <th scope="col" className="col-3 text-center">
            ชื่อสินค้า
          </th>
          <th scope="col" className="col-2 text-center ">
            ราคา
          </th>
          <th scope="col" className="col-2 text-center">
            จำนวนสินค้า
          </th>
          <th scope="col" className="col-2 text-center">
            ยอดรวม
          </th>
          <th scope="col" className="col-2 text-center">
            สถานะการขนส่ง
          </th>
        </tr>
        {bodyOrderItems}
      </thead>
    </table>
  );
};

export default OrderItmesTable;
