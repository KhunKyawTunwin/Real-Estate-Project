const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authUsersRoute = require("./src/routes/authRoute");
const propertyRoute = require("./src/routes/propertyRoute");
const imageUploadRoute = require("./src/controllers/uploadController");

require("dotenv").config();

const app = express();

// MongoDB Connect

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB Disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

// middlewares & Routes
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", authUsersRoute);

app.use("/property", propertyRoute);

app.use("/upload", imageUploadRoute);

// Server Listening and Port

app.listen(process.env.PORT || 8080, () => {
  connect();
  console.log(
    `Local Server Start running at Port : http://localhost:${process.env.PORT}`
  );
});

// app.use((err, req, res, next) => {
//   const errorStatus = err.status || 500;

//   const errorMessage = err.message ||

// "Something went wrong!";

//
//   return res.status(errorStatus).json({
//     success: false,
//     status: errorStatus,
//     message: errorMessage,
//     stack: err.stack,
//   });
// });
