import { Fragment } from "react";
import rederHTML from "react-render-html";
import LinesEllipsis from "react-lines-ellipsis";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  const cardProduct = products.map((product) => {
    return (
      <div className="col-lg-4 mt-2 mb-2">
        <div
          className="card shadow-lg h-100 me-2 "
          key={product.name}
          style={{ height: "100px" }}
        >
          <Link
            to={{
              pathname: `/products/${product.name}`,
            }}
            activeClassName="current"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <div class="bg-image hover-overlay ripple bd-placeholder-img card-img-top">
              <img
                src={product.imageUrl}
                className="card-img-top"
                style={{
                  width: "100%",
                  height: "15rem",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="card-body p-3">
              <h3 className="card-title text-center mb-2">
                <LinesEllipsis text={product.name} maxLine={1} />
              </h3>

              <p
                className="card-text"
                style={{
                  height: "80px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {rederHTML(product.description)}
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center p-3">
              <div className="btn-group">
                <button className="btn  btn-sm btn-warning">View</button>
              </div>
              <p>ราคา {product.price.toLocaleString()} บาท</p>
            </div>
          </Link>
        </div>
      </div>
    );
  });

  return <Fragment>{cardProduct}</Fragment>;
};

export default ProductList;
