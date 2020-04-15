import { FETCH_PROFILE_LOADING, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAIL, FETCH_CART_LOADING, FETCH_CART_SUCCESS, FETCH_CART_FAIL, ADD_TO_CART_SUCCESS, DEC_CART, INC_CART, UPDATE_CART_QUANTITY, UPDATE_CART, SET_CART_TOTAL, CLEAR_CART } from "./userActionTypes";

const INITIAL_STATE = {
  userData: {},
  loading: false,
  orderGrp: {},
  userCart: [],
  cartCount: 0,
  totalCartPrice: 0,
  addressDoc:{}
};

const totalCartPrice=(cart)=>{
    let sum = 0;
    cart.forEach((element) => {
      sum = sum + element.price * element.quantity;
    });
    return sum;
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_PROFILE_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case FETCH_PROFILE_SUCCESS:
        return {
          ...state,
          userData: action.payload.user,
          orderGrp: action.payload.grpOrder,
          addressDoc: action.payload.addressDoc,
        };
      case FETCH_PROFILE_FAIL:
        return {
          ...state,
          userData: {},
        };
      case FETCH_CART_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case FETCH_CART_SUCCESS:
        return {
          ...state,
          userCart: action.payload,
          cartCount: action.payload.length,
        };
      case FETCH_CART_FAIL:
        return {
          ...state,
        };
      case ADD_TO_CART_SUCCESS:
        return {
          ...state,
          userCart: [...state.userCart, ...action.payload],
          cartCount: state.cartCount + 1,
        };
      case UPDATE_CART:
        return {
          ...state,
          userCart: action.payload,
          cartCount: action.payload.length,
        };
      case SET_CART_TOTAL:
        return {
          ...state,
         
          totalCartPrice: action.payload,
        };
        case CLEAR_CART:
               return {
                 ...state,
                 userCart: [],
                 cartCount: 0,

                 totalCartPrice: 0,
               };
      default:
        return state;
    }
};