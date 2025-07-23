//title , description , price, pimage , deleteAt , isDeleted , isFreeShipping
const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    pImage: {
      type: String,
      required: true, // Assuming this stores the image URL/path
      trim: true,
    },

    title: {
      type: String,
      required: true, // Title is required
      unique: true,
      trim: true, // Trim spaces
    },

    description: {
      type: String,
      required: true, // Description is required
      trim: true, // Trim spaces
    },

    price: {
      type: Number,
      required: true, // Price is required
      trim: true,
    },

    stock: {
      type: String,
      required: true, // Description is required
    },

    isFreeShipping: {
      type: Boolean,
      default: false, // Default is no free shipping
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true } // Automatically create createdAt and updatedAt fields
);

// Create a model from the schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
