import { FETCH_ADMIN_PROFILE_LOADING, FETCH_ADMIN_PROFILE_SUCCESS, FETCH_ADMIN_PROFILE_FAIL } from "./adminActionTypes";

const INITIAL_STATE = {
    adminDetail:{}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_ADMIN_PROFILE_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case FETCH_ADMIN_PROFILE_SUCCESS:
        return {
          ...state,
          adminDetail:action.payload ,
        };
      case FETCH_ADMIN_PROFILE_FAIL:
        return {
          ...state,
         
        };
      default:
        return state;
    }
};