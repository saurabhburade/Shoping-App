const axios=require('axios');
const SERVER = process.env.REACT_APP_SERVER;

exports.fetchProducts= async()=>{
        const shopItems = await axios.get(`${SERVER}/api/products/fetch`);
        return shopItems;
}