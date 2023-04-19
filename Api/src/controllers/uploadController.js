const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, req.body.filename + "_" + uniqueSuffix);
  },
});

const upload = multer(storage);

exports.postImageUpload =
  (upload.single("image"),
  async (req, res) => {
    try {
      return res.status(200).json("File uploaded successfully .");
    } catch (error) {
      console.log(error);
    }
  });
