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
// import { fetchCart } from "../helpers/cart.helpers";
import { Spin } from "antd";
import { updateCart, clearCart } from "../Redux/user/userActionCreators";
const SERVER = process.env.REACT_APP_SERVER;

class Cartview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visible: false,
      paymentData: {},
      visibleError: false,
    };
  }
  makePayment = (token) => {
    const body = {
      token,
      products: this.props.data,
      paymentStatus: "",
    };
    return axios
      .post(`${SERVER}/api/cart/checkout/stripe`, body, {
        headers: {
          token: localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === "succeeded") {
          this.props.clearCart();
          this.setState({
            visible: true,
            paymentData: response.data,
          });
        }
        if (!response && response.data.status !== "succeeded") {
          this.setState({
            visibleError: true,
          })
          window.location.href="/user/dashboard"
        }
      })
      .catch((err) => {
        if (err) {
          this.setState({
            visibleError: true,
          });
        }
        console.log(err);
      });
  };
  handleCancel = () => {
    this.setState({ visible: false, visibleError: false });
  };
  render() {
    const { visible, visibleError } = this.state;

    

    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }
    return (
      <Spin spinning={this.props.loading} size="default">
        <div className="cart-view-container">
          <div className="cart-card-container">
            {this.props.data.map((element, index) => {
              return (
                <Cartcard
                  title={element.title}
                  price={element.price}
                  img={element.img}
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
            {this.props.data.length !== 0 ? (
              <StripeCheckout
                stripeKey="pk_test_MY0CvrDbKKXZg0IH14zk0Gu100Wk4rnFmy"
                token={this.makePayment}
                amount={this.props.totalCart * 100}
                name="Buy Fruits"
                shippingAddress
                billingAddress
              />
            ) : null}

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
                  </center>,
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
                    </Fragment>,
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
                  </center>,
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
                    </Fragment>,
                  ]}
                />
              </Modal>
            </div>
            {/* </ReactStripeCheckout> */}
          </div>
        </div>
      </Spin>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.user.userCart,
    totalCart: state.user.totalCartPrice,
    loading: state.user.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // fetchCart: (data) => dispatch({ type: "FETCH_CART", payload: data }),
    clearCart: () => dispatch(clearCart()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cartview);
