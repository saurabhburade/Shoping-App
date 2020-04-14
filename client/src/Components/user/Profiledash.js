import React, { Component, Fragment } from "react";
import { fetchDash } from "../../helpers/userdash.helper";
import "./profiledash.css";
import { isAuthenticated } from "../../auth/auth";
import { Redirect } from "react-router-dom";
import { Button } from "antd";
import Orderproductcard from "./Orderproductcard";
import profile from "../images/boy.svg"
// const SERVER = process.env.REACT_APP_SERVER;
class Profiledash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      orderGrp: {},
      charge_keys: [],
      ordersVisible: false,
      profileVisible: true
    };
  }
  componentWillMount() {
    fetchDash(localStorage.getItem("jwt"))
      .then(data => {
        if (data.data.user) {
          this.setState({
            data: data.data.user,
            orderGrp: data.data.grpOrder,
            charge_keys: Object.keys(data.data.grpOrder)
          });
         
        }
      })
      .catch(err => console.log(err));
  }
  ordersClick = () => {
    this.setState({
      ordersVisible: true,
      profileVisible: false
    });
  };
  profileClick = () => {
    this.setState({
      ordersVisible: false,
      profileVisible: true
    });
  };
  render() {

    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="user-dash-container">
        <div className="user-profile-card">
          <div className="user-card-dash" onClick={this.profileClick}>
            <div className="user-avatar">
              {this.state.data.fname ? this.state.data.fname.charAt(0) : "U"}
            </div>
            <div className="user-name">
              {this.state.data.fname
                ? this.state.data.fname + " " + this.state.data.lname
                : "User Name"}
            </div>
          </div>
          <div className="menu-user-dash">
            <div className="user-name" onClick={this.profileClick}>
              Profile
            </div>
            <div className="user-name" onClick={this.ordersClick}>
              Orders
            </div>
          </div>
        </div>
        <div className="user-details">
          {this.state.profileVisible ? (
            <div className="profile-details">
              <div className="profile-img-cont">
                <img className="profile-img" src={profile} alt="profile" />
              </div>
              <p>
                Name :
                {this.state.data.fname
                  ? this.state.data.fname + " " + this.state.data.lname
                  : "Loading ..."}
              </p>
              <p>
                Email :
                {this.state.data.fname ? this.state.data.email : "Loading ..."}
              </p>
            </div>
          ) : this.state.ordersVisible ? (
            <Fragment>
              {" "}
              {this.state.charge_keys.map(value => {

                return (
                  <div className="order-card-container">
                    <div className="products-order-container">
                      <div className="ordered-products-here">
                        <div className="order-card-header">ORDER DETAILS</div>

                        <div className="ordered-products">
                          {this.state.orderGrp[value].map(v => {
                            return (
                              <Orderproductcard
                                img={v.img}
                                price={v.price}
                                quantity={v.quantity}
                                title={v.title}
                              />
                            );
                          })}
                        </div>
                      </div>

                      <div className="order-card-footer">
                        <h4>
                          Charge Id : <strong>{" " + value}</strong>
                        </h4>
                      </div>
                    </div>

                    <div className="order-details">
                      <p className="order-date">3rd April 2020</p>
                      <p className="Address">
                        At Ad line 1 <br /> At Ad line 1 <br /> At Ad line 1{" "}
                        <br /> At Ad line 1
                      </p>
                      <a
                      href={"#"}
                      //  href={`${this.state.paymentData.receipt_url}`}
                      >
                        <Button type="primary" key="buy">
                          Receipt
                        </Button>
                      </a>
                    </div>
                  </div>
                );
              })}{" "}
            </Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Profiledash;
