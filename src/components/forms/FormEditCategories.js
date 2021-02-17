import { useState, useEffect } from "react";
import axios from "axios";
import { isAuth } from "../../functions/auth";
import { Redirect, useLocation } from "react-router-dom";
import { getCategoriseById } from "../../functions/GetApi";

const FormEditCategories = () => {
  let location = useLocation();
  let path = location.pathname.split("/");

  const [state, setState] = useState({
    name: "",
    description: "",
    redirectToReferer: false,
  });
  const { name, description, redirectToReferer } = state;

  useEffect(async () => {
    const res = await getCategoriseById(path[2]);
    setState({ ...state, name: res.name, description: res.description });
  }, []);

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_SERVER_API}/category/edit/${path[2]}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${isAuth()}`,
          },
        }
      );
      setState({
        ...state,
        error: "",
        redirectToReferer: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (redirectToReferer) {
    return <Redirect to="/categories" />;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ชื่อหมวดหมู่สินค้า</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("name")}
            value={name}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">คำอธิบาย</label>
          <textarea
            rows="5"
            type="text"
            className="form-control"
            onChange={handleChange("description")}
            value={description}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          save
        </button>
      </form>
    );
  }
};

export default FormEditCategories;
