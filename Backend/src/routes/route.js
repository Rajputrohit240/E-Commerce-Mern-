const Router = require("express").Router();
const {
  signUpUser,
  loginUser,
  getUserDetails,
  getUserDetailsById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  addProduct,
  getProductDetailsById,
  getProducts,
  updateProduct
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authorization");

const {addToCart , getCart ,getCartById} = require("../controllers/cartController");

//UserController
Router.post("/signUpUser", signUpUser);
Router.post("/loginUser", loginUser);
Router.get("/getusers", authMiddleware, getUserDetails);
Router.get("/getusersbyid/:userId", authMiddleware, getUserDetailsById);
Router.put("/updateuser/:userId", authMiddleware, updateUser);
Router.delete("/deleteuser/:userId", authMiddleware, deleteUser);

//ProductController
Router.post("/createproduct", authMiddleware, addProduct);
Router.get("/getproduct", authMiddleware, getProducts);
Router.put("/updateProduct/:productId" , authMiddleware , updateProduct);


//Cart
Router.post("/createcart" , authMiddleware , addToCart)
Router.get("/getcart" , authMiddleware , getCart)
Router.get("/getcartbyid/:userId" ,  getCartById)


module.exports = Router;
