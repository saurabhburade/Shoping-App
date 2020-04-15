import {
  FETCH_PROFILE_LOADING,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_CART_LOADING,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAIL,
  ADD_TO_CART_SUCCESS,
  UPDATE_CART_QUANTITY,
  UPDATE_CART,
  SET_CART_TOTAL,
  CLEAR_CART,
} from "./userActionTypes";

const axios = require("axios");
const SERVER = process.env.REACT_APP_SERVER;

export const fetchProfile = (token) => {
  console.log("profile");
  return (dispatch) => {
    dispatch(fetchProfileLoading(true));

    axios
      .get(`${SERVER}/api/user/fetch`, {
        headers: {
          token: token,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch(fetchProfileSuccess(result.data));
        dispatch(fetchProfileLoading(false));
      })
      .catch((err) => {
        dispatch(fetchProfileFail());
        dispatch(fetchProfileLoading(false));
      });
  };
};

const fetchProfileLoading = (payload) => {
  return {
    type: FETCH_PROFILE_LOADING,
    payload: payload,
  };
};
const fetchProfileSuccess = (payload) => {
  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: payload,
  };
};
const fetchProfileFail = () => {
  return {
    type: FETCH_PROFILE_FAIL,
  };
};

export const fetchCart = (token) => {
  return (dispatch, getState) => {
    dispatch(fetchCartLoading(true));
    axios
      .get(`${SERVER}/api/cart/fetch`, {
        headers: {
          token: token,
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data) {
          dispatch(fetchCartSuccess(result.data.arr));
          dispatch(
            setTotalCartPrice(getTotalCartPrice(getState().user.userCart))
          );

          dispatch(fetchCartLoading(false));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchCartFail());
        dispatch(
          setTotalCartPrice(getTotalCartPrice(getState().user.userCart))
        );

        dispatch(fetchCartLoading(false));
      });
  };
};

const fetchCartLoading = (payload) => {
  return {
    type: FETCH_CART_LOADING,
    payload: payload,
  };
};
const fetchCartSuccess = (payload) => {
  return {
    type: FETCH_CART_SUCCESS,
    payload: payload,
  };
};
const fetchCartFail = () => {
  return {
    type: FETCH_CART_FAIL,
  };
};

export const addToCart = (data) => {
  return (dispatch, getState) => {
    dispatch(addToCartSuccess(data.data));
    // 1. setState
    dispatch(setTotalCartPrice(getTotalCartPrice(getState().user.userCart)));
    
    const arr = cartToSendCreator(getState().user.userCart);
    console.log(arr);
    axios
      .post(
        `${SERVER}/api/cart/add`,
        {
          addItem: arr,
        },
        {
          headers: {
            token: localStorage.getItem("jwt"),
          },
        }
      )
      .then((userCart) => {
        console.log("userCart", userCart);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    //2. send this to server

    console.log("data", data, "state", getState(), getState().user.userCart);
  };
};

const cartToSendCreator = (products) => {
  let arr = [];
  products.forEach((value) => {
    const { productId, quantity } = value;
    if (productId && quantity !== 0) {
      const arrItem = { productId, quantity };
      arr = [...arr, arrItem];
    }
  });

  return arr;
};

const addToCartSuccess = (payload) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload,
  };
};
export const updateCart = (data) => {
  return (dispatch, getState) => {
    console.log("data", data);
    dispatch(fetchCartLoading(true));
    let updateCartArray = [...getState().user.userCart];
    if (updateCartArray.length!==0) {
      updateCartArray[data.index].quantity = data.quantity;
         console.log(updateCartArray);
    dispatch(updateCartSuccess(updateCartArray));
    // 1. setState
    dispatch(setTotalCartPrice(getTotalCartPrice(getState().user.userCart)));
    }
    ;
 
    
    const arr = cartToSendCreator(getState().user.userCart);
    console.log(arr);
    axios
      .post(
        `${SERVER}/api/cart/add`,
        {
          addItem: arr,
        },
        {
          headers: {
            token: localStorage.getItem("jwt"),
          },
        }
      )
      .then((userCart) => {
        console.log("userCart", userCart);
    dispatch(fetchCartLoading(false));
        
      })
      .catch((err) => {
    dispatch(fetchCartLoading(false));
        
        if (err) {
          console.log(err);
        }
      });
    //2. send this to server

    console.log("data", data, "state", getState(), getState().user.userCart);
  };
};

const updateCartSuccess = (payload) => {
  return {
    type: UPDATE_CART,
    payload,
  };
};
export const deleteCart = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchCartLoading(true));
    
    console.log("data", data);
    let updateCartArray = [...getState().user.userCart];
    updateCartArray.splice(data.index,1);
    console.log(updateCartArray);
    dispatch(updateCartSuccess(updateCartArray));
    dispatch(setTotalCartPrice(getTotalCartPrice(getState().user.userCart)));
    // 1. setState
    const arr = cartToSendCreator(getState().user.userCart);
    console.log(arr);
    axios
      .post(
        `${SERVER}/api/cart/add`,
        {
          addItem: arr,
        },
        {
          headers: {
            token: localStorage.getItem("jwt"),
          },
        }
      )
      .then((userCart) => {
    dispatch(fetchCartLoading(false));
        
        console.log("userCart", userCart);
      })
      .catch((err) => {
    dispatch(fetchCartLoading(false));
        
        if (err) {
          console.log(err);
        }
      });
    //2. send this to server

    console.log("data", data, "state", getState(), getState().user.userCart);
  };
};


const setTotalCartPrice=(payload)=>{
  return {
    type: SET_CART_TOTAL,
    payload,
  };
}
const getTotalCartPrice=(cart)=>{
     let sum = 0;
     cart.forEach((element) => {
       sum = sum + element.price * element.quantity;
     });
     return sum;
}

export const clearCart=()=>{
  return{
    type:CLEAR_CART
  }
}