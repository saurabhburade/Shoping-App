import React, { Component, Fragment } from "react";
import apple from "./images/apple.png";
import Productcard from "./Productcard";
import { connect } from "react-redux";
import { fetchShoppingItems } from "../Redux/products/productActionCreators";
const SERVER = process.env.REACT_APP_SERVER;

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
     this.props.fetchProducts();
  }

  render() {


    return (
      <Fragment>
        {
        this.props.data.map((element, index) => {
          return (
            <Productcard
            key={index}
              title={element.title}
              price={element.price}
              description={element.description}
              img={ element.productImagePath}
              productId={element._id}
            />
          );
        })}

      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.products.shopItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchShoppingItems()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
