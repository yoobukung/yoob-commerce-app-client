import { useEffect, useState, Fragment } from "react";
import {
  getOrderForShipping,
  getAddressById,
  getPaymentByOrderNumber,
} from "../../functions/GetApi";
import axios from "axios";
import { isAuth } from "../../functions/auth";

const Shipping = () => {
  const [state, setState] = useState({
    orderItems: [],
    shippingCode: "",
    orderNumber: "",
    address: [],
    details: [],
  });

  let index = 0;

  const { orderNumber, orderItems, shippingCode, details, address } = state;

  useEffect(async () => {
    const res = await getOrderForShipping();
    console.log(res);
    setState({ ...state, orderItems: res, shippingCode: "" });
  }, []);

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/order/update/shipping`,
        {
          orderNumber,
          shippingCode,
        },
        {
          headers: {
            Authorization: `Bearer ${isAuth()}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (id, number) => async () => {
    try {
      const res = await getAddressById(id);
      const payment = await getPaymentByOrderNumber(number);
      setState({
        ...state,
        address: res,
        orderNumber: number,
        details: payment,
      });
      console.log(payment);
    } catch (error) {
      console.log(error);
    }
  };

  const bodyorderItems = () => {
    if (orderItems !== "ไม่พบข้อมูล") {
      return orderItems.map((order) => {
        return order.products.map((prod) => {
          return (
            <Fragment key={prod.id}>
              <tr>
                <th scope="row" className="text-center">
                  {(index += 1)}
                </th>
                <td className="text-start ps-4">{order.orderNumber} </td>
                <td className="text-start ps-4">{prod.name} </td>
                <td className="text-center">
                  {prod.orderItem.quantity.toLocaleString()} ชิ้น
                </td>
                <td className="text-center ">
                  {prod.orderItem.codeShipping !== ""
                    ? prod.orderItem.codeShipping
                    : "ยังไม่ส่งสินค้า"}
                </td>
                <td className="text-center ">
                  <p
                    onClick={handleView(order.id, order.orderNumber)}
                    className="btn btn-sm btn-warning"
                  >
                    View
                  </p>
                </td>
              </tr>
            </Fragment>
          );
        });
      });
    } else return <strong>ไม่พบข้อมูล</strong>;
  };

  return (
    <div className="container">
      <h1>หน้าต่างสำหรับการส่งของ</h1>

      <form onSubmit={handleSubmit}>
        <label>ใส่เลขที่ใบสั่งซื้อ</label>
        <input
          type="text"
          className="m-3"
          required
          onChange={handleChange("orderNumber")}
          value={orderNumber}
        />
        <label>ใส่รหัสการขนส่ง</label>
        <input
          type="text"
          className="mt-3 ms-3"
          required
          onChange={handleChange("shippingCode")}
          value={shippingCode}
        />
        <button className="btn-sm mt-2 ms-2 btn-outline-primary">
          บันทึกรหัสการขนส่ง
        </button>
      </form>

      <div className="row my-4">
        <div className="col">
          ที่อยู่สำหรับจัดส่ง
          <p>
            {address.name} {address.address} {address.telephon}
          </p>
        </div>
        <div className="col">
          <p>การชำระเงิน</p>
          <p>
            {details.methodCheckout} <br />
            จำนวน {details.amountPrice} บาท วันที่ {details.datePayment}
          </p>
        </div>
      </div>

      <table className="table table-striped table-hover mt-4 ">
        <thead>
          <tr className="text-center">
            <th scope="col-2">ลำดับที่</th>
            <th scope="col-5">เลขที่ใบสั่งซื้อ</th>
            <th scope="col-5">ชื่อสินค้า</th>
            <th scope="col-3">จำนวนที่ต้องส่ง</th>
            <th scope="col-2">รหัสส่งสินค้า</th>
            <th scope="col-2">ดูรายละเอียด</th>
          </tr>
        </thead>
        <tbody>{bodyorderItems()}</tbody>
      </table>
    </div>
  );
};

export default Shipping;
