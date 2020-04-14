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
exports.authSignup = data => {
    console.log("signup ",data);
  if (data) {
    axios
      .post(`${SERVER}/api/user/register`, data)
      .then(payload => {
        if (payload && window !== undefined) {
          localStorage.setItem("jwt", payload.data.token);
          localStorage.setItem("logged", true);
        }
      })
      .catch(err => console.log(err));
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