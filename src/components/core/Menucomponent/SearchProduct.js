import { useState, useEffect } from "react";
import { getAllProducts } from "../../../functions/GetApi";
import { Link } from "react-router-dom";
import { Input } from "antd";

const SearchProduct = () => {
  const { Search } = Input;

  const [state, setState] = useState({
    products: ["product1", "product2", "product3"],
  });

  const { products } = state;

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(async () => {
    const data = await getAllProducts();
    setState({ ...state, products: data.all });
  }, []);

  const result = !searchTerm
    ? []
    : products == "undefined" || "ไม่พบข้อมูล"
    ? []
    : products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleUL = () => {
    if (searchTerm == "" || null || undefined) return { display: "none" };
    else
      return {
        borderRadius: "10px",
        backgroundColor: "white",
        boxSizing: "border-box",
        maxWidth: "100%",
        listStyle: "none",
        position: "absolute",
        transformOrigin: "top",
        zIndex: "9",
      };
  };

  const handleClick = (product) => (e) => {
    window.location.reload();
  };

  return (
    <form className="my-0 me-md-auto fw-normal search-bar ">
      <Search
        className=" search-bar "
        placeholder="พิมพ์ชื่อสินค้า"
        allowClear
        style={{ width: 200 }}
        onChange={handleSearch}
        value={searchTerm}
      />
      {products != "undefined" && (
        <ul className="searchTerm p-2 pe-5" style={handleUL()}>
          {result.map((items) => (
            <li
              className="my-1 btn btn-outline-secondary"
              style={{
                display: "list-item",
                textAlign: "start",
              }}
              onClick={handleClick(items.name)}
            >
              <Link
                to={`/products/${items.name}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {items.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchProduct;
