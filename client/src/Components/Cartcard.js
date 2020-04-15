import React, { Component } from "react";
import { Button } from "antd";
import {
  DeleteTwoTone,
  PlusCircleTwoTone,
  MinusCircleTwoTone
} from "@ant-design/icons";
import "./css/Cartcard.css";

import { connect } from "react-redux";
import { decCart, updateCart, deleteCart } from "../Redux/user/userActionCreators";
const SERVER = process.env.REACT_APP_SERVER;

class Cartcard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: this.props.price,
      quantity: this.props.quantity,
    };
  }
  incQuantityCart = () => {
    this.setState({
      // ...this.state,
      quantity: 1 + this.state.quantity,
      price: this.props.price + this.state.price,
    });
  
      this.props.incCartTotalPrice({
        index: this.props.index,
        price: this.props.price,
        quantity: this.state.quantity,
      });

  };
  decQuantityCart = () => {
    if (this.state.quantity === 0 && this.state.price === 0) {
      this.setState({
        // ...this.state,
        quantity: 0,
        price: 0,
      });
    } else {
      this.setState({
        // ...this.state,
        quantity: this.state.quantity - 1,
        price:this.state.quantity *this.props.price,
      });

    
        this.props.decCartTotalPrice({
          index: this.props.index,
          price: this.props.price,
          quantity: this.state.quantity,
        });
  
   
    }
  };
  delCart = () => {
    this.props.deleteCart({ index: this.props.index });
  };
  render() {
    const API = `${SERVER}/products/`;
    return (
      <div className="cart-card">
        <img src={API + this.props.img} alt="cart-img" className="cart-img" />
        <p className="cart-title"> {this.props.title}</p>
        <p className="cart-description">{this.props.description}</p>
        <div className="amt-cart">
          <Button
            type="circle"
            title="Cart"
            size="medium"
            style={{
              border: "none",
            }}
            onClick={this.decQuantityCart}
          >
            <MinusCircleTwoTone
              style={{
                transform: "scale(1.2)",
                color: "#108ee9",
              }}
            />
          </Button>

          <p className="prod-cart-amt">{this.props.quantity}</p>

          <Button
            type="circle"
            title="Cart"
            size="medium"
            style={{
              border: "none",
            }}
            onClick={this.incQuantityCart}
          >
            <PlusCircleTwoTone
              style={{
                transform: "scale(1.2)",
                color: "#108ee9",
              }}
            />
          </Button>
        </div>
        <p className="prod-cart-price">
          ${this.props.price * this.props.quantity}
        </p>
        <div className="cart-btns">
          <Button
            title="Cart"
            size="medium"
            style={{
              border: "none",
            }}
            onClick={this.delCart}
          >
            <DeleteTwoTone
              style={{
                transform: "scale(1.8)",
                color: "#108ee9",
              }}
            />
          </Button>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    incCartTotalPrice: (data) => dispatch(updateCart(data)),
    decCartTotalPrice: (data) => dispatch(updateCart(data)),
    deleteCart: (data) => dispatch(deleteCart(data)),
  };
};
const mapStateToProps = state => {
  return {
    cartCount: state.cartCount
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cartcard);
