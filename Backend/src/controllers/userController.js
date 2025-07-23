const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  isValid,
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidPhone,
} = require("./validator");

// Create-user

const signUpUser = async (req, res) => {
  try {
    let userData = req.body;
    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "No data Found , Bad Request" });
    }

    let { fName, lName, email, profilePic, phoneNo, password, address } =
      userData;

    // fName Validation
    if (!isValid(fName)) {
      return res.status(400).json({ msg: "fName is required" });
    }

    if (!isValidName(fName)) {
      return res.status(400).json({ msg: "Invalid fName" });
    }

    // lName Validation

    if (lName && !isValidName(lName)) {
      return res.status(400).json({ msg: "Invalid lName" });
    }

    // email validation
    if (!isValid(email)) {
      return res.status(400).json({ msg: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    const checkDuplicateEmail = await userModel.findOne({ email });
    if (checkDuplicateEmail) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    // Phone Number Validation
    if (!isValid(phoneNo)) {
      return res.status(400).json({ msg: "Phone Number is required" });
    }

    if (!isValidPhone(phoneNo)) {
      return res.status(400).json({ msg: "Invalid Phone Number" });
    }

    const checkDuplicatePhone = await userModel.findOne({ phoneNo });
    if (checkDuplicatePhone) {
      return res.status(400).json({ msg: "Phone Number Already Exists" });
    }

    // password validation
    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is required" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ msg: "Invalid Password" });
    }
    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Address Validation
    if (!isValid(address)) {
      return res.status(400).json({ msg: "Address is Required" });
    }

    // Create User
    const createdUser = await userModel.create({
      fName,
      lName,
      email,
      profilePic,
      phoneNo,
      password: hashedPassword,
      address,
    });
    if (createdUser) {
      return res
        .status(201)
        .json({ msg: "User Created Successfully", createdUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server Error" });
  }
};

//Login-User
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    //
    if (!email) {
      return res.status(400).json({ msg: "Email is Required" });
    }
    //
    if (!password) {
      return res.status(400).json({ msg: "password is Required" });
    }

    //MAtching Email
    const findEmail = await userModel.findOne({ email });
    if (!findEmail) {
      return res
        .status(400)
        .json({ msg: "User Doesn't Exist. Create Account First!!!" });
    }

    // Matching Password

    const matchPassword = await bcrypt.compare(password, findEmail.password);
    if (!matchPassword) {
      return res.status(400).json({ msg: "Bad Credentials !!!" });
    }

    //Generate Token Using jwt
    let token = jwt.sign(
      {
        userId: findEmail._id,
        email,
      },
      "My-Shopping-Cart",
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ msg: "Login Successfull", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server Error" });
  }
};

//get-users
const getUserDetails = async (req, res) => {
  try {
    let users = await userModel.find().select("-__v");
    if (!users.length) {
      return res.status(404).json({ msg: "Users Not Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//get userdetailsbyID

const getUserDetailsById = async (req, res) => {
  try {
    let userId = req.params.userId;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ msg: "Invalid user id" });
    }

    let logginedUser = req.user.userId;

    if (logginedUser !== userId) {
      return res.status(403).json({ msg: "Bad authorization || invalid user" });
    }

    let user = await userModel.findById(userId).select("-__v");
    if (!user) {
      return res.status(400).json({ msg: "No user Found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// update

const updateUser = async (req, res) => {
  try {
    let userData = req.body;
    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Enter data to update" });
    }

    let userId = req.params.userId;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ msg: "Invalid user Id" });
    }

    let { fName, lName, email, phoneNo, password, address } = userData;

    // fName Validation
    if (fName || fName.length === 0) {
      if (!isValid(fName)) {
        return res.status(400).json({ msg: "fName is required" });
      }
      if (!isValidName(fName)) {
        return res.status(400).json({ msg: "Invalid fName" });
      }
    }

    //lNAme validation
    if (!isValidName(lName)) {
      return res.status(400).json({ msg: "Invalid lName" });
    }

    // email validation
    if (email) {
      if (!isValid(email)) {
        return res.status(400).json({ msg: "Email is required" });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ msg: "Invalid Email" });
      }

      const checkDuplicateEmail = await userModel.findOne({ email });
      if (checkDuplicateEmail) {
        return res.status(400).json({ msg: "Email Already Exists" });
      }
    }

    // Phone Number Validation
    if (phoneNo) {
      if (!isValid(phoneNo)) {
        return res.status(400).json({ msg: "Phone Number is required" });
      }

      if (!isValidPhone(phoneNo)) {
        return res.status(400).json({ msg: "Invalid Phone Number" });
      }

      const checkDuplicatePhone = await userModel.findOne({ phoneNo });
      if (checkDuplicatePhone) {
        return res.status(400).json({ msg: "Phone Number Already Exists" });
      }
    }

    // // password validation
    if (password) {
      if (!isValid(password)) {
        return res.status(400).json({ msg: "Password is required" });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({ msg: "Invalid Password" });
      }

      //Password Hashing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      userData.password = hashedPassword;
    }

    // // Address Validation
    if (address) {
      if (!isValid(address)) {
        return res.status(400).json({ msg: "Address is Required" });
      }
    }

    const updatedData = await userModel.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    if (!updatedData) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ msg: "userUpdated", updatedData });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

//Delete

const deleteUser = async (req, res) => {
  try {
    let userIdFromParams = req.params.userId;
    if (!mongoose.isValidObjectId(userIdFromParams)) {
      return res.status(400).json({ msg: "Invalid user Id" });
    }

    let deletedUser = await userModel.findByIdAndDelete(userIdFromParams);

    if (!deletedUser) {
      return res.status(400).json({ msg: "User Not found" });
    }
    return res
      .status(200)
      .json({ msg: `${deletedUser.fName} is deleted`, deletedUser });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports = {
  signUpUser,
  loginUser,
  getUserDetails,
  getUserDetailsById,
  updateUser,
  deleteUser,
};
