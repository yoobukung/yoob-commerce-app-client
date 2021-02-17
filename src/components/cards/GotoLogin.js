import React from "react";
import { Link } from "react-router-dom";

const GotoLogin = () => {
  return (
    <div className="container text-center mt-5">
      <h3>
        กรุณา
        <Link to="/signin"> เข้าสู่ระบบก่อน</Link>
      </h3>
    </div>
  );
};

export default GotoLogin;
