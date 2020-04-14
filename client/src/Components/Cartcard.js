import React, { Component } from "react";
import { Button } from "antd";
import {
  DeleteTwoTone,
  PlusCircleTwoTone,
  MinusCircleTwoTone
} from "@ant-design/icons";
import "./css/Cartcard.css";
import { connect } from "react-redux";
class Cartcard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: this.props.price,
      amt: this.props.quantity
    };
  }
  incAmtCart = () => {

    this.setState({
      ...this.state,
      amt: 1 + this.state.amt,
      price: this.props.price + this.state.price
    });
    setTimeout(() => {
      this.props.incCartTotalPrice({
        index: this.props.index,
        price: this.props.price,
        amt: this.state.amt
      });
    }, 100);
  };
  decAmtCart = () => {
    if (this.state.amt === 0 && this.state.price === 0) {
      this.setState({
        ...this.state,
        amt: 0,
        price: 0
      });
    } else {
      this.setState({
        ...this.state,
        amt: this.state.amt - 1,
        price: this.state.price - this.props.price
      });

      setTimeout(() => {
        this.props.decCartTotalPrice({
          index: this.props.index,
          price: this.props.price,
          amt: this.state.amt
        });
      }, 100);
    }
  };
  delCart=()=>{
    this.props.updateCart({ index: this.props.index });
  }
  render() {
    return (
      <div className="cart-card">
        <img src={this.props.img} alt="cart-img" className="cart-img" />
        <p className="cart-title"> {this.props.title}</p>
        <p className="cart-description">{this.props.description}</p>
        <div className="amt-cart">
          <Button
            type="circle"
            title="Cart"
            size="medium"
            style={{
              border: "none"
            }}
            onClick={this.decAmtCart}
          >
            <MinusCircleTwoTone
              style={{
                transform: "scale(1.2)",
                color: "#108ee9"
              }}
            />
          </Button>

          <p className="prod-cart-amt">{this.state.amt}</p>

          <Button
            type="circle"
            title="Cart"
            size="medium"
            style={{
              border: "none"
            }}
            onClick={this.incAmtCart}
          >
            <PlusCircleTwoTone
              style={{
                transform: "scale(1.2)",
                color: "#108ee9"
              }}
            />
          </Button>
        </div>
        <p className="prod-cart-price">${this.props.price*this.state.amt}</p>
        <div className="cart-btns">
          <Button
            title="Cart"
            size="medium"
            style={{
              border: "none"
            }}
            onClick={this.delCart}
          >
            <DeleteTwoTone
              style={{
                transform: "scale(1.8)",
                color: "#108ee9"
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
    incCartTotalPrice: data =>
      dispatch({ type: "INC_CART_TOTAL", payload: data }),
    decCartTotalPrice: data =>
      dispatch({ type: "DEC_CART_TOTAL", payload: data }),
    updateCart: data => dispatch({ type: "UPDATE_CART", payload: data })
  };
};
const mapStateToProps = state => {
  return {
    cartCount: state.cartCount
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cartcard);
