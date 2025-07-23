const express = require("express");
const mongoose = require("mongoose");
const myRoutes = require("./routes/route");

const app = express();

//middleware
app.use(express.json());
app.use("/", myRoutes);

mongoose
  .connect(
    "mongodb+srv://rajputrohit370:Sam123456@cluster0.jbixv.mongodb.net/E-Commerce-MERN"
  )
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch(() => {
    console.log("DB not connected");
  });

app.get("/test", (req, res) => {
  res.send("Hello i am Rohit");
});

app.listen(3500, (err) => {
  err ? console.log(err) : console.log("server is running at 3500");
});
