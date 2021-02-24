import { useState } from "react";
import { DatePicker, Space, TimePicker, Select } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { Redirect } from "react-router-dom";
import { isAuth } from "../../functions/auth";

const DetailsPayments = () => {
  // เมื่อตรวจสอบแล้วให้ขึ้นสถานะว่าตรวจสอบแล้ว
  // สินค้าจะลดลงเมื่อผู้ขายทำการส่งโค้ดการขนส่ง
  const [state, setState] = useState({
    ordernumber: "",
    chanelPayment: "",
    dateinput: "",
    time: "",
    price: null,
    error: "",
    referDirect: false,
  });

  const {
    ordernumber,
    dateinput,
    time,
    error,
    chanelPayment,
    price,
    referDirect,
  } = state;
  const { Option } = Select;

  const onChangeDate = (name) => (date, dateString) => {
    setState({ ...state, [name]: dateString });
  };

  const handleMethod = (e) => {
    const value = e.currentTarget.value;
    setState({ ...state, chanelPayment: value });
  };

  const ChangeOther = (name) => (e) => {
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const submitPayment = async (e) => {
    e.preventDefault();
    try {
      // console.log({ ...state });
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/payment/add`,
        {
          orderNumber: ordernumber,
          methodCheckout: chanelPayment,
          datePayment: `${dateinput} and time ${time}`,
          amountPrice: price,
        },
        {
          headers: {
            Authorization: `Bearer ${isAuth()}`,
          },
        }
      );
      setState({ ...state, referDirect: true });
    } catch (error) {
      console.log(error);
    }
  };

  if (referDirect) {
    return <Redirect to="/user/delivery" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col">
          <h3>แจ้งโอนเงินผ่านธนาคาร </h3>

          <form className="form mb-4" onSubmit={submitPayment}>
            <label className="mt-5">เลขที่ใบสั่งซื้อ</label>
            <input
              type="text"
              placeholder="เลขที่ใบสั่งซื้อ"
              className="form-control mt-2 mb-4"
              value={ordernumber}
              onChange={ChangeOther("ordernumber")}
            />
            <label>จำนวนเงินที่โอน</label>
            <input
              type="number"
              placeholder="ใส่จำนวนเงิน"
              className="form-control mb-4"
              value={price}
              onChange={ChangeOther("price")}
            />
            <label className="form-label mb-4">
              ช่องทางการโอน &nbsp; &nbsp; &nbsp; &nbsp;
            </label>

            <Space direction="vertical" className="mb-3">
              <label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="chanelpayment"
                  value="ธนาคารไทยพาณิชย์ สาขา เลขที่บัญชี ..."
                  onChange={handleMethod}
                />
                &nbsp; &nbsp; ธนาคารไทยพาณิชย์ สาขา เลขที่บัญชี ...
              </label>

              <label>
                <input
                  class="form-check-input"
                  type="radio"
                  name="chanelpayment"
                  value="promppay ชื่อบัญชี ..."
                  onChange={handleMethod}
                />
                &nbsp; &nbsp; promppay ชื่อบัญชี ...
              </label>
            </Space>

            <br />
            <label className="mt-4">
              เลือกวัน เวลาที่โอนเงิน &nbsp; &nbsp;
            </label>

            <Space direction="horizantal" className="mb-3">
              <DatePicker onChange={onChangeDate("dateinput")} />
              <TimePicker onChange={onChangeDate("time")} />
            </Space>
            <br />
            <input type="hidden" className="form-control mt-4 mb-4" />

            <button className="btn btn-primary mt-4">บันทึกการโอนเงิน</button>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default DetailsPayments;
