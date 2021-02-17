import React from "react";
import FormSignIn from "../../components/forms/FormSignIn";

const Login = () => {
  return (
    <div className="container">
      <h1 className="text-center mb-4">เข้าสู่ระบบ</h1>
      <div className="row justify-content-center">
        <div className="col-6 ">
          <FormSignIn />
        </div>
      </div>
    </div>
  );
};

export default Login;
