const express = require("express");
const orgRouter = express.Router();
const organizationController = require("./org.controller");

// POST create a new organization
orgRouter.post("/", organizationController.createOrganization);

// GET all organizations
orgRouter.get("/", organizationController.getAllOrganizations);

module.exports = { orgRouter };
