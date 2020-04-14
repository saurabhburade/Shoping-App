const axios = require("axios");
const SERVER = process.env.REACT_APP_SERVER;

exports.fetchCart = async () => {
  const shopItems = await axios.get(`${SERVER}/api/cart/fetch`, {
    headers: {
      token: localStorage.getItem("jwt")
    }
  });
  return shopItems;
};
