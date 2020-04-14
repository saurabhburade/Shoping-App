import React, { Component, Fragment } from "react";
import {connect  } from "react-redux";
import { Button } from 'antd';
import {
  UnlockTwoTone,
  ShoppingCartOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { Badge } from 'antd';
import {Link} from "react-router-dom";
import "./css/Header.css"
import { isAuthenticated } from '../auth/auth';
import { fetchProducts } from "../helpers/products.helpers";
class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
          badgeValue:this.props.badgeValue
        };
    }
componentWillMount(){
  this.setState({
    badgeValue: this.props.badgeValue
  });
}
    render() {
        // const { Search } = Input;
        const logout=()=>{
          localStorage.clear()
          window.location.href="/login"    
        }
    
        return (
          <div className="header">
            <Link to={"/"}>
              <div className="logo">
                LOGO{" "}
                <span role={"img"}>
                  &#x1F505;
                </span>
              </div>
            </Link>
            <div className="search">
            </div>
            <div className="menubtns">
              <Link to={"/products"}>
                <div className="logo">Shop</div>
              </Link>
              <Badge
                count={this.props.badgeValue}
                className="site-badge-count-4"
              >
                <Link to={"/cart"}>
                  <Button
                    title="Cart"
                    size="medium"
                    style={{
                      border: "none"
                    }}
                    onClick={() => {
                      fetchProducts();
                    }}
                  >
                    <ShoppingCartOutlined
                      style={{
                        transform: "scale(1.8)",
                        color: "#108ee9"
                      }}
                    />
                  </Button>
                </Link>
              </Badge>
              {isAuthenticated() ? (
                <Fragment>
                  <Link to={"/user/dashboard"}>
                    <Button size="medium" icon={<UnlockTwoTone />}>
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
          </div>
        );
    }
}
const mapStateToProps=state=>{
    return {
      badgeValue: state.cartCount,
      products: state.products
    };
}

export default connect(mapStateToProps) (Header)
