const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const {ObjectId} =Schema.Types;

const UserSchema = new Schema(
  {
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true,
      unique: true
    },
    cart: {
      items: [
        {
          productId: {
            type: ObjectId,
            ref: "Products",
            required: true
          },
          quantity: {
            type: Number,
            required: true
          }
        }
      ]
    },
    orders: {
      items: [
        {
          productId: {
            type: ObjectId,
            ref: "Products",
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          chargeId: {
            type: String,
            required: true
          }
        }
      ]
    }
  },
  {
    timestamps: true
  }
);


mongoose.plugin(uniqueValidator)
const User= mongoose.model("User",UserSchema)
module.exports = User
