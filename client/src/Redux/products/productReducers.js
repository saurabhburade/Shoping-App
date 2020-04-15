import {
  FETCH_SHOP_ITEMS_SUCCESS,
  FETCH_SHOP_ITEMS_FAIL,
  FETCH_SHOP_ITEMS_LOADING,
} from "./productActionTypes";

const INITIAL_STATE = {
    shopItems:[],
    loading:false
    
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_SHOP_ITEMS_SUCCESS:
        return {
          ...state,
          shopItems: action.payload,
        };
      case FETCH_SHOP_ITEMS_FAIL:
        return {
          ...state,
          shopItems: [],
        };
      case FETCH_SHOP_ITEMS_LOADING:
        return {
          ...state,
        loading:action.payload
        };

      default:
        return state;
    }
};