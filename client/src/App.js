//TODO Admin page and authentication
import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducers"
import "antd/dist/antd.css";
import Cartview from "./Components/Cartview";
import Header from "./Components/Header";
import Products from "./Components/Products";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Addproduct from "./Components/admin/Addproduct";
import Profiledash from "./Components/user/Profiledash";
const store=createStore(reducer)
require('dotenv').config()
function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
