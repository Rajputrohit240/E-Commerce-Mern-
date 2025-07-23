// const { default: mongoose } = require("mongoose");
// const cartModel = require("../models/cartModel");
// const productModel = require("../models/productModel");
// const {} = require("./validator");

// const addToCart = async (req, res) => {
//   try {
//     let data = req.body;

//     let { userId, productId, quantity } = data;

//     if (!userId) {
//       return res.status(400).json({ msg: "userId not found" });
//     }

//     if (!productId) {
//       return res.status(400).json({ msg: "productId id required" });
//     }

//     if (!quantity) {
//       return res.status(400).json({ msg: "quantity is required" });
//     }

//     const product = await productModel.findOne({ _id: productId });
//     if (!product || product.isDeleted == true) {
//       return res.status(400).json({ msg: "Product not found" });
//     }
//     //already cart present

//     let cart = await cartModel.findOne({ userId });
//     if (!cart) {
//       cart = await cartModel.create({
//         userId: userId,
//         items: [{ productId, quantity }],
//         totalPrice: product.price * quantity,
//         totalItems: 1,
//       });
//     } else {
//       let productExist = cart.items.find(
//         (item) => item.productId.toString() === productId.toString()
//       );
//       if (productExist) {
//         productExist.quantity += quantity;
//       } else {
//         cart.items.push({ productId, quantity });
//         cart.totalItems += 1;
//       }

//       cart.totalPrice += product.price * quantity;
//       await cart.save();
//     }
//     return res
//       .status(200)
//       .json({ msg: "Product Added to Cart Successfully", cart });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

// //Delete

// const deleteCart = async (req, res) => {
//   try {
//     let userIdFromParams = req.params.userId;

//     let cart = await cartModel.findOneAndDelete({
//       userId: userIdFromParams,
//     });
//     if (!cart) {
//       return res.status(400).json({ msg: "cart not found " });
//     }

//     return res.status(200).json({ msg: "Cart Cleared" });
//   } catch (error) {
//     return res.status(500).json({ msg: "Internal Server Error", error });
//   }
// };

// const getCart = async (req, res) => {
//   try {
//     let cart = await cartModel.find();
//     if (!cart) {
//       return res.status(400).json({ msg: "No cart Found" });
//     }
//     return res.status(200).json({ cart });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// };

// const getCartById = async (req, res) => {
//   try {
//     let { userId } = req.params;
//     if (!mongoose.isValidObjectId(userId)) {
//       return res.status(400).json({ msg: " Invalid UserId" });
//     }

//     let cart = await cartModel.findOne({ userId }).populate("items.productId");
//     if (!cart) {
//       return res.status(400).json({ msg: "No cart Found" });
//     }
//     return res.status(200).json({ cart });
//   } catch (error) {
//     return res.status(500).json({ msg: "Internal server error" });
//   }
// };
// module.exports = { addToCart, deleteCart, getCart, getCartById };

const { default: mongoose } = require("mongoose");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");

const addToCart = async (req, res) => {
  try {
    let data = req.body;

    let { userId, productId, quantity } = data;

    if (!userId) {
      return res.status(400).json({ msg: "userId not found" });
    }

    if (!productId) {
      return res.status(400).json({ msg: "productId is required" });
    }

    if (!quantity) {
      return res.status(400).json({ msg: "quantity is required" });
    }

    const product = await productModel.findOne({ _id: productId });
    if (!product || product.isDeleted == true) {
      return res.status(400).json({ msg: "Product not found" });
    }

    // If the cart already exists for the user
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = await cartModel.create({
        userId: userId,
        items: [{ productId, quantity }],
        totalPrice: product.price * quantity,
        totalItems: 1,
      });
    } else {
      let productExist = cart.items.find(
        (item) => item.productId.toString() === productId.toString()
      );
      if (productExist) {
        productExist.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
        cart.totalItems += 1;
      }

      cart.totalPrice += product.price * quantity;
      await cart.save();
    }
    return res
      .status(200)
      .json({ msg: "Product Added to Cart Successfully", cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete Cart
const deleteCart = async (req, res) => {
  try {
    let userIdFromParams = req.params.userId;

    let cart = await cartModel.findOneAndDelete({
      userId: userIdFromParams,
    });
    if (!cart) {
      return res.status(400).json({ msg: "Cart not found" });
    }

    return res.status(200).json({ msg: "Cart Cleared" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Get All Carts
const getCart = async (req, res) => {
  try {
    let cart = await cartModel.find();
    if (!cart) {
      return res.status(400).json({ msg: "No cart Found" });
    }
    return res.status(200).json({ cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Get Cart by User ID
const getCartById = async (req, res) => {
  try {
    let { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ msg: "Invalid UserId" });
    }

    let cart = await cartModel.findOne({ userId }).populate("items.productId" , "title");

    if (!cart) {
      return res.status(400).json({ msg: "No cart Found" });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { addToCart, deleteCart, getCart, getCartById };
