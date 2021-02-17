import { useState } from "react";
import axios from "axios";
import { isAuth } from "../../functions/auth";
import { Redirect } from "react-router-dom";

const FormCreateCategories = () => {
  const [state, setState] = useState({
    name: "",
    description: "",
    redirectToReferer: false,
  });
  const { name, description, redirectToReferer } = state;

  if (redirectToReferer) {
    return <Redirect to="/categories" />;
  }

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_API}/category/add`,
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
};

export default FormCreateCategories;
