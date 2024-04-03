const db = require("../services/mysql");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

function getJWTToken(payload) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(
    { userId: payload.userId, username: payload.username },
    secretKey,
    {
      expiresIn: "3 days",
    }
  );

  return token;
}

async function loginUser(userDetails) {
  const { username, password } = userDetails;

  const query = `SELECT id AS userId, user_name AS username, email_id AS emailId, user_password AS password, created_date AS createdAt FROM user_credential WHERE user_name = ? OR email_id = ?`;
  const values = [username, username];

  try {
    const [rows, fields] = await db.query(query, values);

    if (rows.length === 0) {
      return {
        status: false,
        statusCode: 401,
        message: "Incorrect username or password",
      };
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return {
        status: false,
        statusCode: 401,
        message: "Incorrect username or password",
      };
    }

    const payload = {
      username: user.username,
      userId: user.userId,
      createdAt: user.createdAt,
    };

    const token = getJWTToken(payload);

    return {
      status: true,
      statusCode: 200,
      message: "Login successful",
      user: payload,
      token: `Bearer ${token}`,
    };
  } catch (err) {
    console.error(err);
    return { status: false, statusCode: 500, message: "Server error" };
  }
}

async function createNewUser(userDetails) {
  let { username, email, password } = userDetails;

  const salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);

  const userId = uuidv4();
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

  // Check if username or email already exists
  const checkQuery = `SELECT * FROM user_credential WHERE user_name = ? OR email_id = ?`;
  const checkValues = [username, email];

  try {
    const [rows, fields] = await db.query(checkQuery, checkValues);
    if (rows.length > 0) {
      return {
        status: false,
        statusCode: 409,
        message: "Username or email already exists",
      };
    } else {
      const insertQuery = `INSERT INTO user_credential (id, user_name, user_password, email_id, created_date) VALUES (?, ?, ?, ?, ?)`;
      const insertValues = [userId, username, password, email, createdAt];

      const [rows, fields] = await db.execute(insertQuery, insertValues);
      return {
        status: true,
        statusCode: 201,
        message: "User created successfully",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: false,
      statusCode: 500,
      message: "Internal Server error",
    };
  }
}

async function usernameAvailability(username) {
  const query = `SELECT user_name AS username FROM user_credential WHERE user_name = ?`;
  const values = [username.username];

  try {
    const [rows, fields] = await db.query(query, values);
    if (rows.length > 0) {
      return {
        status: false,
        statusCode: 422,
        message: "Username is already taken",
      };
    } else {
      return {
        status: true,
        available: true,
        statusCode: 200,
        message: "Username Available",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: false,
      statusCode: 500,
      message: "Internal Server error",
    };
  }
}

function userSignedIn() {
  return {
    status: true,
    statusCode: 200,
    authenticated: true,
    message: "User is signed in",
  };
}

module.exports = {
  loginUser,
  createNewUser,
  usernameAvailability,
  userSignedIn,
};
