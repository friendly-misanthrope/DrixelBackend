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
// CORS policy
app.use(cors(corsOptions));
// body-parser
app.use(bodyParser.urlencoded({extended: true}));


/* BUILT-IN EXPRESS MIDDLEWARE */
// Allows form data to be handled via URL
app.use(express.urlencoded({ extended: false }));
// Allows handling of JSON data
app.use(express.json());
// Allow serving of static files to:
// root dir
app.use(express.static(path.join(__dirname, '/public')));

/* ROUTES */
// Register
app.use('/register', require('./routes/auth/register.route'));

// Listen for incoming requests on specified port
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
})