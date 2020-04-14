import React, { Component, Fragment } from "react";
import "./css/Cartview.css";
import Cartcard from "./Cartcard";
import axios from "axios";
import { connect } from "react-redux";
import { isAuthenticated } from "../auth/auth";
import { Redirect } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { Modal, Button, Result } from "antd";
import { Link } from "react-router-dom";
import { fetchCart } from "../helpers/cart.helpers";
const SERVER = process.env.REACT_APP_SERVER;

class Cartview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // loading: false,
      visible: false,
      paymentData: {},
      visibleError:false
    };
  }
  componentWillMount() {
    fetchCart().then(data=>{
       if (data.data.arr) {
          this.props.fetchCart(data.data.arr);
          this.setState({
            data: data.data.arr
          });
       }})
       .catch(err=>console.log(err))

    
  }
  makePayment = token => {
    const body = {
      token,
      products: this.props.data,
      paymentStatus: ""
    };
    return axios
      .post(`${SERVER}/api/cart/checkout/stripe`, body, {
        headers: {
          token: localStorage.getItem("jwt")
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.status === "succeeded") {
          this.props.clearCart()
          this.setState({
            visible: true,
            paymentData: response.data
          })}
          if (!response && response.data.status !== "succeeded") {
            this.setState({
              visibleError: true
            });
          }
        
      })
      .catch(err => {
        if (err) {
          this.setState({
            visibleError: true
          });
        }
        console.log(err);
      });
  };
  handleCancel = () => {
    this.setState({ visible: false,visibleError:false });
  };
  render() {
    const { visible,visibleError } = this.state;

    const API = `${SERVER}/products/`;
 
    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="cart-view-container">
        <div className="cart-card-container">
          {this.state.data.map((element, index) => {
            return (
              <Cartcard
                title={element.title}
                price={element.price}
                img={API + element.img}
                description={element.description}
                index={index}
                quantity={element.quantity}
              />
            );
          })}
        </div>
        <div className="cart-precess">
          <strong>Total = {this.props.totalCart}</strong>
          <br />
          {this.state.data.length !==0? <StripeCheckout
            stripeKey="pk_test_MY0CvrDbKKXZg0IH14zk0Gu100Wk4rnFmy"
            token={this.makePayment}
            amount={this.props.totalCart * 100}
            name="Buy Fruits"
            shippingAddress
            billingAddress
          />:null}
         
          <div>
            {/* <Button type="primary" onClick={this.showModal}>
              Open Modal with customized footer
            </Button> */}
            <Modal
              visible={visibleError}
              title="Order"
              onOk={this.handleOk}
              // cancelText=""
              cancelButtonProps={null}
              // onCancel={this.handleCancel}
              footer={[
                <center>
                  <strong>Thank You</strong>
                </center>
              ]}
            >
              <Result
                status="error"
                title="Payment Failed ! "
                subTitle="Please try again"
                extra={[
                  <Fragment>
                    <Link to={"/user/dashboard"}>
                      <Button type="primary" key="console">
                        Go to Profile
                      </Button>
                    </Link>

                    <Button
                      type="primary"
                      onClick={this.handleCancel}
                      key="buy"
                    >
                      Ok
                    </Button>
                  </Fragment>
                ]}
              />
            </Modal>
            <Modal
              visible={visible}
              title="Order"
              onOk={this.handleOk}
              // cancelText=""
              cancelButtonProps={null}
              // onCancel={this.handleCancel}
              footer={[
                <center>
                  <strong>Thank You</strong>
                </center>
              ]}
            >
              <Result
                status="success"
                title="Successfully Purchased Fruits ! "
                subTitle={
                  "Charge Id: " +
                  this.state.paymentData.id +
                  `\n` +
                  "Transaction Id: " +
                  this.state.paymentData.balance_transaction
                }
                extra={[
                  <Fragment>
                    <Link to={"/user/dashboard"}>
                      <Button type="primary" key="console">
                        Go to Orders
                      </Button>
                    </Link>
                    <a href={`${this.state.paymentData.receipt_url}`}>
                      <Button type="primary" key="buy">
                        Receipt
                      </Button>
                    </a>
                  </Fragment>
                ]}
              />
            </Modal>
          </div>
          {/* </ReactStripeCheckout> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.products,
    totalCart: state.totalCart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchCart: (data) => dispatch({ type: "FETCH_CART" ,payload:data}),
clearCart: () => dispatch({ type: "CLEAR_CART"})
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cartview);
