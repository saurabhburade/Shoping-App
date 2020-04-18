const router = require("express").Router();
const User = require("../models/user.model.js");
const Products = require("../models/products.model.js");
require("dotenv").config();
const lodash = require("lodash");
const bcrypt = require("bcrypt");
// const crypto=require('crypto');
const stripe = require("stripe")("sk_test_4dtRajw2ujrNWT3pHjxG9CGx00fsLCesJI");

const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/isAuth");

const JWT_SECRET = process.env.JWT_SECRET;
router.get("/fetch", (req, res) => {
  // console.log(req);
  // User.deleteMany({email:null})
  const { token } = req.headers;
  console.log("tokenin fetcjh@@@@", token);
  if (token) {
    User.find({ token })
      .select("-_id")
      .select("-password")
      .select("-token")
      .select("-updatedAt")
      .select("-__v")
      .then((user) => {
        console.log(user, user.length);
        const orders = user[0].orders.items;
        if (user.length !== 0) {
          let arr = [];

          if (orders.length !== 0) {
            orders.forEach((element) => {
              // console.log("foreach", element);
              // element=JSON.stringify(element)
              if (element.productId) {

                    if (
                      JSON.stringify(element.productId)
                       
                    ) {
                      const productToPush = {
                        productId: element._id,
                        title: element.title,
                        price: element.price,
                        quantity: element.quantity,
                        img: element.img,
                        chargeId: element.chargeId,
                      };
                      arr.push(productToPush);
                      console.log("ordrt productToPush same", arr);
                      let grpOrder = lodash.groupBy(arr, "chargeId");
                      console.log("order", orders, grpOrder);
                      if (orders.length == arr.length) {
                        const keys = Object.keys(grpOrder);
                        let addressDoc = {};
                        keys.forEach((value) => {
                          stripe.charges.retrieve(value, function (
                            err,
                            charge
                          ) {
                            // console.log(charge.billing_details.address, err);
                            if (charge) {
                              addressDoc[value] = {
                                address: charge.billing_details.address,
                                receipt_url: charge.receipt_url,
                                date: new Date(
                                  charge.created * 1000
                                ).toDateString(),
                              };

                              console.log(
                                "addressDoc",
                                Object.keys(addressDoc).length,
                                keys.length,
                                addressDoc
                              );
                     
                              if (
                                orders.length == arr.length &&
                                keys.length === Object.keys(addressDoc).length
                              ) {
                                console.log(addressDoc);

                                res.status(200).json({
                                  arr,
                                  message: "hello",
                                  user: user[0],
                                  grpOrder,
                                  addressDoc,
                                });
                              }
                            }
                          });
                        });
                      }
                      

                  // .catch((err) => {
                  //   console.log("error _id %", err);
                  //   // res.status(400).json(err);
                  // });
              }}
            })
          } else {
            res.status(200).json({
              arr,
              user: user[0],
              grpOrder:{},
            });
          }
        }

        //  lodash.groupBy()
      })
      .catch((err) => {
        console.log(err);
        res.json("err");
      });
  }
});
router.post("/register", (req, res) => {
  const { fname, lname, password, email } = req.body;
  console.log(req.body);
  console.log(fname, lname, password, email);
  let newUser = new User({
    fname,
    lname,
    email,
    password,
    token: "",
  });
  User.find({ email })
    .then((userdata) => {
      if (userdata.length !== 0) {
        console.log(userdata);
        res.status(400).json(" User Already exist");
      } else {
        jwt.sign({ email }, JWT_SECRET, (err, token) => {
          if (err) {
            throw err;
          }
          // console.log("token",token);
          newUser.token = token;
          console.log("new user token", newUser);
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
            }

            newUser.password = hash;
            console.log("hashed ", newUser);
            newUser
              .save()
              .then((user) => {
                const { email, token } = user;
                res.status(200).json({ email, token });

                console.log(user);
              })
              .catch((err) => {
                console.log(err);

                res.status(400).json(err);
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(400, err);
    });
});

// router.use(isAuth);

router.post("/login", (req, res) => {
  console.log(req.body);
  const { email, pass, token } = req.body;

  User.find({ email })
    .then((user) => {
      if (user.length !== 0) {
        bcrypt.compare(pass, user[0].password, (err, data) => {
          if (!data) {
            console.log("err");

            res.status(400).json({ message: "Invalid Password" });
          }
          console.log(data);
          console.log(err);
          if (data) {
            const { email, token } = user[0];
            const loginDetails = { email, token };
            console.log("loginDetails", loginDetails);
            console.log("user", user[0]);
            res.cookie("jwt", loginDetails, new Date() - 9999);
            res.status(200).json(loginDetails);
          }
        });
      } else {
        res.status(404).json("User Not found");
      }
    })
    .catch((err) => {
      console.log("err", err);

      res.status(400).json("User Not found");
    });
  // res.send
});
router.post("/update", (req, res) => {
  const { token } = req.headers;
  const { fname, lname, email, pass } = req.body;
  // const password=req.body.pass
  let password;
  bcrypt.hash(pass, 10, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      password = hash;
    }
  });
  console.log(password);
  User.findOneAndUpdate(
    { token },
    {
      $set: {
        fname,
        lname,
        email,
        password,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ message: "success" });
      }
      console.log(err, doc);
    }
  );
});

module.exports = router;
