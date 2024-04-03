const { Organization } = require("../../services/db");

exports.createOrganization = async (req, res) => {
  try {
    const { organizationName: name } = req.body;

    // Check if organization name is provided
    if (!name) {
      return res.status(400).json({ message: "Organization name is required" });
    }

    // Create a new organization record
    const newOrganization = new Organization({ name });
    await newOrganization.save();

    return res.status(201).json({
      message: "Organization created successfully",
      organization: newOrganization,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    return res.json(organizations);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
