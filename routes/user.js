module.exports = function(app) {
  const bcrypt = require('bcryptjs');
  const db = require('../models');
  const passport = require('passport');
  const axios = require('axios');

  // Load input validation
  const validateRegisterInput = require('../validation/register');

  // @route GET api/user/test
  // @desc tests the users api route
  app.get('/api/user/test', (req, res) => {
    res.json({
      success: true,
      msg: 'Testing endpoint works correctly.'
    });
  });

  // @route GET api/user/
  // @desc gets a user by auth token
  app.get('/api/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.user
      .findOne({
        where: {
          id: req.user.id
        },
        raw: true
      })
      .then(user => {
        // remove password before sending
        delete user.password;

        res.status(200).json(user);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // @route POST api/user/
  // @desc creates a new user
  app.post('/api/user', (req, res) => {
    // check recaptcha
    const { recaptcha } = req.body;

    axios
      .post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${recaptcha}`
      )
      .then(response => {
        console.log(response);
        if (response.data.success) {
          const { errors, isValid } = validateRegisterInput(req.body);

          // check validation
          if (!isValid) {
            return res.status(400).json(errors);
          }

          db.user
            .findOne({
              where: {
                email: req.body.email
              }
            })
            .then(user => {
              if (user) {
                return res.status(400).json({ email: 'This email already exists.' });
              } else {
                const newUser = {
                  email: req.body.email,
                  password: req.body.password
                };

                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    db.user
                      .create(newUser)
                      .then(user => {
                        res.status(200).json({
                          message: 'User account successfully created.',
                          userCreated: true
                        });
                      })
                      .catch(err => console.log(err));
                  });
                });
              }
            });
        }
      });
  });

  // @route PUT api/users/
  // @desc updates a user email
  app.put('/api/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.user
      .update(
        {
          email: req.body.email
        },
        {
          where: {
            id: req.user.id
          }
        }
      )
      .then(isUpdated => {
        if (isUpdated) {
          db.user
            .findOne({
              where: {
                id: req.user.id
              }
            })
            .then(user => {
              let updatedUser = user.get();
              res.json({
                id: user.id,
                email: user.email,
                updatedAt: user.updatedAt,
                squaddId: user.squadId
              });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  });

  // @route  DELETE api/user
  // @desc deletes a user
  app.delete('/api/user/', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.user
      .destroy({ where: { id: req.user.id } })
      .then(status => {
        if (status === 1) {
          res.status(200).json({
            message: 'User profile successfully deleted.',
            userDeleted: true
          });
        }
      })
      .catch(err => res.json(err));
  });
};
