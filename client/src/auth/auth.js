const axios=require('axios');
const SERVER = process.env.REACT_APP_SERVER;

exports.authLogin=async(data)=>{
    if (data) {
       
    const user= await    axios.post(`${SERVER}/api/user/login`,
            JSON.stringify(data)
            
        ,{
            headers:{
                "Content-type":"application/json",
            }
        })
    
        return user;
    }
}
exports.authSignup =async data => {
    console.log("signup ",data);
    
    
    
    
        if (data) {
       
    const user= await    axios.post(`${SERVER}/api/user/register`,
            JSON.stringify(data)
            
        ,{
            headers:{
                "Content-type":"application/json",
            }
        })
    
        return user;
    }
    
    
};
exports.updateProfile = async (data) => {
  console.log("signup ", data);

  if (data) {
    const user = await axios.post(
      `${SERVER}/api/user/update`,
      JSON.stringify(data),

      {
        headers: {
          "Content-type": "application/json",
          "token":localStorage.getItem("jwt")
        },
      }
    );

    return user;
  }
};
exports.isAuthenticated=()=>{

    if (
      localStorage.getItem("jwt") &&
      localStorage.getItem("logged") === "true" &&
      window !== undefined
    ) {
      return true;
    } else {
      return false;
    }
}