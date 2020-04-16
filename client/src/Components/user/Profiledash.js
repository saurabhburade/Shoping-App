import React, { Component, Fragment } from "react";
// import { fetchDash } from "../../helpers/userdash.helper";
import "./profiledash.css";
import { isAuthenticated } from "../../auth/auth";
import { Redirect } from "react-router-dom";
import { Button } from "antd";
import Orderproductcard from "./Orderproductcard";
import profile from "../images/boy.svg";
import { connect } from "react-redux";
import { fetchProfile } from "../../Redux/user/userActionCreators";
import Updateprofile from "./Updateprofile";
// const SERVER = process.env.REACT_APP_SERVER;
class Profiledash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersVisible: false,
      profileVisible: true,
      updateProfileVisible:false
    };
  }


  ordersClick = () => {
    this.setState({
      ordersVisible: true,
      profileVisible: false,
      updateProfileVisible:false
      
    });
  };
  profileClick = () => {
    this.setState({
      ordersVisible: false,
      profileVisible: true,
      updateProfileVisible:false
      
    });
  };
    updateClick = () => {
    this.setState({
      ordersVisible: false,
      profileVisible: false,
      updateProfileVisible:true
      
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
              {this.props.data.fname ? this.props.data.fname.charAt(0) : "U"}
            </div>
            <div className="user-name">
              {this.props.data.fname
                ? this.props.data.fname + " " + this.props.data.lname
                : "User Name"}
            </div>
          </div>
          <div className="menu-user-dash">
            <div className="user-name" onClick={this.profileClick}>
              Profile
            </div>
            <div className="user-name" onClick={this.updateClick}>
              Update Profile
            </div> <div className="user-name" onClick={this.ordersClick}>
              Orders
            </div>
          </div>
        </div>
        <div className="user-details">
          {this.state.profileVisible ? (
             (
              <div className="profile-details">
                <div className="profile-img-cont">
                  <img className="profile-img" src={profile} alt="profile" />
                </div>
                <p>
                  Name :
                  {this.props.data.fname
                    ? this.props.data.fname + " " + this.props.data.lname
                    : "Loading ..."}
                </p>
                <p>
                  Email :
                  {this.props.data.fname ? this.props.data.email : "Loading ..."}
                </p>
              </div>
            )
            
          ) : this.state.ordersVisible ? (
            <Fragment>
              {" "}
              {Object.keys(this.props.orderGrp).map((value) => {
                return (
                  <div className="order-card-container">
                    <div className="products-order-container">
                      <div className="ordered-products-here">
                        <div className="order-card-header">ORDER DETAILS</div>

                        <div className="ordered-products">
                          {this.props.orderGrp[value].map((v) => {
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
                      <p className="order-date">
                        {this.props.addressDoc[value].date || "3rd April 2020"}
                      </p>
                      <p className="Address">
                        <p className="line-1">
                          Address :{" "}
                          {this.props.addressDoc[value].address.line1 ||
                            "Loading ..."}
                        </p>
                      </p>
                      <a
                        href={this.props.addressDoc[value].receipt_url || "#"}
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
          ) :this.state.updateProfileVisible?<Updateprofile />:null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.user.userData,
    orderGrp: state.user.orderGrp,
    addressDoc:state.user.addressDoc
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfile: () => dispatch(fetchProfile(localStorage.getItem("jwt"))),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profiledash);
