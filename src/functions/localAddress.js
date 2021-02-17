export const setAddressNumber = (addressNumber) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("address", JSON.stringify(addressNumber));
  }
};

export const isAddressNo = () => {
  if (typeof window == "undefined") return false;
  if (localStorage.getItem("address")) {
    return JSON.parse(localStorage.getItem("address"));
  } else return false;
};

export const delteLocalAddress = () => {
  if (typeof window == "undefined") return false;
  if (localStorage.getItem("address")) {
    return localStorage.removeItem("address");
  } else return false;
};
