import React, { Component } from "react";
import {
  // PoweroffOutlined,
  CheckOutlined,
  AppstoreAddOutlined
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Button} from "antd";
import "./css/Productcard.css";
import { addToCart } from "../Redux/user/userActionCreators";
const SERVER = process.env.REACT_APP_SERVER;

class Productcard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      iconLoading: false,
      iconDefault: <CheckOutlined />,
      iconsuccess: <AppstoreAddOutlined />,
      data: [
        {
          productId: this.props.productId,
          title: this.props.title,
          price: this.props.price,
          description: this.props.description,
          img: this.props.img,
          quantity: 1,
          totalPrice: this.props.price
        }
      ],
      cartCount: props.cartCount
    };
  }

  enterLoading = () => {
    this.setState({ loading: true });
  };

  enterIconLoading = () => {
    this.setState({
      ...this.state,
      cartCount: this.state.cartCount + 1
    });
    this.setState({ iconLoading: true });
    setTimeout(() => {
      this.setState({
        iconsuccess: this.state.iconDefault,
        loading: false,
        iconLoading: false
      });
      this.props.addToCart({
        data: this.state.data,
        cartCount: this.state.cartCount
      });
    // this.props.addToCart();
      
    }, 500);

  };

  render() {
    const API = `${SERVER}/products/`;
   
    return (
      <div className="prod-card">
        <div className="prod-img-container">
          <img className="prod-img" src={API+this.props.img} alt="tshirt" />
        </div>

        <div className="prod-detail">
          <div className="prod-price-title">
            <p className="prod-title">{this.props.title}</p>
            <p className="prod-price">$ {this.props.price}</p>
          </div>

          <p className="prod-detail">{this.props.description}</p>
          <div className="prod-card-btns">
            <Button
              type="round"
              icon={this.state.iconsuccess}
              loading={this.state.iconLoading}
              onClick={this.enterIconLoading}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCart: (data) => dispatch(addToCart(data)),
  };
};
const mapStateToProps = state => {
  return {
    cartCount: state.cartCount
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Productcard);
