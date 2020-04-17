import { FETCH_ADMIN_PROFILE_LOADING, FETCH_ADMIN_PROFILE_SUCCESS, FETCH_ADMIN_PROFILE_FAIL } from "./adminActionTypes";

const axios = require("axios");
const SERVER = process.env.REACT_APP_SERVER;

export const fetchAdminProfile = (token) => {
  console.log("profile");
  return (dispatch) => {
    dispatch(fetchProfileLoading(true));
    console.log("inside");
    axios
      .get(`/api/admin/fetch`, {
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("jwt"),
          isadmin: "true",
          admin_token: localStorage.getItem("admin_token"),
        },
      })
      .then((result) => {
        console.log("then");

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
    type: FETCH_ADMIN_PROFILE_LOADING,
    payload: payload,
  };
};
const fetchProfileSuccess = (payload) => {
  return {
    type: FETCH_ADMIN_PROFILE_SUCCESS,
    payload: payload,
  };
};
const fetchProfileFail = () => {
  return {
    type: FETCH_ADMIN_PROFILE_FAIL,
  };
};
