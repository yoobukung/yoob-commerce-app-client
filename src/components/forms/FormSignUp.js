import { useState } from "react";
import axios from "axios";

const FormSignup = () => {
  const [state, setState] = useState({
    username: "user000",
    email: "user000@gmail.com",
    password: "mypasswordadmin..",
    success: "",
    error: "",
    buttonText: "สมัครสมาชิก",
  });

  const { username, email, password, success, error, buttonText } = state;

  const handleChange = (name) => (e) => {
    let value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, success: "", error: "" });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/register`,
        {
          username,
          email,
          password,
        }
      );
      setState({
        ...state,
        success: "การสมัครสมาชิกสำเร็จ",
        error: "",
        buttonText: "สมัครสมาชิกเรียบร้อย",
      });
    } catch (error) {
      if (error.response != null || undefined) {
        if (error.response.status === 422) {
          setState({
            ...state,
            error: error.response.data.errors,
            success: "",
            buttonText: "สมัครสมาชิก",
          });
        }
      }
      setState({
        ...state,
        error: "เกิดความผิดพลาด username หรือ email นี้ถูกใช้แล้ว",
        success: "",
        buttonText: "สมัครสมาชิก",
      });
    }
  };

  return (
    <>
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
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("username")}
            value={username}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={handleChange("email")}
            value={email}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary"
          style={{ disabled: buttonText ? "สมัครสมาชิกแล้ว" : "none" }}
        >
          {buttonText}
        </button>
      </form>
    </>
  );
};

export default FormSignup;
