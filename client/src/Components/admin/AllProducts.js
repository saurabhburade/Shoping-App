import React, { Component, Fragment } from "react";

// import Productcard from "./Productcard";
import { connect } from "react-redux";
import { fetchShoppingItems } from "../../Redux/products/productActionCreators";
import ProductCard from "./ProductCard";
const SERVER = process.env.REACT_APP_SERVER;

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div className="all-products-admin">
        {this.props.data.map((element, index) => {
          return (
            <ProductCard
              key={index}
              title={element.title}
              price={element.price}
              description={element.description}
              img={element.productImagePath}
              productId={element._id}
            />
          );
        })}
        {/* <Productcard
          title="Apple"
          price={10}
          description="lorem ipsum fsjfnskj"
          img={apple}
        ></Productcard> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.products.shopItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchShoppingItems()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
