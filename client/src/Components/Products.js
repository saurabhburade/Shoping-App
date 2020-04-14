import React, { Component, Fragment } from "react";
import apple from "./images/apple.png";
import Productcard from "./Productcard";
import { connect } from "react-redux";
import { fetchProducts } from "../helpers/products.helpers";
const SERVER = process.env.REACT_APP_SERVER;

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    fetchProducts().then(value=>{
    if (value) {
      this.setState({
        data: value.data
      });
    }
    
    }).catch(err=>{
      console.log(err);
    })
  }
  render() {
    const API = `${SERVER}/products/`;


    return (
      <Fragment>
        {// fetchProducts()
        this.state.data.map((element, index) => {
          return (
            <Productcard
            key={index}
              title={element.title}
              price={element.price}
              description={element.description}
              img={API + element.productImagePath}
              productId={element._id}
            />
          );
        })}
        <Productcard
          title="Apple"
          price={10}
          description="lorem ipsum fsjfnskj"
          img={apple}
        ></Productcard>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.shop
  };
};
export default connect(mapStateToProps)(Products);
// export default Products
