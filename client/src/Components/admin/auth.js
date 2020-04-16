const axios = require("axios");
const SERVER = process.env.REACT_APP_SERVER;

exports.authAdminLogin = async (data) => {
  if (data) {
    const user = await axios.post(
      `${SERVER}/api/admin/login`,
      JSON.stringify(data),
      {
        headers: {
          "Content-type": "application/json",
          isAdmin: true,
        },
      }
    );

    return user;
  }
};
exports.authAdminSignup = async (data) => {
  console.log("signup ", data);
  if (data) {
    const user = await axios.post(
      `${SERVER}/api/admin/register`,
      JSON.stringify(data),

      {
        headers: {
          "Content-type": "application/json",
          "isAdmin":true,
          
        },
      }
    );

    return user;
  }
};
exports.updateAdminProfile = async (data) => {
  console.log("signup ", data);

  if (data) {
    const user = await axios.post(
      `${SERVER}/api/admin/update`,
      JSON.stringify(data),

      {
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("jwt"),
          admin:true,
          admin_token:data.token
          
        },
      }
    );

    return user;
  }
};

exports.isAuthorised = () => {
  if (
    localStorage.getItem("jwt") &&
    localStorage.getItem("logged") === "true" &&
    window !== undefined &&
    localStorage.getItem("admin") === "true" &&
    localStorage.getItem("admin_token")
  ) {
    return true;
  } else {
    return false;
  }
};
