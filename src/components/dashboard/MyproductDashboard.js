import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sellerGetProduct } from "../../functions/GetApi";
import axios from "axios";
import { isAuth } from "../../functions/auth";

const MyproductDashboard = () => {
  const [state, setState] = useState({
    categories: [],
  });

  const { categories } = state;

  useEffect(async () => {
    const data = await sellerGetProduct();
    setState({
      ...state,
      categories: data,
    });
  }, []);

  const handleDelete = (productId) => (e) => {
    if (window.confirm("คุณต้องการลบสินค้าดังกล่าวใช่หรือไม่")) {
      try {
        axios.delete(
          `${process.env.REACT_APP_SERVER_API}/manage/product/delete/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${isAuth()}`,
            },
          }
        );
        window.location.reload();
      } catch (error) {
        console.log("ไม่พบข้อมูล");
      }
    }
  };

  let index = 0;

  const Mycatogories = () => {
    if (categories !== "ไม่พบข้อมูล") {
      categories.map((catogory) => {
        return Object.values(catogory.products).map((product) => {
          return (
            <tr>
              <th scope="row" className="text-center p-3">
                {(index += 1)}
              </th>
              <td className="p-3">
                {" "}
                <p>{product.name}</p>
              </td>
              <td className="p-3"> {catogory.name} </td>
              <td className="text-end p-3">
                {product.price.toLocaleString()} บาท
              </td>
              <td className="text-end p-3">
                {product.quantity.toLocaleString()} หน่วย
              </td>
              <td className="text-center ">
                <Link to={`/product/edit/${product.id}`}>
                  <p className="btn btn-info"> edit</p>
                </Link>
              </td>
              <td className="text-center ">
                <p
                  className="btn btn-danger"
                  onClick={handleDelete(product.id)}
                >
                  delete
                </p>
              </td>
            </tr>
          );
        });
      });
    } else return <strong>ไม่พบข้อมูล</strong>;
  };

  return (
    <div className="container">
      <Link to="/product/create">
        <p className="btn btn-primary mb-3">เพิ่มสินค้าที่ต้องการขาย</p>
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="col-sm-1 text-center">
              ลำดับที่
            </th>
            <th scope="col" className="col-sm-3 text-center">
              ชื่อสินค้า
            </th>
            <th scope="col" className="col-sm-2 text-center">
              หมวดสินค้า
            </th>
            <th scope="col" className="col-sm-2 text-center">
              ราคา
            </th>
            <th scope="col" className="col-sm-2 text-center">
              จำนวนคงเหลือ
            </th>
            <th scope="col" className="col-sm-1 text-center">
              แก้ไขข้อมูล
            </th>
            <th scope="col" className="col-sm-1 text-center">
              ลบข้อมูล
            </th>
          </tr>
        </thead>
        <tbody>{Mycatogories()}</tbody>
      </table>
    </div>
  );
};

export default MyproductDashboard;
