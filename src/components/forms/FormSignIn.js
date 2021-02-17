import { useState } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { authenticate } from "../../functions/auth";

const FormSignIn = () => {
  const [state, setState] = useState({
    email: "user000@gmail.com",
    password: "mypasswordadmin..",
    success: "",
    error: "",
    redirectToReferer: false,
    buttonText: "เข้าสู่ระบบ",
  });

  const {
    username,
    email,
    password,
    success,
    error,
    redirectToReferer,
    buttonText,
  } = state;

  if (redirectToReferer) {
    return <Redirect to="/" />;
  }

  const handleChange = (name) => (e) => {
    let value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/login/local`,
        {
          email,
          password,
        }
      );
      authenticate(res.data.token, res.data.role);
      setState({
        ...state,
        error: "",
        redirectToReferer: true,
      });
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      setState({
        ...state,
        error: "กรอกข้อมูลไม่ถูกต้อง",
        success: "",
        buttonText: "เข้าสู่ระบบ",
      });
    }
  };
  return (
    <>
      {" "}
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        {success}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={handleChange("email")}
            value={email}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            value={password}
          />
        </div>
        <div className="row">
          <div className="col">
            <button type="submit" className="btn btn-outline-primary">
              {buttonText}
            </button>
          </div>
          <div className="col d-flex justify-content-end">
            <Link to="/signup" className="text-center">
              <button className="btn btn-primary "> ไปหน้าสมัครสมาชิก</button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormSignIn;
