import React, { Component, Fragment } from "react";
import { Form, Input, Button, notification } from "antd";

import { Redirect } from "react-router-dom";
import "../css/Login.css";
import { isAuthorised, authAdminLogin } from "./auth";
class AdminLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pass: "",
      email: "",
      author: "",
    };
  }
  changePass = (event) => {
    this.setState({
      pass: event.target.value,
    });
  };
  changeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  changeAuthor = (event) => {
    this.setState({
      author: event.target.value,
    });
  };
  openNotification = (placement) => {
    notification.info({
      //   message: `Notification ${placement}`,
      message: `Invalid Credentials`,
      description: "Please Enter Correct Email & Password",
      placement,
      style: {
        fontWeight: "bold",
        color: "orangered",
      },
    });
  };
  submitLogin = (event) => {
    event.preventDefault();
    console.log(this.state);
    if (
      this.state.email !== "" &&
      this.state.pass !== "" &&
      this.state.author !== ""
    ) {
      const loginData = {
        pass: this.state.pass,
        email: this.state.email,
        author: this.state.author,
      };
      authAdminLogin(loginData)
        .then((payload) => {
          if (payload && window !== undefined) {
            localStorage.setItem("jwt", payload.data.token);
            localStorage.setItem("logged", true);
            localStorage.setItem("admin", true);
            localStorage.setItem("admin_token", payload.data.admin_token);
            window.location.href = "/";
          }
        })
        .catch((err) => {
          if (err) {
            this.openNotification("topRight");
          }
        });
     
    }
    else{
            this.openNotification("topRight");
      
    }
  };

  render() {
    console.log("isAuthorised()", isAuthorised());
    if (isAuthorised()) {
      return <Redirect to="admin/dashboard" />;
    }
    return (
      <Fragment>
        <div className="login-form-container">
          <Form
            action={this.submitLogin}
            className="login-form"
            name="basic"
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Author"
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
              label="Email  "
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                style={{
                  width: 300,
                }}
                value={this.state.email}
                onChange={this.changeEmail}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                style={{
                  width: 300,
                }}
                value={this.state.pass}
                onChange={this.changePass}
              />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ boxShadow: "0px 2px 2px gainsboro" }}
                type="primary"
                htmlType="submit"
                onClick={this.submitLogin}
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

export default AdminLogin;
