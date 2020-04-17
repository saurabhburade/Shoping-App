import React, { Component, Fragment } from "react";
import { Form, Input, Button, notification } from "antd";
// import { authSignup, isAuthenticated } from "../auth/auth";
import { Redirect } from "react-router-dom";
import { authAdminSignup, isAuthorised, updateAdminProfile } from "./auth";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      author: "",
      confPass: "",
      pass: "",
    };
  }
  changeFname = (event) => {
    this.setState({
      fname: event.target.value,
    });
    console.log(this.state);
  };
  changeLname = (event) => {
    this.setState({
      lname: event.target.value,
    });
  };
  changeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  changeConfPass = (event) => {
    this.setState({
      confPass: event.target.value,
    });
  };
  changePass = (event) => {
    this.setState({
      pass: event.target.value,
    });
  };
  changeAuthor = (event) => {
    this.setState({
      author: event.target.value,
    });
  };
  openNotification = (
    placement,
    message = "Invalid Credentials",
    description = "Please enter valid details or Your already registered"
  ) => {
    notification.info({
      //   message: `Notification ${placement}`,
      message: `${message}`,
      description: `${description}`,
      placement,
      //  icon: (
      //    <SmileOutlined style={{ color: "#108ee9", transform: "scale(2)" }} />
      //  ),
      style: {
        fontWeight: "bold",
        color: "orangered",
      },
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("object submit", this.state);
    if (
      (this.state.pass === this.state.confPass) !== "" &&
      this.state.email !== "" &&
      this.state.fname !== "" &&
      this.state.lname !== ""
    ) {
      const { fname, lname, email, author, pass } = this.state;
      
      const regData = {
        fname,
        lname,
        email,
        pass,
        author,
      };
      console.log(regData);
      this.setState({
        fname: "",
        lname: "",
        email: "",
        author: "",
        confPass: "",
        pass: "",
      });
      updateAdminProfile(regData)
        .then((payload) => {
          if (payload && window !== undefined) {
          
            if (isAuthorised()) {
              this.openNotification(
                "topRight",
                "Updated Successfully",
                ""
              );
            }
            window.location.reload();
          }
        })
        .catch((err) => {
          if (err && !isAuthorised()) {
            this.openNotification("topRight");
          }
        });
    } else {
      this.openNotification("topRight");
    }
  };
  render() {
 
    return (
      <Fragment>
        <div className="update-product-form-container">
          <Form
            className="login-form"
            name="basic"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="fname"
              rules={[
                { required: true, message: "Please input your first Name!" },
              ]}
            >
              <Input
                placeholder="First Name  "
                style={{
                  width: 300,
                }}
                value={this.state.fname}
                onChange={this.changeFname}
              />
            </Form.Item>
            <Form.Item
              name="lname"
              rules={[
                { required: true, message: "Please input your Last Name!" },
              ]}
            >
              <Input
                placeholder="Last Name  "
                style={{
                  width: 300,
                }}
                value={this.state.lname}
                onChange={this.changeLname}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                placeholder="Email"
                style={{
                  width: 300,
                }}
                value={this.state.email}
                onChange={this.changeEmail}
              />
            </Form.Item>{" "}
            <Form.Item
              name="author"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                placeholder="Author Name"
                style={{
                  width: 300,
                }}
                value={this.state.author}
                onChange={this.changeAuthor}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={this.state.pass}
                onChange={this.changePass}
                placeholder="Password"
                style={{
                  width: 300,
                }}
              />
            </Form.Item>
            <Form.Item
              name="confpassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                style={{
                  width: 300,
                }}
                value={this.state.confPass}
                onChange={this.changeConfPass}
              />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ boxShadow: "0px 2px 2px gainsboro" }}
                type="primary"
                htmlType="submit"
                onClick={this.handleSubmit}
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

export default EditProfile;
