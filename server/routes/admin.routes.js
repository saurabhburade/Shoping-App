const router = require("express").Router();
const User = require("../models/user.model.js");
const Admin = require("../models/admin.model.js");
require("dotenv").config();
const lodash = require("lodash");
const bcrypt = require("bcrypt");

const stripe = require("stripe")(process.env.STRIPE_ROLE_KEY);

const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/isAuth");

const JWT_SECRET = process.env.JWT_SECRET;
router.get("/fetch", (req, res) => {

  const { token, admin_token,isadmin } = req.headers;
  if (token && admin_token && isadmin==='true') {
    Admin.findOne({ token })
      .select("-_id")
      .select("-password")
      .select("-token")
      .select("-updatedAt")
      .select("-__v")
      .select("-admin_token")
      .then((user) => {
        console.log(user, user.length);
        if (user) {
          res.status(200).json(user);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ error: "Not Found" });
      });
  }
});
router.post("/register", (req, res) => {
  console.log(req.headers);

  const { fname, lname, password, email,author } = req.body;
  console.log(req.body);
  console.log(fname, lname, password, email);
console.log(
  author.toUpperCase(),
  req.headers.isadmin && author.toUpperCase() === "SAURABH"
);
  if (req.headers.isadmin === "true" && author.toUpperCase()==="SAURABH") {
    let newAdmin = new Admin({
      fname,
      lname,
      email,
      password,
      token: "",
      admin_token: "",
    });
    Admin.find({ email })
      .then((userdata) => {
        if (userdata.length !== 0) {
          console.log(userdata);
          res.status(400).json({error:"User Already exist"});
        } else {
          jwt.sign({ email }, JWT_SECRET, (err, token) => {
            if (err) {
              throw err;
            }
            newAdmin.token = token;
            console.log("new user token", newAdmin);
          });
           jwt.sign("ADMIN", JWT_SECRET, (err, token) => {
                if (err) {
                  throw err;
                }
                newAdmin.admin_token = token;
                console.log("new user token", newAdmin);
              });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAdmin.password, salt, (err, hash) => {
              if (err) {
                console.log(err);
              }
              newAdmin.password = hash;
              console.log("hashed ", newAdmin);
              newAdmin
                .save()
                .then((user) => {
                  const { email, token, admin_token } = user;
                  res.status(200).json({ email, token,admin_token });
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
  }
  else{
    res.status(400).json({error:"Invalid Credentials"})
  }
});

// router.use(isAuth);

router.post("/login", (req, res) => {
  console.log(req.body);
  const { email, pass, author } = req.body;
if (req.headers.isadmin === "true" && author.toUpperCase()==="SAURABH") {
  
    Admin.find({ email })
      .then((user) => {
        console.log(user);
        if (user.length !== 0) {
          bcrypt.compare(pass, user[0].password, (err, data) => {
            if (!data) {
              console.log("err");

              res.status(400).json({ message: "Invalid Password" });
            }
            console.log(data);
            console.log(err);
            if (data) {
              const { email, token,admin_token } = user[0];
              const loginDetails = { email, token, admin_token };
              console.log("loginDetails", loginDetails);
              console.log("user", user[0]);
              res.cookie("jwt", loginDetails, new Date() - 9999);
              res.status(200).json(loginDetails);
            }
          });
        } else {
          console.log("User Not found");
          res.status(404).json("User Not found");
        }
      })
      .catch((err) => {
        console.log("err", err);

        res.status(400).json("User Not found");
      });
  
  
}

  // res.send
});
router.post("/update", (req, res) => {
  const { token ,admin_token,isadmin} = req.headers;
  const { fname, lname, email, pass } = req.body;
  console.log(req.body);
  // const password=req.body.pass
if (token && admin_token && isadmin === "true") {
  let password="";
  bcrypt.hash(pass, 10, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      password = hash;
        Admin.findOneAndUpdate(
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
    }
  });
  console.log(password);

}
else{
  console.log("object");
  res.status(400).json({error:"Invalid Credentials"})
}
});

module.exports = router;
