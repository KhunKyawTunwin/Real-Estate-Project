const Property = require("../models/Property");

// Create Property

exports.postCreateProperty = async (req, res) => {
  try {
    const newProperty = await Property.create({
      ...req.body,
      currentOwner: req.user.id,
    });

    return res.status(201).json(newProperty);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Upadte Property

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property.currentOwner !== req.user.id) {
      throw new Error(`You're not allowed to update othe people Porperties !`);
    } else {
      const updatedProperty = await Property.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json(updatedProperty);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Delete Property

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property.currentOwner !== req.user.id) {
      throw new Error(`You're not allowed to delete other Properties!`);
    } else {
      return res.status(200).json({ msg: "Successfully deleted property ." });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Get all
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({});

    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Get Featured

exports.getFeatured = async (req, res) => {
  try {
    const featureProperties = await Property.find({ featured: true }).populate(
      "currentOwner",
      "-password"
    );
    return res.status(200).json(featureProperties);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Get property Type

exports.getPropertyTypes = async (req, res) => {
  const type = req.query; // {type : "beach, hotel, estate"}

  try {
    if (type) {
      const propertyTypes = await Property.find(type).populate(
        "currentOwner",
        "-password"
      );
      return res.status(200).json(propertyTypes);
    } else {
      return res.status(500).json({ msg: "No such type!" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Get Propetty-Count

exports.getPropertyCount = async (req, res) => {
  try {
    const realEstateType = await Property.countDocuments({
      type: "realEstate",
    });
    const itTechonologyType = await Property.countDocuments({
      type: "itTechnology ",
    });
    const medicalType = await Property.countDocuments({
      type: "healthMedical",
    });

    return res.status(200).json({
      realEstate: realEstateType,
      itTechonology: itTechonologyType,
      healthMedical: medicalType,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Get Property Individual

exports.getIndividualProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "currentOwner",
      "-password"
    );

    if (!property) {
      throw new Error("No such property with this id!");
    } else {
      return res.status(200).json(property);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
