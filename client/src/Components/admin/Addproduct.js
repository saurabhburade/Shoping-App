import React, { Component, Fragment } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios"
const SERVER = process.env.REACT_APP_SERVER;

class Addproduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      price: 0,
      productImg:{}
    };
  }
  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };
  handleDescriptionChange = event => {
    this.setState({
      description: event.target.value
    });
  };
  handlePriceChange = event => {
    this.setState({
      price: event.target.value
    });
  };
  handleImageChange=event=>{
      console.log(event.target.files[0]);
      this.setState({
        productImg: event.target.files[0]
      });
  }
  submitAddProduct = event => {
    event.preventDefault();
    const formData = new FormData();
    
    formData.append("productImage",
      this.state.productImg)
    console.log(formData.getAll("productImage"));

    
    const productData = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price
    
    };
formData.set("productData", JSON.stringify(productData));
    

    axios.post(
      `${SERVER}/api/products/upload`,
      
     formData
      ,
      {
        headers: {
          accept: "multipart/form-data",
          "content-type": "multipart/form-data",
          message: "Hello"
        }
      }
    )
    .then(data=>{
      console.log(data);
    })
    


  

    
    
  };
  render() {
    return (
      <Fragment>
        <div className="add-product-form-container">
          <Form

            className="login-form"
            name="basic"
            initialValues={{ remember: true }}
            
          >
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Please Enter Title!" }]}
            >
              <Input
                onChange={this.handleTitleChange}
                placeholder="Title of Product "
                style={{
                  width: 300
                }}
              />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Please enter description!" }]}
            >
              <Input
                onChange={this.handleDescriptionChange}
                placeholder="Description of Product  "
                style={{
                  width: 300
                }}
              />
            </Form.Item>
            <Form.Item
              name="price"
              rules={[{ required: true, message: "Please enter price!" }]}
            >
              <Input
                onChange={this.handlePriceChange}
                type="Number"
                placeholder="Price of Product"
                style={{
                  width: 300
                }}
              />
            </Form.Item>

            <Form.Item
              name="productImage"
              rules={[{ required: true, message: "Please Upload file" }]}
            >
              <Input
                type="file"
                onChange={this.handleImageChange}
                placeholder="Product Image"
                style={{
                  width: 300
                }}
              />
            </Form.Item>

            <Form.Item
            //   {...tailLayout}
            >
              <Button
                style={{ boxShadow: "0px 2px 2px gainsboro" }}
                type="primary"
                htmlType="submit"
                onClick={this.submitAddProduct}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default Addproduct
