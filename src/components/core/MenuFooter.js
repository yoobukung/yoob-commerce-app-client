import React from "react";
import { Link } from "react-router-dom";

const MenuFooter = () => {
  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top">
      <div className="row">
        <div className="col-12 col-md">
          <div className="col ms-5 col-md">
            <Link className="h5 ms-5 me-3 fw-normal text-dark" to="/">
              <p className="h5 my-0 me-md-auto fw-normal text-dark">
                E-commerce App
                <small class=" text-muted">&nbsp; &copy; 2021</small>
              </p>
            </Link>
          </div>
        </div>
        <div className="col col-sm ms-5">
          <h5>Features</h5>
          <ul className="list-unstyled text-small">
            <li>
              <Link className="link-secondary" to="/user/myproduct">
                สินค้าที่คุณขาย
              </Link>
            </li>
            <li>
              <Link className="link-secondary" to="/shipping">
                สินค้าที่ต้องส่ง
              </Link>
            </li>
          </ul>
        </div>

        <div className=" col-sm ms-5">
          <h5>About</h5>
          <ul class="list-unstyled text-small">
            <li>
              <Link className="link-secondary" to="/user">
                Profile
              </Link>
            </li>

            <li>
              <Link className="link-secondary" yo="/privacy">
                Privacy / Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default MenuFooter;
