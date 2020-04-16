import React, { Component } from "react";
import {
  // PoweroffOutlined,
  CheckOutlined,
  AppstoreAddOutlined,
  ExclamationCircleOutlined,
  EditTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Modal, Button } from "antd";
import { Form, Input } from "antd";

import "../css/Productcard.css";
import { deleteProduct, updateProduct } from "./helper";
const { confirm } = Modal;

const SERVER = process.env.REACT_APP_SERVER;

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DeleteVisible: false,
      EditVisible: false,
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
          totalPrice: this.props.price,
        },
      ],
      cartCount: props.cartCount,
      title: this.props.title,
      description: this.props.description,
      price: this.props.price,
    };
  }

  enterLoading = () => {
    this.setState({ loading: true });
  };

  enterIconLoading = () => {
    this.setState({
      ...this.state,
      cartCount: this.state.cartCount + 1,
    });
    this.setState({ iconLoading: true });
    setTimeout(() => {
      this.setState({
        iconsuccess: this.state.iconDefault,
        loading: false,
        iconLoading: false,
      });
      this.props.addToCart({
        data: this.state.data,
        cartCount: this.state.cartCount,
      });
      // this.props.addToCart();
    }, 500);
  };

  showDeleteConfirm = () => {
    this.setState({
      DeleteVisible: true,
    });
  };
  handleDeleteCancel = () => {
    this.setState({
      DeleteVisible: false,
      EditVisible: false,
    });
  };
  handleDeleteOk = () => {
    deleteProduct({ productId: this.props.productId })
      .then((data) => {
        if (data) {
          window.location.reload();
        }
      })
      .catch((err) => {
        alert("Fail");
        console.log(err);
      });
  };
  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  handlePriceChange = (event) => {
    this.setState({
      price: event.target.value,
    });
  };
  showEditProduct = () => {
    this.setState({
      DeleteVisible: false,
      EditVisible: true,
    });
  };
  handleEditCancel = () => {
    this.setState({
      DeleteVisible: false,
      EditVisible: false,
    });
  };
  handleEditOk = () => {
          const productData = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            productId: this.props.productId,
          };
    updateProduct(productData)
      .then((data) => {
        if (data) {
          window.location.reload();
        }
      })
      .catch((err) => {
        alert("Fail");
        console.log(err);
      });
  };
  render() {
    const API = `${SERVER}/products/`;

    return (
      <div className="prod-card">
        <div className="prod-img-container">
          <img className="prod-img" src={API + this.props.img} alt="tshirt" />
        </div>

        <div className="prod-detail">
          <div className="prod-price-title">
            <p className="prod-title">{this.props.title}</p>
            <p className="prod-price">$ {this.props.price}</p>
          </div>

          <p className="prod-detail">{this.props.description}</p>
          <div className="prod-card-btns">
            <Button
              icon={<EditTwoTone />}
              type="circle"
              loading={this.state.iconLoading}
              onClick={this.showEditProduct}
              style={{ margin: "0% 5%" }}
            ></Button>
            <Button
              icon={<DeleteOutlined />}
              loading={this.state.iconLoading}
              onClick={this.showDeleteConfirm}
              style={{ margin: "0% 5%" }}
              type="primary"
              danger
            ></Button>
          </div>
        </div>
        <Modal
          title="Confirm Delete "
          visible={this.state.DeleteVisible}
          onOk={this.handleDeleteOk}
          onCancel={this.handleDeleteCancel}
        >
          <strong>
            Are you sure to delete{" "}
            <span style={{ color: "red" }}>{this.props.title}</span>
          </strong>
        </Modal>
        <Modal
          title="Edit Product Details"
          visible={this.state.EditVisible}
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancel}
        >
          <div className="update-product-form-container">
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleTitleChange}
                placeholder="Title of Product "
                style={{
                  width: 300,
                }}
              />
              <br />
              <Input
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                placeholder="Description of Product  "
                style={{
                  width: 300,
                }}
              />
              <br />
              <Input
                value={this.state.price}
                onChange={this.handlePriceChange}
                type="Number"
                placeholder="Price of Product"
                style={{
                  width: 300,
                }}
              />
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // addToCart: (data) => dispatch(addToCart(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    cartCount: state.cartCount,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
