import { useState, Fragment } from "react";
import { getAllProducts } from "../../functions/GetApi";
import { useQuery } from "react-query";
import { Pagination } from "antd";
import ProductList from "./ProductList";

const ProductCard = ({}) => {
  const [state, setState] = useState({
    products: [],
    page: 0,
    pageSize: 3,
    totalProducts: [],
  });
  const { products, page, size, pageSize, totalProducts } = state;

  const { data, isFetching, status, isError, isLoading } = useQuery(
    ["products", page, pageSize],
    async () => await getAllProducts(page, pageSize),
    { keepPreviousData: true }
  );

  const handlePageChange = (page) => {
    let cureentPage = page - 1;
    setState({ ...state, page: cureentPage });
  };

  return (
    <div className="row ">
      {isError ? (
        <h3>Error fetching data</h3>
      ) : isLoading ? (
        <h3>Loading data ...</h3>
      ) : (
        <Fragment>
          {data == undefined || "ไม่มีสินค้าเหลืออยู่" ? (
            <h3>ไม่พบสินค้า</h3>
          ) : (
            <ProductList products={data.data} />
          )}
        </Fragment>
      )}

      {isError ? (
        <h3>Error fetching data</h3>
      ) : isLoading ? (
        <h3>Loading data ...</h3>
      ) : (
        <nav className="text-center mt-5">
          <Pagination
            defaultCurrent={1}
            defaultPageSize={3}
            total={data.all == undefined ? 0 : data.all.length}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            onChange={handlePageChange}
          />
        </nav>
      )}
    </div>
  );
};

export default ProductCard;
