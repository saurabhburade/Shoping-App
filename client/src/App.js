//TODO Admin page and authentication
import React from "react";
import "./App.css";
import { Provider, connect } from "react-redux";

import "antd/dist/antd.css";
import Cartview from "./Components/Cartview";
import Header from "./Components/Header";
import Products from "./Components/Products";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Addproduct from "./Components/admin/Addproduct";
import Profiledash from "./Components/user/Profiledash";
import { isAuthenticated } from "./auth/auth";
import { fetchProfile, fetchCart } from "./Redux/user/userActionCreators";

require('dotenv').config()
function App(props) {
  if (isAuthenticated()) {
    props.fetchProfile();
    props.fetchCart();
  }
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route path="/products" exact>
            <div className="card-container">
              <Products />
            </div>
          </Route>
          <Route path="/cart" exact component={Cartview} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/admin/addproduct" exact component={Addproduct} />
          <Route path="/user/dashboard" exact component={Profiledash} />
        </Switch>
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfile: () => dispatch(fetchProfile(localStorage.getItem("jwt"))),
    fetchCart: () => dispatch(fetchCart(localStorage.getItem("jwt"))),
  };
};
export default connect(null, mapDispatchToProps)(App);
// export default App;
