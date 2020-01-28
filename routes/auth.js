module.exports = function(app) {
  const bcrypt = require('bcryptjs');
  const db = require('../models');
  const jwt = require('jsonwebtoken');
  const keys = require('../config/keys');

  // Load input validation
  const validateLoginInput = require('../validation/login');

  // @route GET api/auth/test
  // @desc tests the auth api route
  app.get('/api/auth/test', (req, res) => {
    res.json({
      success: true,
      msg: 'Testing endpoint works correctly.'
    });
  });

  // @route POST api/auth/login
  // @desc logs in a user
  app.post('/api/auth/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    // Find user by email
    db.user.findOne({ where: { email } }).then(user => {
      // Check the user exists
      if (!user) {
        return res.status(404).json({ email: 'User not found.' });
      }

      let currentUser = user.get();

      // Check the password
      bcrypt.compare(password, currentUser.password).then(isMatch => {
        if (isMatch) {
          db.user
            .findOne({ where: { id: user.id } })
            .then(user => {
              // create the payload
              const payload = {
                id: user.id
              };

              // sign the token
              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 * 12 }, (err, token) => {
                res.json({
                  ...payload,
                  success: true,
                  token: `Bearer ${token}`
                });
              });
            })
            .catch(err => console.log(err));
        } else {
          return res.status(400).json({ password: 'User password could not be validated.' });
        }
      });
    });
  });
};
