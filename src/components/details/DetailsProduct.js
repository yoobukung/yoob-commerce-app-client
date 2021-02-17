import { useEffect, useState } from "react";
import { useLocation, Link, Redirect } from "react-router-dom";
import { getDetailsProduct } from "../../functions/GetApi";
import rederHTML from "react-render-html";
import axios from "axios";
import { isAuth } from "../../functions/auth";

const DetailsProduct = () => {
  const [state, setState] = useState({
    products: [],
    title: "ชื่อสินค้า",
    description: "คำอธิบาย",
    quantity: "200",
    amount: 1,
    price: 600.675,
    image: "รูปภาพ",
    success: "",
    error: "",
  });

  const { products, description, amount, price, error, success } = state;

  let location = useLocation();
  const getLastPathname = location.pathname.split("/");

  useEffect(async () => {
    const response = await getDetailsProduct(getLastPathname[2]);

    if (response !== "ยังไม่มีสินค้า") {
      setState({
        ...state,
        products: response,
        description: rederHTML(response.description),
        price: response.price.toLocaleString(),
      });
    }
  }, []);

  const handleChnage = (e) => {
    setState({ ...state, amount: e.target.value });
  };

  const addCart = async (e) => {
    if (isAuth() == false || null) {
      setState({ ...state, error: "กรุณาเข้าสู่ระบบก่อนทำรายการ" });
    } else {
      setState({ ...state, error: "" });
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER_API}/cart/add`,
          {
            productId: products.id,
            quantity: amount,
          },
          {
            headers: {
              Authorization: `Bearer ${isAuth()}`,
            },
          }
        );
        window.location.reload();
      } catch (error) {
        setState({
          ...state,
          success: "",
          error:
            "สินค้านี้อยู่ในตะกร้าแล้ว หากต้องการเปลี่ยนแปลงให้ลบสินค้าเดิมออกก่อน",
        });
      }
    }
  };

  return (
    <div className="displayTable">
      <p className="text-center text-danger"> {error}</p>
      <p className="text-center text-dark"> {success}</p>

      <div className="viewProductImage text-center">
        <img
          src={products.imageUrl}
          style={{ maxHeight: "250px", maxWidth: "250px" }}
          className="m-3"
        />
        <h4>{products.name}</h4>
        {products.quantity <= 0 ? (
          <p className="btn btn-warning text-bold m-1">สินค้าหมดแล้ว</p>
        ) : (
          <p className="btn btn-primary text-bold m-1" onClick={addCart}>
            เพิ่มในตะกร้าสินค้า
          </p>
        )}
      </div>
      <div className="viewProductDetail"></div>
      <div className="row mt-4">
        <div className="col">
          <p>ราคาต่อชิ้น &nbsp; &nbsp; {price} บาท</p>
          {products.quantity <= 0 ? (
            <p>สินค้าหมดแล้ว</p>
          ) : (
            <p>ปัจจุบันมีสินค้าอยู่ {products.quantity} ชิ้น</p>
          )}

          <p>ใส่จำนวนสินค้าที่ต้องการซื้อ</p>

          {products.quantity <= 0 ? (
            <p>สินค้าหมดแล้ว</p>
          ) : (
            <input type="number" onChange={handleChnage} value={amount} />
          )}
        </div>
        <div className="col-7 p-3">
          {" "}
          <h4>คำอธิบาย</h4>
          <p>{description} </p>
        </div>
      </div>

      <div className="row mt-5 mb-3">
        <hr />
        <div>
          <Link to="/" className="btn btn-outline-info">
            กลับไปหน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
