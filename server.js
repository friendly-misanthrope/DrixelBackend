/* IMPORTS */
const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/cors.config');
const PORT = process.env.PORT || 3500;

// Instantiate app
const app = express();
require('./config/mongoose.config');