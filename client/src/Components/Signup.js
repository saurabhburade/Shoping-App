import React, { Component, Fragment } from "react";
import { Form, Input, Button, notification } from "antd";
import { authSignup,isAuthenticated } from "../auth/auth";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      email: "",

      confPass: "",
      pass: ""
    };
  }
  changeFname = event => {
    this.setState({
      fname: event.target.value
    });
    console.log(this.state);
  };
  changeLname = event => {
    this.setState({
      lname: event.target.value
    });
  };
  changeEmail = event => {
    this.setState({
      email: event.target.value
    });
  };
  changeConfPass = event => {
    this.setState({
      confPass: event.target.value
    });
  };
  changePass = event => {
    this.setState({
      pass: event.target.value
    });
  };
  openNotification = (
    placement,
    message = "Invalid Credentials",
    description = "Please Enter Correct Email & Password"
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
        color: "orangered"
      }
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log("object submit", this.state);
    if (this.state.pass === this.state.confPass) {
      const { fname, lname, email } = this.state;
      const password = this.state.pass;
      const regData = {
        fname,
        lname,
        email,
        password
      };
      console.log(regData);
      this.setState({
        fname: "",
        lname: "",
        email: "",

        confPass: "",
        pass: ""
      });
      authSignup(regData);

      if (!isAuthenticated()) {
        this.openNotification("topRight");
      }
      if (isAuthenticated()) {
        this.openNotification("topRight","Registered Successfully","Now You can login");
      }
    }
  };
  render() {
        if (isAuthenticated()) {
          return <Redirect to="/products"/>
        }
    return (
      <Fragment>
        <div className="login-form-container">
          <Form
            className="login-form"
            name="basic"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="fname"
              rules={[
                { required: true, message: "Please input your first Name!" }
              ]}
            >
              <Input
                placeholder="First Name  "
                style={{
                  width: 300
                }}
                value={this.state.fname}
                onChange={this.changeFname}
              />
            </Form.Item>
            <Form.Item
              name="lname"
              rules={[
                { required: true, message: "Please input your Last Name!" }
              ]}
            >
              <Input
                placeholder="Last Name  "
                style={{
                  width: 300
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
                  width: 300
                }}
                value={this.state.email}
                onChange={this.changeEmail}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input.Password
                value={this.state.pass}
                onChange={this.changePass}
                placeholder="Password"
                style={{
                  width: 300
                }}
              />
            </Form.Item>

            <Form.Item
              name="confpassword"
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                style={{
                  width: 300
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

export default Signup
