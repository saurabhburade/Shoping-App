import userReducers from "./user/userReducers";
import productReducers from "./products/productReducers";
import adminReducers from "./admin/adminReducers";
import {combineReducers} from "redux"

export const rootreducer = combineReducers({
  user: userReducers,
 products: productReducers,
  admin:adminReducers,
});