//TODO Admin Routes, Swagger documentation
const express=require("express")
const app=express()
const cartRoutes = require("./routes/cart.routes");
const helmet = require("helmet")
const morgan=require("morgan")
const userRoutes=require('./routes/user.routes.js')
const productsRoutes = require("./routes/products.routes.js");
const adminRoutes=require('./routes/admin.routes');
const mongoose=require('mongoose');
const cors=require('cors')
const isAuth =require('./middlewares/isAuth');
const bodyParser=require('body-parser');
const conn = mongoose.connect("mongodb://localhost/ShoppingApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false
});
// conn.then(value => console.log(value)).catch(err =>console.log( err));
console.log();

const connection = mongoose.connection;
connection.once("open", (res) => {
  console.log("connected");
})
// conn.then((connect)=>console.log(connect))
// .catch(err=>console.log(err);)
app.use(cors())
app.use(helmet())
app.use(morgan('combined'))
app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use( isAuth());

app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
    res.send("hitting / route")
})
app.post("/login", (req, res) => {
    console.log(req.body);
    
    res.send("hitting /login route")
})
app.use("/products/public/uploads/", express.static("public/uploads"));

app.listen(8000,()=>{
    console.log("Server is 🔥 ")
})