import React, { useState } from "react";
import axios from "axios";
import { isAuth } from "../../functions/auth";
import { Redirect } from "react-router-dom";

const FormAddress = () => {
  const [state, setState] = useState({
    name: "",
    address: [],
    zone: "",
    city: "",
    telephone: "",
    redirectToReferer: false,
  });

  const [addresses, setAddresses] = useState({
    number: "",
    road: "",
    district: "",
    province: "",
  });

  const { name, address, zone, city, telephone, redirectToReferer } = state;
  const { number, road, district, province } = addresses;

  const hanldeChnage = (name) => (e) => {
    const value = e.target.value;
    setState({ ...state, [name]: value });
    setAddresses({ ...state, [name]: value });
  };

  const createAddress = async (e) => {
    e.preventDefault();
    const totalAddress = `ที่อยู่เลขที่ ${number} ถนน ${road} 
แขวง/ตำบล ${district} เขต ${city}
จังหวัด ${province}  ${zone}`;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/address/add`,
        {
          name,
          address: totalAddress,
          zone,
          city,
          telephon: telephone,
        },
        {
          headers: {
            Authorization: `Bearer ${isAuth()}`,
          },
        }
      );
      setState({ ...state, redirectToReferer: true });
    } catch (error) {
      console.log(error);
    }
  };

  if (redirectToReferer) {
    return <Redirect to="/user" />;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center my-3">สร้างที่อยู่ผู้รับ</h1>
      <form onSubmit={createAddress}>
        <div className="col-sm-6">
          <strong>ชื่อ - นามสกุล</strong>
          <input
            className="form-control"
            type="text"
            required
            onChange={hanldeChnage("name")}
            value={name}
          />
        </div>
        <div className="row g-3 mt-4">
          <div className="col-md-3 me-2">
            <strong>เลขที่</strong>
            <input
              className="form-control"
              type="text"
              onChange={hanldeChnage("number")}
              value={number}
            />
          </div>
          <div className="col-md-5">
            <strong>ถนน</strong>
            <input
              className="form-control"
              type="text"
              required
              onChange={hanldeChnage("road")}
              value={road}
            />
          </div>
          <div className="col-md-3">
            <strong>แขวง/ตำบล</strong>
            <input
              className="form-control"
              type="text"
              onChange={hanldeChnage("district")}
              value={district}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-3 me-2 mt-2">
            <strong>เขต/อำเภอ</strong>
            <input
              className="form-control"
              type="text"
              required
              onChange={hanldeChnage("city")}
              value={city}
            />
          </div>
          <div className="col-md-4 mt-2">
            <strong>จังหวัด</strong>
            <input
              className="form-control"
              type="text"
              required
              onChange={hanldeChnage("province")}
              value={province}
            />
          </div>
          <div className="col-md-2 mt-2">
            <strong>รหัสไปรษณี</strong>
            <input
              className="form-control"
              type="text"
              type="tel"
              pattern="[0-9]{5}"
              required
              onChange={hanldeChnage("zone")}
              value={zone}
              maxLength="5"
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-7">
            <strong>เบอร์โทรศัพท์ </strong>
            <input
              className="form-control"
              type="tel"
              pattern="[0-9]{10}"
              required
              onChange={hanldeChnage("telephone")}
              value={telephone}
              maxLength="10"
            />
          </div>
        </div>

        <button className="btn btn-primary mt-4 ">บันทึกที่อยู่</button>
      </form>
    </div>
  );
};

export default FormAddress;
