const productModel = require("../models/productModel");
const mongoose = require("mongoose");
const { isValid } = require("./validator");
const loginUser = require("../controllers/userController");

const addProduct = async (req, res) => {
  try {
    let productData = req.body;
    if (Object.keys(productData).length === 0) {
      return res
        .status(400)
        .json({ msg: "No data Found , badProduct Request" });
    }

    let {
      pImage,
      title,
      description,
      price,
      stock,
      isFreeShipping,
      isDeleted,
      deletedAt,
    } = productData;

    // pimage Validation

    if (!isValid(pImage)) {
      return res.status(400).json({ msg: "Product image is required" });
    }
    // title Validation
    if (!isValid(title)) {
      return res.status(400).json({ msg: "Title name is required" });
    }

    let checkDuplicateProductTitle = await productModel.findOne({ title });
    if (checkDuplicateProductTitle) {
      return res.status(400).json({ msg: "Title Already Exists" });
    }

    //description Validation

    if (!isValid(description)) {
      return res.status(400).json({ msg: "Product Description is required" });
    }

    //price Validation
    if (!isValid(price)) {
      return res.status(400).json({ msg: "Product Price is required" });
    }

    if (typeof price !== "number") {
      return res.status(400).json({ msg: "Price is invalid" });
    }

    //stock Validation
    if (!isValid(stock) || typeof stock !== "number" || stock < 0) {
      return res.status(400).json({ msg: "Valid stock quantity  is required" });
    }

    //isFreeShipping Validation

    if (
      typeof isFreeShipping !== "undefined" &&
      typeof isFreeShipping !== "boolean"
    ) {
      return res
        .status(400)
        .json({ msg: "isFreeShipping must be a boolean  is required" });
    }

    //isDeleted VAlidation
    if (typeof isDeleted !== "undefined" && typeof isDeleted !== "boolean") {
      return res
        .status(400)
        .json({ msg: "isDeleted must be a boolean  is required" });
    }

    //DeletedAt Validation
    if (isDeleted && deletedAt && isNaN(Date.parse(deletedAt))) {
      return res.status(400).json({ msg: "deleted At must be a date format" });
    }

    let newProducts = {
      pImage,
      title,
      description,
      price,
      stock,
      isFreeShipping: isFreeShipping || false,
      isDeleted: isDeleted || false,
      deletedAt: isDeleted ? new Date() : null,
    };

    // Create User
    const createdProduct = await productModel.create(newProducts);
    if (createdProduct) {
      return res
        .status(201)
        .json({ msg: "Product Created Successfully", createdProduct });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server productError" });
  }
};

//get-products

const getProducts = async (req, res) => {
  try {
    let products = await productModel.find(
      { isDeleted: false },
      { __v: 0, isDeleted: 0, deletedAt: 0, createdAt: 0, updatedAt: 0 }
    );
    if (!products) {
      return res.status(400).json({ msg: "No Product Found" });
    }
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

//get userdetailsbyID

const getProductDetailsById = async (req, res) => {
  try {
    // let userId = req.params.userId;

    // if (!mongoose.isValidObjectId(userId)) {
    //   return res.status(400).json({ msg: "Invalid user id" });
    // }

    // let logginedUser = req.user.userId;

    // if (logginedUser !== userId) {
    //   return res.status(403).json({ msg: "Bad authorization || invalid user" });
    // }

    let product = await productModel.find({ isDeleted: false }).select("-__v");

    if (!product) {
      return res.status(400).json({ msg: "No product Found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};
//UpdateProduct
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    let updatedData = req.body;

    // Check if the product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Invalid Product ID" });
    }


    // Validate the incoming data
    let { pImage, title, description, price, stock, isFreeShipping, isDeleted, deletedAt } = updatedData;

    // Validate pImage
    if (pImage && !isValid(pImage)) {
      return res.status(400).json({ msg: "Invalid Product Image" });
    }

    // Validate title and check for duplicates
    if (title) {
      if (!isValid(title)) {
        return res.status(400).json({ msg: "Title is required" });
      }
      let duplicateTitle = await productModel.findOne({ title });
      if (duplicateTitle && duplicateTitle._id.toString() !== productId) {
        return res.status(400).json({ msg: "Title already exists" });
      }
    }

    // Validate description
    if (description && !isValid(description) || description.length ===0) {
      return res.status(400).json({ msg: "Description is required" });
    }

    // Validate price
    if (price) {
      if (!isValid(price) || typeof price !== "number") {
        return res.status(400).json({ msg: "Invalid price" });
      }
    }

    // Validate stock
    if (stock) {
      if (!isValid(stock) || typeof stock !== "number" || stock < 0) {
        return res.status(400).json({ msg: "Invalid stock quantity" });
      }
    }

    // Validate isFreeShipping
    if (typeof isFreeShipping !== "undefined" && typeof isFreeShipping !== "boolean") {
      return res.status(400).json({ msg: "isFreeShipping must be a boolean" });
    }

    // Validate isDeleted
    if (typeof isDeleted !== "undefined" && typeof isDeleted !== "boolean") {
      return res.status(400).json({ msg: "isDeleted must be a boolean" });
    }

    // Validate deletedAt (only if isDeleted is true)
    if (isDeleted && deletedAt && isNaN(Date.parse(deletedAt))) {
      return res.status(400).json({ msg: "deletedAt must be a valid date" });
    }

    // Prepare the updated product data
    let updatedProductData = {
      pImage: pImage,
      title: title,
      description: description,
      price: price ,
      stock: stock ,
      isFreeShipping,
      isDeleted,
      deletedAt,
    };

    // Update the product
    let updatedProduct = await productModel.findByIdAndUpdate(productId, updatedProductData, { new: true });
    
    if (updatedProduct) {
      return res.status(200).json({ msg: "Product updated successfully", updatedProduct });
    } else {
      return res.status(500).json({ msg: "Failed to update product" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


module.exports = { addProduct, getProductDetailsById, getProducts , updateProduct };
