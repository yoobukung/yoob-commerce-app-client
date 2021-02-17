import { useEffect, useState } from "react";
import CategoriesCard from "../../components/cards/CategoriesCard";
import { getUser } from "../../functions/GetApi";

const Categories = () => {
  const [state, setState] = useState({
    roleUser: "",
  });
  useEffect(async () => {
    const res = await getUser();
    if (res.role !== "admin") {
    }
  }, []);

  return (
    <div className="container">
      <h1 class="text-center mb-4">หมวดหมู่สินค้า</h1>
      <div className="col-10">
        <CategoriesCard />
      </div>
    </div>
  );
};

export default Categories;
