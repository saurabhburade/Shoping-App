const router = require("express").Router();
const Products = require("../models/products.model");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});
const upload = multer({
  storage
});
router.post("/add", (req, res) => {
  const { title, description, price } = req.body;
  console.log(req.body);
  const newProduct = new Products({
    title: title,
    description,
    price
  });
  console.log(newProduct);

  Products.find({ title }).then(product => {
    if (product.length !== 0) {
      console.log("Product exist");
      res.status(400).json("Product exist");
    } else {
      newProduct.save().then(savedproduct => console.log(savedproduct));
      res.status(200).json(newProduct);
    }
  });
});
router.get("/fetch", (req, res) => {
  Products.find()
    .select("-createdAt")
    .select("-updatedAt")
    .select("-__v")
    .then(products => {
      console.log(products);

      res.status(200).json(products);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json("Error in fetching");
    });
});

router.post("/upload",upload.single("productImage"), (req, res,next) => {
  // console.log(req);
  console.log(JSON.parse(req.body.productData), req.file);
 const {path}=req.file
 const productImagePath=path
 const { title, description, price } = JSON.parse(req.body.productData);
console.log(productImagePath.trim(),title,description,price);
const newProduct = new Products({
  title,
  description,
  price,
  productImagePath
});
console.log(newProduct);
newProduct.save().then(newProduct=>{
  console.log("Product Added Successfully");
  res.status(200).json({message:"Product Added Successfully"})
})
.catch(err=>{
  console.log("Product Add Failed ",err.errors);
  
  res.status(400).json({ message: "Product Add Failed" });
  
})
  // res.json(req.files);
  
});
router.post("/delete",(req,res)=>{
  console.log(req.headers);
  console.log(req.body);
  const {productId}=req.body
  const { token, admin_token, isadmin } = req.headers;
   if (token && admin_token && isadmin==='true') {
     
    Products.findOneAndDelete({ _id:productId }, (err, doc) => {
      console.log("err", err, "doc", doc);
      if (doc) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(400).json({ error: "Fail" });
      }
    });
    
   }
})

router.post("/update", (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  const {title , description,price}=req.body
  const { productId } = req.body;
  const { token, admin_token, isadmin } = req.headers;
  if (token && admin_token && isadmin === "true") {
    Products.findOneAndUpdate({ _id: productId },{$set:{
      title , description,price
      
    }},
      
      
      
       (err, doc) => {
      console.log("err", err, "doc", doc);
      if (doc) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(400).json({ error: "Fail" });
      }
    });
  }
});
module.exports = router;
