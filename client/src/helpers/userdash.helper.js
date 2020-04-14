const axios = require('axios');
const SERVER = process.env.REACT_APP_SERVER;

exports.fetchDash= async (token)=>{
   if (window!==undefined) {
       const url=`${SERVER}/api/user/fetch`
        const fetchuser = await axios.get(url, {
          headers: {
            "token": token
          }
        });
        return fetchuser
   }
    
}