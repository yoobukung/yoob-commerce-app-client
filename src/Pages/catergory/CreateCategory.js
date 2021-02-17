import React from "react";
import FormCreateCategories from "../../components/forms/FormCreateCategories";

const CreateCategory = () => {
  return (
    <div className="container">
      <h1>สร้างหมวดหมู่สินค้า</h1>
      <div className="col-8">
        <FormCreateCategories />
      </div>
    </div>
  );
};

export default CreateCategory;
