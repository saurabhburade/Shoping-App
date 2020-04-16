import React, { Component } from "react";
import { isAuthorised } from "./auth";
import { Redirect } from "react-router";
import "./adminpanel.css";
import profile from "../images/boy.svg";
import Addproduct from "./Addproduct";
import AllProducts from "./AllProducts";
import EditProfile from "./EditProfile";
class Adminpanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addProductVisible: false,
      editProfileVisible: false,
      allProductsVisible: true,
    };
  }
  AddClick = () => {
    this.setState({
      addProductVisible: true,
      editProfileVisible: false,
      allProductsVisible: false,
    });
  };
  EditProfileClick = () => {
    this.setState({
      addProductVisible: false,
      editProfileVisible: true,
      allProductsVisible: false,
    });
  };
  AllProductsClick = () => {
    this.setState({
      addProductVisible: false,
      editProfileVisible: false,
      allProductsVisible: true,
    });
  };
  render() {
    if (!isAuthorised()) {
      return <Redirect to="admin/login" />;
    }
    return (
      <div className="admin-panel-container">
        <div className="admin-menu-profile">
          <div className="admin-profile-card">
            <img src={profile} alt="admin" />
            <strong> User Name</strong>
          </div>
          <div className="admin-menu">
            <div className="admin-menu-item" onClick={this.EditProfileClick}>
              Edit Profile
            </div>
            <div className="admin-menu-item" onClick={this.AddClick}>
              Add Product
            </div>
            <div className="admin-menu-item" onClick={this.AllProductsClick}>
              All Products
            </div>
          </div>
        </div>
        <div className="admin-form-products-container">
          {this.state.addProductVisible ? (
            <Addproduct />
          ) : this.state.allProductsVisible ? (
            <AllProducts />
          ) : this.state.editProfileVisible ? (
            <EditProfile />
          ) : (
            <AllProducts />
          )}
        </div>
      </div>
    );
  }
}

export default Adminpanel;
