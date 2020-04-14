import axios from "axios";
const SERVER = process.env.REACT_APP_SERVER;

const INITIAL_STATE = {
  cartCount: 0,
  products: [],
  totalCart: 0,
  shop:[]
};


const totalCartPrice = arr => {
  let sum = 0;
  arr.forEach(element => {
    sum = sum + element.price * element.quantity;
  });
  return sum;
};
  
const updateCart = async arr => {
  const productItems = await axios.post(
    `${SERVER}/api/cart/add`,
    {
      addItem: arr
    },
    {
      headers: {
        token: localStorage.getItem("jwt")
      }
    }
  );
  return productItems;
};

export default (state = INITIAL_STATE, action) => {
  let arr = [];
  switch (action.type) {
    case "ADD_TO_CART":
      state.products = [...state.products, ...action.payload.data];
      state.cartCount = state.cartCount + 1;
      arr = [];
      state.products.forEach((value, index) => {
        const { productId, quantity } = value;

        if (productId && quantity !== 0) {
          const arrItem = { productId, quantity };
          arr = [...arr, arrItem];
        }
      });
      updateCart(arr).then(userCart => {
        console.log("userCart", userCart);
      });
      
      console.log("aft updatecart", state.products);
   
      return {
        ...state,
        totalCart: totalCartPrice([...state.products, ...action.payload.data])
      };
    case "INC_CART_TOTAL":
      state.products[action.payload.index].quantity = action.payload.amt;
      state.products[action.payload.index].totalPrice =
        action.payload.amt * state.products[action.payload.index].price;
       arr = [];
       state.products.forEach((value, index) => {
         const { productId, quantity } = value;

         if (productId && quantity !== 0) {
           const arrItem = { productId, quantity };
           arr = [...arr, arrItem];
         }
       });
       console.log("send array", arr);

       updateCart(arr).then(userCart => {
         console.log("userCart", userCart);
       });
      console.log("aft updatecart", state.products);
       

      return {
        ...state,
        totalCart: totalCartPrice(state.products)

        //  totalCart:    state.products[action.payload.index].totalPrice,
      };
    case "DEC_CART_TOTAL":
      state.products[action.payload.index].quantity = action.payload.amt;
      state.products[action.payload.index].totalPrice =
        action.payload.amt * state.products[action.payload.index].price;

        
               arr = [];
               state.products.forEach((value, index) => {
                 const { productId, quantity } = value;

                 if (productId && quantity !== 0) {
                   const arrItem = { productId, quantity };
                   arr = [...arr, arrItem];
                 }
               });
               console.log("send array", arr);

               updateCart(arr).then(userCart => {
                 console.log("userCart", userCart);
               });
               console.log("aft updatecart", state.products);

      return {
        ...state,
        totalCart: totalCartPrice(state.products)

        //  totalCart:    state.products[action.payload.index].totalPrice,
      };
    case "UPDATE_CART":
      state.products.splice(action.payload.index, 1);
      
             arr = [];
             state.products.forEach((value, index) => {
               const { productId, quantity } = value;

               if (productId && quantity !== 0) {
                 const arrItem = { productId, quantity };
                 arr = [...arr, arrItem];
               }
             });
             console.log("send array", arr);

             updateCart(arr).then(userCart => {
               console.log("userCart", userCart);
             });
             console.log("aft updatecart", state.products);
      return {
        ...state,
        cartCount: state.cartCount - 1,
       products:[...state.products],
       
        totalCart: totalCartPrice(state.products)
      };
      case "FETCH_CART":
            state.products =action.payload;
              state.cartCount = action.payload.length;
        return {
          ...state,
          totalCart: totalCartPrice(state.products)
        };
case "CLEAR_CART":
  return {
    ...state,
    cartCount: 0,
    products: [],
    totalCart: 0,
    
  };
    default:
      return state;
  }
};
