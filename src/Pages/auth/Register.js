import React from "react";
import FormSignUp from "../../components/forms/FormSignUp";

const Register = () => {
  return (
    <div className="container">
      <h1 className="text-center mb-4">สมัครสมาชิก</h1>
      <div className="row justify-content-center">
        <div className="col-6 ">
          <FormSignUp />
        </div>
      </div>
    </div>
  );
};

export default Register;
