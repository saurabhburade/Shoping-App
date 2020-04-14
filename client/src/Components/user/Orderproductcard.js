import React, { Fragment } from "react";
const SERVER = process.env.REACT_APP_SERVER;

function Orderproductcard(props) {
    return (
      <Fragment>
        <div className="ordered-prod-card">
          <div className="order-prod-img-cont">
            <img
              className="order-prod-img"
              src={SERVER + "/products/" + props.img}
              alt="prod img"
            />
          </div>
          <div className="order-prod-price">${props.price}</div>
          <div className="prod-name">{props.title}</div>
          <div className="order-prod-quantity">Qt : {props.quantity}</div>
        </div>
      </Fragment>
    );
}

export default Orderproductcard;
