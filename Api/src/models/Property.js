const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    currentOwner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      min: 8,
    },

    type: {
      type: String,
      enum: ["realEstate", "itTechnology", "healthMedical"],
      required: true,
    },

    desc: {
      type: String,
      required: true,
      min: 15,
    },

    img: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      requiredd: true,
    },

    sqmeters: {
      type: String,
      required: true,
    },

    continent: {
      type: String,
      required: true,
    },

    beds: {
      type: Number,
      required: true,
      min: 2,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { Timestamp: true }
);

module.exports = mongoose.model("Property", propertySchema);
