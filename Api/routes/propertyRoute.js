const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const propetyContoller = require("../controllers/propertyController");
const uploadController = require("../controllers/uploadController");

const router = express.Router();

router.post("/", propetyContoller.postCreateProperty);

// .route("/:id")

router.put("/:id", verifyToken, propetyContoller.updateProperty);

// router.delete("/:id", propetyContoller.deleteProperty);

// router.get("/getAll", propetyContoller.getAllProperties);

// router.get("/find/featured", propetyContoller.getFeatured);

// router.get("/find", propetyContoller.getPropertyTypes);

// router.get("/find/types", propetyContoller.getPropertyCount);

// Image Upload Routes
// router.post("/image", uploadController.postImageUpload);

module.exports = router;
