const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../services/db");

exports.checkUsernameAvailability = async (req, res) => {
  try {
    const { username, orgId } = req.body;

    const existingUser = await User.findOne({ username, orgId });

    if (existingUser) {
      res.status(200).json({ available: false });
    } else {
      res.status(200).json({ available: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password, role, organization: orgId } = req.body;

    if (!username || !password || !role || !orgId) {
      return res.status(400).json({
        status: false,
        message: "Username, password, and role are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({
      username,
      password: hashedPassword,
      orgId,
      role,
    });
    await newUser.save();

    res
      .status(201)
      .json({ status: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { organization, username, password } = req.body;
    const user = await User.findOne({ orgId: organization, username });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid username or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({
      status: true,
      message: "Login successful",
      token: `Bearer ${token}`,
      user: { username: user.username, id: user._id },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

exports.checkSignedIn = async (req, res) => {
  try {
    res.status(200).json({ signedin: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllUsersByOrgId = async (req, res) => {
  try {
    // Fetch user details from request
    const user = req.user;

    // If the user is not an admin, they should only be able to view their own details
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Fetch only username, orgId, and role of users under the orgId
    const users = await User.find(
      { orgId: user.orgId },
      { username: 1, orgId: 1, role: 1 }
    );

    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  res.json({ message: "Logout successful" });
};
