import React from "react";
import { Link, withRouter } from "react-router-dom";

const ProductListTable = () => {
  return (
    <table class="table table-striped table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col-1">ลำดับที่</th>
          <th scope="col-3">ชื่อสินค้า</th>
          <th scope="col-2">ราคา</th>
          <th scope="col-2">จำนวนคงเหลือ</th>
          <th scope="col-2">ดูสินค้า</th>
          <th scope="col-1">แก้ไขสินค้า</th>
          <th scope="col-1">ลบสินค้า</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="text-center">
            1
          </th>
          <td>Mark</td>
          <td class="text-end">Otto</td>
          <td class="text-end">@mdo</td>
        </tr>
        <tr>
          <th scope="row" class="text-center">
            2
          </th>
          <td>Jacob</td>
          <td class="text-end">Thornton</td>
          <td class="text-end">@fat</td>
        </tr>
        <tr>
          <th scope="row" class="text-center">
            3
          </th>
          <td colspan="2">Larry the Bird</td>
          <td class="text-end">@twitter</td>
        </tr>
        <tr class="text-center">
          <td colspan="7">
            <Link to="/products/create">เพิ่มสินค้า</Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductListTable;
