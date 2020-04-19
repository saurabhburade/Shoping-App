import React, { Component, Fragment } from "react";
import { Form, Input, Button, notification,} from "antd";
import {authLogin,isAuthenticated} from "../auth/auth"
import { Redirect } from "react-router-dom";
import  "../Components/css/Login.css"
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pass: "",
      email:""
    };
  }
  changePass = event => {
    this.setState({
      pass: event.target.value
    });
  };
  changeEmail=(event)=>{
        this.setState({
          email: event.target.value
        });  
  }
    openNotification = placement => {
       notification.info({
         //   message: `Notification ${placement}`,
         message: `Invalid Credentials`,
         description:
           "Please Enter Correct Email & Password",
         placement,
        style:{
        fontWeight:"bold",
        color:"orangered"
        }
       });
     };
  submitLogin = (event) => {
      event.preventDefault()
    console.log(this.state);
  if (this.state.email !== "" && this.state.pass !== "") {
    const loginData = {
      pass: this.state.pass,
      email: this.state.email
    };
    authLogin(loginData)
    .then(payload=>{
      if (payload&&window!==undefined) {
                localStorage.setItem("jwt",payload.data.token);
                localStorage.setItem("logged", true);
                window.location.href="/user/dashboard"   

            }
    }).catch(err=>{
        if (err&&!isAuthenticated() && localStorage.getItem("logged") !== "true") {
          this.openNotification("topRight");
        }
    })
    ;
    // window.location.href = "/user/dashboard";

    // if (isAuthenticated()) {
    // window.location.href = "/user/dashboard";

    // }
    // if (!isAuthenticated() && localStorage.getItem("logged") !== "true") {
    //   this.openNotification("topRight");
    // }
  }
    
  };

  render() {
        
        if (isAuthenticated()) {
          return <Redirect to="/user/dashboard" />;     
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
              label="Email  "
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                style={{
                 
                }}
                value={this.state.email}
                onChange={this.changeEmail}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input.Password
                style={{
                  width:" 18em"
                }}
                value={this.state.pass}
                onChange={this.changePass}
              />
            </Form.Item>

            <Form.Item
            >
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

export default Login;
