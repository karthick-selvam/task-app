const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const TasksSchema = new mongoose.Schema({
  assigneeName: {
    type: String,
    required: true,
  },
  assigneeId: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  ETC: {
    type: String,
    required: true,
  },
  assignorId: {
    type: String,
    required: true,
  },
  orgId: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  orgId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const Organization = mongoose.model("Organization", OrganizationSchema);
const Tasks = mongoose.model("Tasks", TasksSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { User, Organization, Tasks };
