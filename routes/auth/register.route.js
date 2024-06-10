const express = require('express');
const router = express.Router();
const { registerUser } = require('../../controllers/auth/register.controller');

router.post('/', registerUser);

module.exports = router;