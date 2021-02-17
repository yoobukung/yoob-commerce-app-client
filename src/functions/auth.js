export const authenticate = (jwt, role) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(jwt));
    localStorage.setItem("role", JSON.stringify(role));
  }
};

// export const setRole = (name, next) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("user", JSON.stringify(role));
//     next();
//   }
// };

export const isAuth = () => {
  if (typeof window == "undefined") return false;
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else return false;
};

export const isAdmin = () => {
  if (typeof window == "undefined") return false;
  if (localStorage.getItem("role")) {
    return JSON.parse(localStorage.getItem("role"));
  } else return false;
};

export const signoutBrowser = () => {
  if (typeof window == "undefined") return false;
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    localStorage.removeItem("address");
    localStorage.removeItem("role");
  } else return false;
};
