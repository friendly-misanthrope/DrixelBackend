/* IMPORTS */
const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/cors.config');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3500;

// Instantiate app
const app = express();
require('./config/mongoose.config');

/* THIRD-PARTY MIDDLEWARE */
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));

// Listen for incoming requests on specified port
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
})