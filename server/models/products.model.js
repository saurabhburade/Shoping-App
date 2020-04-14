const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    productImagePath:{
      type:String
    }
  },
  {
    timestamps: true
  }
);
mongoose.plugin(uniqueValidator)
module.exports = mongoose.model("Products", productSchema);