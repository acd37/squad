const express = require('express');
require('dotenv').config();
const passport = require('passport');
const path = require('path');
const chalk = require('chalk');
const { morganConfig } = require('./config/morganConfig');
const port = process.env.PORT || 5000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Morgan logging
app.use(morganConfig);

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
require('./routes/auth')(app);
require('./routes/user')(app);

// Models
const db = require('./models');

db.sequelize.sync({ alter: true }).then(() => {
  // server static assets if in production
  // set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.listen(port, () => console.log(`Server running on port ${chalk.green.bold(port)}!`));
});
