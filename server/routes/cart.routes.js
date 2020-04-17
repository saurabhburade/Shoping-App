const Products = require("../models/products.model");
const User = require("../models/user.model");
const stripe = require("stripe")("sk_test_4dtRajw2ujrNWT3pHjxG9CGx00fsLCesJI");
// const stripe=require('stripe');

const uuid = require("uuid/v4");
const router = require("express").Router();
router.get("/fetch", (req, res) => {
  const { token } = req.headers;
  console.log(token);
  console.log(stripe.customers._stripe.charges.create);
  if (token) {
    User.find({ token }).then((user) => {
      if (user.length !== 0) {
        console.log(user);
        var arr = [];
        const userCart = user[0].cart;
        console.log("usercaer-=====*****", userCart);
        let count = 0;
        userCart.items.forEach((element) => {
          // console.log("foreach", element);
          // element=JSON.stringify(element)
         
          if (element.productId) {
              
            const _id = element.productId;
            // console.log("productId: id", _id);
                  console.log(userCart.items.length === arr.length || count);

            Products.findOne({ _id })
              .then((product) => {
                console.log("products got in cart", product);

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
                  };
                  arr.push(productToPush);
                  console.log("productToPush same", arr);
                 count++;
                  console.log(userCart.items.length ,arr.length ,count);
                  if (
                    userCart.items.length === arr.length ||
                    userCart.items.length === count
                  ) {
                    console.log("res sent $$$$$$$$$$$$$$$$$$$$$$$$$$");

                    res.status(200).json({ arr, message: "hello" });
                  }
                  // else{
                  //    count++;
                  // }
                } else {
                   count++;
                  console.log("product not found", product);
                }
              })

              .catch((err) => {
              

                console.log("error _id %%%%", err);
              });
          }
        });
        // if (userCart.items.length === arr.length || count) {
          
        //   res.json({ arr, message: "hello" });
        //   console.log("res sent $$$$$$$$$$$$$$$$$$$$$$$$$$");
        // }
        console.log("arr", arr);
      }
    });
  }
});
router.post("/add", (req, res) => {
  const { token } = req.headers;
  // console.log(req.headers);
  const { addItem } = req.body;
 console.log(addItem);
 
  if (token) {
    User.findOneAndUpdate(
      { token },
      {
        $set: {
          cart: {
            items: addItem,
          },
        },
      }
    )
      .then((user) => {
        if (user) {
          console.log(user);
          const userCart = user.cart;
          res.json(userCart);
        }
      })
      .catch((err) => console.log("err update", err));
  }
});
router.post("/checkout/stripe", (req, res) => {
  console.log(req.body);
  console.log(req.headers.token);
  const authToken = req.headers.token;
  const { products, token } = req.body;
  let amount = 0;
  // products.forEach((value,index)=>{
  //   amount=amount+value.
  // })

  const idempotencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      // console.log(customer);

      let amountCharge = 0;
      products.forEach((value) => {
        const { quantity, price } = value;
        amountCharge = amountCharge + quantity * price;
      });
      console.log("addItem0", amountCharge);

      stripe.customers._stripe.charges.create(
        {
          amount: amountCharge * 100,
          customer: customer.id,
          receipt_email: token.email,
          currency: "inr",

          description: "test payment",
        },
        { idempotencyKey },
        (err, charge) => {
          console.log("charge##", charge, "err##", err);
          if (charge) {
            if (authToken) {
              let addItem = [];

              products.forEach((value) => {
                const {
                  productId,
                  quantity,
                  price,
                  
                  img,
                  title,
                } = value;
                const chargeId = charge.id;
                const item = {
                  productId,
                  quantity,
                  price,
                  chargeId,
                  img,
                  title,
                };
                addItem = [...addItem, item];
              });
              console.log("addItem0", addItem);
              User.findOne({ token: authToken }, (err, res) => {
                if (err) {
                  console.log(err);
                }
                if (res) {
                  console.log(res);
                  addItem = [...addItem, ...res.orders.items];
                }
                console.log(addItem);
                User.findOneAndUpdate(
                  { token: authToken },
                  {
                    $set: {
                      "orders.items": addItem,
                      "cart.items": [],
                    },
                  },
                  (err, res) => {
                    if (err) {
                      console.log(err);
                    }
                    if (res) {
                      console.log(res);
                    }
                  }
                );
              });
            }

            // stripe.invoiceItems.create(
            //   {
            //     customer: "cus_H1mhJDbSCw6xyP",
            //     amount: amountCharge * 100,
            //     currency: "inr",
            //     description: "One-time setup fee"
            //   },
            //   (err, invoice) => {
            //     console.log("err", err, "invoice", invoice);
            //     // console.log(charge.invoice.payment_succeeded());
            //     charge.invoice = invoice;
            //   }
            // );

            res.status(200).json(charge);
          }
        }
      );
    })
    .catch((err) => console.log(err));
});

module.exports = router;
