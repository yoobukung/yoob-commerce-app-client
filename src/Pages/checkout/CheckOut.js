import { useState, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { getMyAllAddress } from "../../functions/GetApi";
import { setAddressNumber } from "../../functions/localAddress";

const CheckOut = () => {
  const [state, setstate] = useState({
    userAddress: [],
    AddressNumber: null,
    showAddress: "",
    referDirect: false,
  });
  const { userAddress, AddressNumber, referDirect } = state;

  useEffect(async () => {
    const address = await getMyAllAddress();
    setstate({ ...state, userAddress: address });
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

  const handleSubmit = (number) => (e) => {
    e.preventDefault();
    setAddressNumber(number);
    setstate({ ...state, referDirect: true });
  };

  if (referDirect) {
    return <Redirect to="/checkout/review" />;
  } else {
    return (
      <div className="container-sm">
        <h1 className="text-center mb-5">ต้องการจัดส่งที่ไหน</h1>
        <Link to="/address/add">
          <button className="btn btn-outline-primary my-2">
            {" "}
            เพิ่มที่อยู่{" "}
          </button>
        </Link>
        <br />
        <strong>เลือกที่อยู่ผู้รับของ</strong> &nbsp; &nbsp; &nbsp;
        <select onChange={hanldeSelectChange} className="my-3">
          <option>เลือกที่อยู่ผู้รับของ</option> {OptionAddress()}
        </select>
        <div>
          {result === [] ? (
            <p> กรุณาสร้างที่อยู่ก่อน </p>
          ) : (
            result.map((add) => {
              return (
                <Fragment>
                  <p>
                    ชื่อผู้รับ {add.name} <br />
                    ที่อยู่ {add.address} <br />
                    เบอร์โทรศัพท์ {add.telephon}
                  </p>
                  <form onSubmit={handleSubmit(add.addressNumber)}>
                    <button type="submit" className="btn btn-primary mt-3">
                      ยืนยันที่อยู่
                    </button>
                  </form>
                </Fragment>
              );
            })
          )}
        </div>
      </div>
    );
  }
};

export default CheckOut;
