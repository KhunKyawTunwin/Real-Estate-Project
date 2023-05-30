const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//  const bodyParser = require("body-parser");

const authUsersRoute = require("./routes/authRoute");

const propertyRoute = require("./routes/propertyRoute");
// const imageUploadRoute = require("./controllers/uploadController");
// const verifyToken = require("./middleware/verifyToken");

require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// middlewares & Routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authUsersRoute);
//
app.use("/property", propertyRoute);
//
// app.use("/upload", imageUploadRoute);

// Server Listening and Port

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `Local Server Start running at Port : http://localhost:${process.env.PORT}`
  );
});
