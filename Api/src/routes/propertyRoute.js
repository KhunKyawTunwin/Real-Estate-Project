const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const propetyContoller = require("../controllers/propertyController");
const uploadController = require("../controllers/uploadController");

const router = express();

router.post("/", propetyContoller.postCreateProperty);

router
  .route("/:id")
  .put(verifyToken, propetyContoller.updateProperty)

  .delete(verifyToken, propetyContoller.deleteProperty);

router.get("/getAll", propetyContoller.getAllProperties);

router.get("/find/featured", propetyContoller.getFeatured);

router.get("/find", propetyContoller.getAllProperties);

router.get("/find/types", propetyContoller.getPropertyCount);

// Image Upload Routes
router.post("/image", uploadController.postImageUpload);

module.exports = router;
