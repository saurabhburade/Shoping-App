import { FETCH_SHOP_ITEMS_LOADING, FETCH_SHOP_ITEMS_FAIL, FETCH_SHOP_ITEMS_SUCCESS } from "./productActionTypes"
const axios = require("axios");
const SERVER = process.env.REACT_APP_SERVER;
export const fetchShoppingItems=()=>{
    console.log("object");
    // console.log(dispatch)
 return (dispatch)=>{

     
     dispatch(fetchShoppingItemsLoading(true))
     axios.get(`${SERVER}/api/products/fetch`)
     .then(result=>{
         console.log(result);
        dispatch(fetchShoppingItemsSuccess(result.data));
     })
     .catch(err=>{
         console.log(err);
         dispatch(fetchShoppingItemsFail());
     })
 }
}


const fetchShoppingItemsLoading=payload=>{
    return{
        type:FETCH_SHOP_ITEMS_LOADING,
        payload:payload
    }
}
const fetchShoppingItemsSuccess=payload=>{
    return{
        type:FETCH_SHOP_ITEMS_SUCCESS,
        payload:payload
    }
}
const fetchShoppingItemsFail=()=>{
    return{
        type:FETCH_SHOP_ITEMS_FAIL,
        
    }
}