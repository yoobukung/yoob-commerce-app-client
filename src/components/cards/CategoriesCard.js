import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategorise } from "../../functions/GetApi";
import axios from "axios";
import { isAuth } from "../../functions/auth";

const CategoriesCard = () => {
  const [state, setState] = useState({
    categories: [],
    error: "",
  });

  const { categories } = state;

  useEffect(async () => {
    const data = await getCategorise();

    if (data !== "กรุณาสร้างหมวดหมู่สินค้า") {
      setState({
        ...state,
        categories: data,
      });
    }
  }, []);

  const handleDelete = (cateId, cateName) => async (e) => {
    if (window.confirm(`คุณต้องการลบข้อมูลหมวด "${cateName}" ใช่ไหม `)) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_SERVER_API}/category/delete/${cateId}`,
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
    }
  };

  const cardCategory = categories.map((category) => {
    return (
      <div className="card" key={category.name}>
        <div className="row">
          <div className="col-9">
            <div className="card-body">
              <h5 className="card-title">{category.name}</h5>
              <p className="card-text">{category.description}</p>
            </div>
          </div>

          <div className="col-3">
            <Link
              to={`/categories/${category.id}/edit`}
              className="btn btn-outline-info mt-2 me-3"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete(category.id, category.name)}
              className="btn btn-outline-danger mt-2 "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });

  const createCategory = () => {
    return (
      <Link
        className="col mt-5 offset-0 btn btn-primary"
        to="/categories/:categoryId/create"
      >
        Create Category
      </Link>
    );
  };

  return (
    <div className="card-deck">
      {cardCategory}
      {createCategory()}
    </div>
  );
};

export default CategoriesCard;
