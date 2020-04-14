const router = require("express").Router();
const User = require("../models/user.model.js");
const Products = require("../models/products.model.js");
require("dotenv").config();
const lodash = require('lodash');
const bcrypt = require("bcrypt");
// const crypto=require('crypto');
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/isAuth");

const JWT_SECRET = process.env.JWT_SECRET;
router.get("/fetch", (req, res) => {
  // console.log(req);
  // User.deleteMany({email:null})
  const {token} =req.headers 
  if (token) {
     User.find({ token })
       .select("-_id")
       .select("-password")
       .select("-token")
       .select("-createdAt")
       .select("-updatedAt")
       .select("-__v")
       .then(user => {
        const orders=user[0].orders.items
        if (user.length!==0) {
          
    
          
          
          
          
          
          
          
          
          let arr=[]
          
          
                  orders.forEach(element => {
                    // console.log("foreach", element);
                    // element=JSON.stringify(element)
                    if (element.productId) {
                      const _id = element.productId;
                      // console.log("productId: id", _id);

                      Products.findOne({ _id })
                        .then(product => {
                          console.log("products got ####", product);

                          if (
                            JSON.stringify(element.productId) ==
                            JSON.stringify(product._id)
                          ) {
                            const productToPush = {
                              productId: product._id,
                              title: product.title,
                              description: product.description,
                              price: product.price,
                              quantity: element.quantity,
                              img: product.productImagePath,
                              chargeId: element.chargeId
                            };
                            arr.push(productToPush);
                            console.log("ordrt productToPush same", arr);
                             let grpOrder = lodash.groupBy(arr, "chargeId");
                             console.log("order", orders, grpOrder);
                            if (orders.length == arr.length) {
                              res
                                .status(200)
                                .json({
                                  arr,
                                  message: "hello",
                                  user: user[0],
                                  grpOrder
                                });
                            }
                          } else {
                            console.log("product not found", product);
                          }
                        })

                        .catch(err => {
                          console.log("error _id %%%%", err);
                          res.status(400).json(err);
                        });
                    }
                  });
          
          
          
          
          
          
          
          
        }
        
         
         
        //  lodash.groupBy()
       })
       .catch(err => res.json(err)); 
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
    token: ""
  });
  User.find({ email })
    .then(userdata => {
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
              .then(user => {
                const {email,token}=user
                res.status(200).json({ email, token });
                
                console.log(user)})
              .catch(err => {
                console.log(err);
                
                res.status(400).json(err)});
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.send(400, err);
    });
});

// router.use(isAuth);

router.post("/login", (req, res) => {
  console.log(req.body);
  const { email, pass,token } = req.body;
  
  User.find({ email })
    .then(user => {
      if (user.length !== 0) {
        bcrypt.compare(pass,user[0].password,(err,data)=>{
          if (!data) {
          console.log("err");
            
            res.status(400).json({message:"Invalid Password"})
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
           
        })
      
      }
      else{
      res.status(404).json("User Not found");
        
      }
    })
    .catch(err => {
      console.log("err", err);

      res.status(400).json("User Not found");
    });
  // res.send
});

module.exports = router;
