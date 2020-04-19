import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Menu } from "antd";

import {
  UnlockTwoTone,
  ShoppingCartOutlined,
  LogoutOutlined,
  SmileTwoTone,
  AppstoreOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import "./css/Header.css";
import { isAuthenticated } from "../auth/auth";
import { isAuthorised } from "./admin/auth";
// import { fetchProducts } from "../helpers/products.helpers";
const { SubMenu } = Menu;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badgeValue: this.props.badgeValue,
      toggle: false,
    };
  }
  componentWillMount() {
    this.setState({
      badgeValue: this.props.badgeValue,
    });
  }
  handleClick = (e) => {
    console.log("click ", e);
  };
  toggleMenu = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };
  render() {
    // const { Search } = Input;
    const logout = () => {
      localStorage.clear();
      window.location.href = "/login";
    };

    return (
      <div className="header">
        <Link to={"/"}>
          <div className="logo">
            FRUITS SHOP
            <span role={"img"}>&#x1F505;</span>
          </div>
        </Link>
        {/* <div className="search"></div> */}

        {window.screen.width < 750 ? (
          <Fragment>
            <div className="nav-container">
              <div className="menu" onClick={this.toggleMenu}>
                <MenuOutlined
                  className="menu-icon"
                  style={{
                    
                  }}
                />
              </div>
              <div className="menu-list-container">
                <div
                  className={
                    this.state.toggle
                      ? "nav-items-container-active"
                      : "nav-items-container"
                  }
                >
                  <div className="nav-item-container">
                    <Link className="nav-item" to={"/products"}>
                      <div className="menu-list-icon">
                        <MenuOutlined />
                      </div>
                      <p className="menu-list-title">Shop !</p>
                    </Link>
                  </div>
                  <div className="nav-item-container">
                    <Link className="nav-item" to={"/cart"}>
                      <div className="menu-list-icon">
                        <ShoppingCartOutlined />
                      </div>
                      <p className="menu-list-title"> Cart </p>
                      <span>
                        <Badge
                          style={{
                            transform: "scale(1)",
                            textAlign: "right",
                          }}
                          count={this.props.badgeValue}
                          className="site-badge-count-4"
                        ></Badge>
                      </span>
                    </Link>
                  </div>
                  {isAuthenticated() && !isAuthorised() ? (
                    <Fragment>
                      <div className="nav-item-container">
                        <Link className="nav-item" to={"/user/dashboard"}>
                          <div className="menu-list-icon">
                            <SmileTwoTone />
                          </div>
                          <p className="menu-list-title"> PROFILE</p>
                        </Link>
                      </div>
                      <div className="nav-item-container" onClick={logout}>
                        <Link className="nav-item" to={"/login"}>
                          <div className="menu-list-icon">
                            <LogoutOutlined />
                          </div>
                          <p className="menu-list-title"> LOGOUT</p>
                        </Link>
                      </div>
                    </Fragment>
                  ) : isAuthorised() ? (
                    <Fragment>
                      <div className="nav-item-container">
                        <Link className="nav-item" to={"/admin/dashboard"}>
                          <div className="menu-list-icon">
                            <SmileTwoTone />
                          </div>
                          <p className="menu-list-title"> PROFILE</p>
                        </Link>
                      </div>
                      <div className="nav-item-container" onClick={logout}>
                        <Link className="nav-item" to={"/admin/login"}>
                          <div className="menu-list-icon">
                            <LogoutOutlined />
                          </div>
                          <p className="menu-list-title">LOGOUT</p>
                        </Link>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className="nav-item-container">
                        <Link className="nav-item" to={"/login"}>
                          <div className="menu-list-icon">
                            <LogoutOutlined />
                          </div>
                          <p className="menu-list-title"> LOGIN</p>
                        </Link>
                      </div>

                      <div className="nav-item-container">
                        <Link className="nav-item" to={"/signup"}>
                          <div className="menu-list-icon">
                            <LogoutOutlined />
                          </div>
                          <p className="menu-list-title"> SIGNUP</p>
                        </Link>
                      </div>
                    </Fragment>
                  )}
                  {/* <div className="nav-item-container">Item !</div> */}
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className="menubtns">
            <Link to={"/products"}>
              <div className="logo">Shop</div>
            </Link>
            <Badge count={this.props.badgeValue} className="site-badge-count-4">
              <Link to={"/cart"}>
                <Button
                  title="Cart"
                  size="medium"
                  style={{
                    border: "none",
                  }}
                >
                  <ShoppingCartOutlined
                    style={{
                      transform: "scale(1.8)",
                      color: "#108ee9",
                    }}
                  />
                </Button>
              </Link>
            </Badge>
            {isAuthenticated() && !isAuthorised() ? (
              <Fragment>
                <Link to={"/user/dashboard"}>
                  <Button size="medium" icon={<SmileTwoTone />}>
                    PROFILE
                  </Button>
                </Link>

                <Link to={"/login"}>
                  <Button
                    size="medium"
                    onClick={logout}
                    icon={<LogoutOutlined />}
                  >
                    Logout
                  </Button>
                </Link>
              </Fragment>
            ) : isAuthorised() ? (
              <Fragment>
                <Link to={"/admin/dashboard"}>
                  <Button size="medium" icon={<SmileTwoTone />}>
                    PROFILE
                  </Button>
                </Link>

                <Link to={"/login"}>
                  <Button
                    size="medium"
                    onClick={logout}
                    icon={<LogoutOutlined />}
                  >
                    Logout
                  </Button>
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link to={"/login"}>
                  <Button size="medium" icon={<UnlockTwoTone />}>
                    LOGIN
                  </Button>
                </Link>
                <Link to={"/signup"}>
                  <Button size="medium" icon={<UnlockTwoTone />}>
                    SIGNUP
                  </Button>
                </Link>
              </Fragment>
            )}
          </div>
        )}
        {/* <Menu
          onClick={this.handleClick}
          style={{ width: "50%", position: "absolute", right: 0 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <SubMenu
            key="sub2"
            title={
              <span>
                <AppstoreOutlined />
                <span>Menu</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
          </SubMenu>
        </Menu> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    badgeValue: state.user.cartCount,
  };
};

export default connect(mapStateToProps)(Header);
