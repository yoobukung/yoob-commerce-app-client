import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrder } from "../../functions/GetApi";

const OrderTable = () => {
  const [state, setState] = useState({
    orders: [],
  });
  const { orders } = state;

  useEffect(async () => {
    const res = await getOrder();
    setState({ ...state, orders: res });
  }, []);

  let index = 0;

  const orderBody = () => {
    if (orders !== "ไม่พบข้อมูล") {
      orders.map((order) => {
        return (
          <tr>
            <th className="text-center">{(index += index + 1)}</th>
            <td className="text-center"> {order.orderNumber}</td>
            <td className="text-center">
              {order.checkout == false ? "ยังไม่ชำระเงิน" : "ชำระเงินแล้ว"}{" "}
            </td>
            <td className="text-center">
              {order.shippingCode == null ? "ยังไม่ส่งของ" : "ส่งของแล้ว"}{" "}
            </td>
            <td className="text-center">
              <Link
                to={`/user/DetailsOrder/${order.id}`}
                className="btn btn-outline-primary"
              >
                เพิ่มเติม
              </Link>
            </td>
          </tr>
        );
      });
    } else return <strong>ไม่พบข้อมูล</strong>;
  };

  return (
    <div className="container">
      <h3>รายการสั่งซื้อ</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="col-1 text-center">
              ลำดับที่
            </th>
            <th scope="col" className="col-3 text-center">
              รหัสรายการสั่งซื้อ
            </th>
            <th scope="col" className="col-2 text-center">
              สถานะการชำระเงิน
            </th>
            <th scope="col" className="col-2 text-center">
              สถานะการขนส่ง
            </th>

            <th scope="col" className="col-2 text-center">
              อัพเดตสถานะการขนส่ง / ดูรายละเอียด
            </th>
          </tr>
        </thead>
        <tbody>{orderBody()}</tbody>
      </table>
    </div>
  );
};

export default OrderTable;
