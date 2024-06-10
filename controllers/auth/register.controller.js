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

}