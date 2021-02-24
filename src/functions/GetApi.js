import axios from "axios";
import { isAuth } from "./auth";

export const getCategorise = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/category/find`,
      {
        headers: {
          Authorization: `Bearer ${isAuth()}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};

export const getCategoriseById = async (categoryId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/category/product/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${isAuth()}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return "กรุณาสร้างหมวดหมู่สินค้า";
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${isAuth()}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};

export const getAllProducts = async (
  page = 0,
  pageSize = 3,
  categoryId = null
) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/product`, {
      params: {
        page,
        pageSize,
        categoryId,
      },
    });
    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};

export const sellerGetProduct = async (page, pageSize) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/manage/product`,
      {
        headers: {
          Authorization: `Bearer ${isAuth()}`,
        },
        params: {
          page,
          pageSize,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return "ไม่พบข้อมูล";
  }
};

export const getDetailsProduct = async (slug) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/product/${slug}`
    );
    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};

export const getProductById = async (productId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/manage/productbyId/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${isAuth()}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};

export const getProductInCart = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/cart`, {
      headers: {
        Authorization: `Bearer ${isAuth()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return "กรุณาเลือกสินค้าลงตะกร้าก่อน";
  }
};

// Address

export const getAddress = async (addNumber) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/address/${addNumber}`,
      {
        headers: {
          Authorization: `Bearer ${isAuth()}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};

export const getAddressById = async (addessId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/addressById/${addessId}`,
      {
        headers: {
          Authorization: `Bearer ${isAuth()}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};

export const getMyAllAddress = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/address/all`,
      {
        headers: {
          Authorization: `Bearer ${isAuth()}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};

// Order

export const getOrder = async (addNumber) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/order`, {
      headers: {
        Authorization: `Bearer ${isAuth()}`,
      },
    });
    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};

export const getOrderForShipping = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/order/shipping`,
      {
        headers: {
          Authorization: `Bearer ${isAuth()}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};

export const getOrderDetails = async (ordernumber) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/order/product/${ordernumber}`,
      {
        headers: {
          Authorization: `Bearer ${isAuth()}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};

export const getPaymentByOrderNumber = async (ordernumber) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_API}/getpayment/${ordernumber}`,
      {
        headers: {
          Authorization: `Bearer ${isAuth()}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return "ไม่พบข้อมูล";
  }
};
