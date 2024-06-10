const Users = require('../../models/User.model');

//* Register User
const registerUser = async (req, res) => {
  // Check for existing user in DB
  try {
    const potentialUser = await Users.findOne({
      $or: [
        { email: req.body.email },
        { username: req.body.username }
      ]
    });
    // If email or username exist, return 409 conflict
    if (potentialUser.email) {
      return res.status(409).json({
        message: `An account with email ${potentialUser.email} already exists.`
      });
    } else if (potentialUser.username) {
      return res.status(409).json({
        message: `An account with username ${potentialUser.username} already exists.`
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Unable to check DB for existing user",
      error: e
    });
  }
  // Destructure user fields from request body
  const {
    username,
    email,
    password,
    confirmPassword
  } = req.body;
  // Create new user from req.body
  try {
    const newUser = await Users.create({
      username,
      email,
      password,
      confirmPassword
    });
    // Send status code 201 & new user document in response 
    res.status(201).json({
      message: `User ${newUser.username} registered successfully.`,
      newUser
    });
  } catch (e) {
    res.status(500).json({
      message: "Unable to create new user",
      error: e
    });
  }
}

module.exports = { registerUser }