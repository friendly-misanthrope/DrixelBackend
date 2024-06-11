const Users = require('../../models/User.model');

const registerUser = async (req, res) => {
  // Check for existing user in DB
  try {
    const userExists = await Users.findOne({
      email: req.body.email
    });

    // If email is already registered, return status 409 with error msg
    if (userExists) {
      return res.status(409).json({
        message: `An account with email ${email} already exists.`
      });
      // If email is unique, create user from req.body
    } else {
      const {
        username,
        email,
        password,
        confirmPassword
      } = req.body;

      const { _id, albums, favoritePhotos } = await Users.create({
        username,
        email,
        password,
        confirmPassword
      });
      return res.status(201).json({ newUser: { _id, email, albums, favoritePhotos }});
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = { registerUser }