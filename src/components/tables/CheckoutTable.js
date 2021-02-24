import { useEffect, useState, Fragment, useRef } from "react";
import axios from "axios";
import { isAddressNo } from "../../functions/localAddress";
import { getProductInCart, getAddress } from "../../functions/GetApi";
import { isAuth } from "../../functions/auth";
import { Redirect, Link } from "react-router-dom";
import { useTable } from "react-table";

const CheckoutTable = () => {
  const [state, setState] = useState({
    productId: null,
    quantity: null,
    totalprice: null,
    myAddress: [],
    myItems: [],
    methodCheckOut: "",
    shipping: 0,
    referDirect: false,
  });

  const {
    productId,
    quantity,
    totalprice,
    myAddress,
    myItems,
    shipping,
    methodCheckOut,
    referDirect,
  } = state;

  const inputRef = useRef({
    quantityRef: null,
    productIdRef: null,
  });

  const { quantityRef, productIdRef } = inputRef;

  useEffect(async () => {
    const getCart = await getProductInCart();
    const getAdd = await getAddress(isAddressNo());

    if (getCart !== "กรุณาเลือกสินค้าลงตะกร้าก่อน") {
      setState({ ...state, myAddress: getAdd, myItems: getCart.products });
    }
  }, []);

  const total = myItems.reduce((sum, i) => (sum += i.price), 0);

  const handleMethod = (e) => {
    const value = e.currentTarget.value;
    setState({ ...state, methodCheckOut: value });
  };

  const handleChange = (e) => {
    const value = e.target;
    console.log("object", value);
  };

  let index = 0;
  const bodyCartItems = myItems.map((prod) => {
    return (
      <Fragment key={prod.id} ref={productIdRef}>
        <tr>
          <th scope="row" className="text-center">
            {(index += 1)}
          </th>
          <td>{prod.name} </td>
          <td className="text-end">{prod.price.toLocaleString()} บาท</td>
          <td className="text-end" ref={quantityRef}>
            {prod.cartItem.quantity.toLocaleString()}
          </td>
          <td className="text-end" onChange={handleChange}>
            {(prod.cartItem.quantity * prod.price).toLocaleString()} บาท
          </td>
          <td className="text-center">
            <a target="_blank" href={`/products/${prod.name}`} className="btn ">
              <p className="btn btn-outline-info">ดูสินค้าที่ซื้อ</p>
            </a>
          </td>
        </tr>
      </Fragment>
    );
  });

  const createOrder = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/order/add`,
        {
          addressNumber: isAddressNo(),
          methodCheckout: methodCheckOut,
        },
        {
          headers: {
            Authorization: `Bearer ${isAuth()}`,
          },
        }
      );
      setState({ ...state, referDirect: true });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (referDirect) {
    return <Redirect to="/user/delivery" />;
  } else {
    return (
      <div className="container">
        <Fragment>
          <table className="table table-striped table-hover mt-4 ">
            <thead>
              <tr className="text-center">
                <th scope="col-1">ลำดับที่</th>
                <th scope="col-3">ชื่อสินค้า</th>
                <th scope="col-2">ราคา</th>
                <th scope="col-2">จำนวนที่ซื้อ</th>
                <th scope="col-2">รวมเป็นเงิน</th>
                <th scope="col-sm-3">ดูสินค้า</th>
              </tr>
            </thead>
            <tbody>{bodyCartItems}</tbody>
          </table>
        </Fragment>

        <div className="row mb-2 mt-5">
          <div className="col-4 ">
            <strong> สินค้าทั้งหมด </strong>{" "}
          </div>
          <div className="col">{myItems.length} รายการ</div>
        </div>

        <div className="row  mb-2">
          <div className="col-4 ">
            <strong> จำนวนเงินที่ต้องชำระ </strong>
          </div>
          <div className="col ">{total.toLocaleString()} บาท</div>
        </div>

        <div className="row mb-2">
          <div className="col-4 ">
            <strong> ค่าขนส่ง </strong>
          </div>
          <div className="col"> {shipping} บาท</div>
        </div>

        <div className="row  mb-2">
          <div className="col-4 ">
            <strong> รวมเป็นเงิน </strong>
          </div>

          <strong className="col">
            {(total + shipping).toLocaleString()} บาท
          </strong>
        </div>

        <hr />

        <h4 className=" mb-5 mt-3">เลือกวิธีการชำระเงิน</h4>
        <div className="d-flex justify-content-start mt-5 mb-5">
          {/*<div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              value="ชำระเงินปลายทาง"
              onChange={handleMethod}
            />
  
            <label class="form-check-label">ชำระเงินปลายทาง</label>
    </div>*/}

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              value="จ่ายผ่านธนาคาร"
              onChange={handleMethod}
            />

            <label class="form-check-label">จ่ายผ่านธนาคาร</label>
          </div>
        </div>

        <form onSubmit={createOrder}>
          <button className="col-md-5 btn btn-primary text-center">
            ยืนยันการสั่งซื้อ
          </button>
        </form>
        <hr />

        <div className="mt-3">
          <h4>ข้อมูลการจัดส่ง</h4>
          <p>ชื่อ {myAddress.name}</p>
          <p>{myAddress.address} </p>
          <p>เบอร์โทรศัพท์ {myAddress.telephon}</p>
        </div>
        <hr />
      </div>
    );
  }
};

export default CheckoutTable;
