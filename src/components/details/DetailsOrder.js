import { useEffect, useState } from "react";
import { getOrderDetails } from "../../functions/GetApi";
import { useLocation, Redirect } from "react-router-dom";
import OrderItmesTable from "./Table/OrderItmesTable";

const DetailsOrder = () => {
  let location = useLocation();

  const [state, setState] = useState({
    headOrders: [],
    address: "",
    referDirect: false,
  });

  const { headOrders, address, referDirect } = state;

  const getLastPathname = location.pathname.split("/");

  useEffect(async () => {
    const iorder = await getOrderDetails(getLastPathname[3]);
    setState({
      ...state,
      headOrders: iorder.order,
      address: iorder.address,
    });
    console.log(headOrders);
    if (headOrders === []) {
      setState({ ...state, referDirect: true });
    }
  }, []);

  if (referDirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container">
        <h3 className="mb-3">รายการสั่งซื้อ</h3>
        <p className="mb-3">เลขที่รายการสั่งซื้อ : {headOrders.orderNumber}</p>

        <OrderItmesTable />

        <h5 className="mt-5 mb-3">สถานะการชำระเงิน</h5>
        <strong>
          {headOrders.checkout === false ? "ยังไม่ชำระเงิน" : "ชำระเงินแล้ว"}{" "}
        </strong>
        <p>วิธีการชำระเงิน : {headOrders.methodCheckout}</p>
        <h5 className="mt-4">สถานะการขนส่งทั้งหมด </h5>
        <p>
          {headOrders.shippingCode == null
            ? "ยังไม่ส่งของ"
            : `ส่งของแล้วเลขที่ : ${headOrders.shippingCode}`}
        </p>
        <h4 className="mt-5">ส่งไปที่</h4>
        <p>
          ชื่อผู้รับ : {address.name} <br />
          ที่อยู่ {address.address} <br />
          เบอร์โทรติดต่อ : {address.telephon}
        </p>
        <p></p>
        <p></p>
      </div>
    );
  }
};

export default DetailsOrder;
