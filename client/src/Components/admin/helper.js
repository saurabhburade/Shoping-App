const axios = require("axios");
const SERVER = process.env.REACT_APP_SERVER;

exports.deleteProduct = async (data) => {
  if (data) {
    const user = await axios.post(
      `${SERVER}/api/products/delete`,
      JSON.stringify(data),
      {
        headers: {
          "Content-type": "application/json",
          isAdmin: true,
          admin_token: localStorage.getItem("admin_token"),
          token: localStorage.getItem("jwt"),
        },
      }
    );

    return user;
  }
}


exports.updateProduct = async (data) => {
  if (data) {
    const user = await axios.post(
      `${SERVER}/api/products/update`,
      JSON.stringify(data),
      {
        headers: {
          "Content-type": "application/json",
          isAdmin: true,
          admin_token: localStorage.getItem("admin_token"),
          token: localStorage.getItem("jwt"),
        },
      }
    );

    return user;
  }
};
