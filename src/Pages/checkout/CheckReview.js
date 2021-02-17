import React from "react";
import CheckoutTable from "../../components/tables/CheckoutTable";
import Mydocument from "../../components/documents/Mydocument";
// import { PDFViewer } from "@react-pdf/renderer";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import ReactPDF from "@react-pdf/renderer";

const CheckReview = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-7">
          <h1 className="col-md ms-4">ตรวจสอบความถูกต้อง</h1>
          <CheckoutTable />
        </div>
      </div>
    </div>
  );
};

// <div className="mt-5">
// <PDFDownloadLink document={<Mydocument />} fileName="order.pdf">
//   {({ blob, url, loading, error }) =>
//     loading ? "Loading document..." : "Download now!"
//   }
//   <p className="btn btn-info ms-4">พิมพ์เอกสารการสั่งสั่งซื้อ</p>
// </PDFDownloadLink>
// </div>

export default CheckReview;
