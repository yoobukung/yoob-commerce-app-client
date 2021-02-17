import { Fragment, useState, useEffect } from "react";
import { getUser, getMyAllAddress } from "../../functions/GetApi";
import { Link } from "react-router-dom";

const DetailsUser = () => {
  const [state, setstate] = useState({
    userData: "",
    userAddress: [],
    AddressNumber: null,
    showAddress: "",
  });
  const { userData, userAddress, AddressNumber, showAddress } = state;

  useEffect(async () => {
    const res = await getUser();
    const address = await getMyAllAddress();
    setstate({ ...state, userData: res, userAddress: address });
  }, []);

  let index = 0;

  const OptionAddress = () => {
    if (userAddress !== "ไม่พบข้อมูล") {
      userAddress.map((address) => {
        return (
          <Fragment>
            <option key={address.id} value={address.addressNumber}>
              ที่อยู่ลำดับที่ {(index += 1)}
            </option>
          </Fragment>
        );
      });
    } else return <option>ไม่พบข้อมูล</option>;
  };

  const hanldeSelectChange = (e) => {
    setstate({ ...state, AddressNumber: e.target.value });
  };

  const result = !userAddress
    ? []
    : userAddress == "ไม่พบข้อมูล"
    ? []
    : userAddress.filter((address) =>
        address.addressNumber.includes(AddressNumber)
      );

  return (
    <Fragment>
      <h1>Hello ....{userData.username}</h1>
      <strong>username : &nbsp; &nbsp; &nbsp; {userData.username}</strong>
      <div>
        <strong>
          email : &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;{" "}
          {userData.email}
        </strong>
      </div>
      <Link to="/address/add">
        <button className="btn-sm btn-outline-primary my-2 me-4">
          {" "}
          เพิ่มที่อยู่{" "}
        </button>
      </Link>
      <strong>เลือกที่อยู่</strong> &nbsp; &nbsp; &nbsp;
      <select onChange={hanldeSelectChange} className="my-3">
        <option>เลือกที่อยู่</option> {OptionAddress()}
      </select>
      <div>
        {result === [] || ""
          ? ""
          : result.map((add) => {
              return (
                <Fragment>
                  <p>
                    ชื่อผู้รับ {add.name} <br />
                    ที่อยู่ {add.address} <br />
                    เบอร์โทรศัพท์ {add.telephon}
                  </p>
                </Fragment>
              );
            })}
      </div>
      <p>เปลี่ยนรหัสผ่าน</p>
      <div
        className="col-5"
        style={{ borderColor: "#D4CE57", borderStyle: "groove" }}
      >
        <form className="form p-4">
          <label>รหัสผ่านเดิม</label>
          <input className="form-control" />
          <label>รหัสผ่านใหม่</label>
          <input className="form-control" />
          <label>ยืนยันรหัสผ่านใหม่</label>
          <input className="form-control" />
        </form>
      </div>
    </Fragment>
  );
};

export default DetailsUser;
