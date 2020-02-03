module.exports = function(app) {
  const db = require('../models');
  const passport = require('passport');
  const gravatar = require('gravatar');
  const bcrypt = require('bcryptjs');

  // Load input validation
  const validatePasswordUpdate = require('../validation/password');
  const validateProfileInformation = require('../validation/profile');

  // @route GET api/profile/test
  // @desc tests the profiles api route
  app.get('/api/profile/test', (req, res) => {
    res.json({
      success: true,
      msg: 'Testing endpoint works correctly.'
    });
  });

  // @route POST api/profile
  // @desc creates a user profile
  app.post('/api/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInformation(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.user.email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    const newProfile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      handle: req.body.handle,
      phone: req.body.phone,
      bio: req.body.bio,
      userId: req.user.id,
      city: req.body.city,
      state: req.body.state,
      site: req.body.site,
      company: req.body.company,
      avatar
    };

    db.profile
      .create(newProfile)
      .then(user => {
        res.status(200).json({
          message: 'Profile was successfully created.',
          profileCreated: true
        });
      })
      .catch(err => console.log(err));
  });

  // @route GET api/profile/
  // @desc gets current user's profile
  app.get('/api/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.profile
      .findOne({
        where: {
          userId: req.user.id
        }
      })
      .then(profile => {
        res.status(200).json(profile);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  // @route PUT api/profile/password
  // @ desc updates a user password
  app.put('/api/profile/password', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePasswordUpdate(req.body.passwordInformation);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { password, newPassword } = req.body.passwordInformation;

    // Find user by email
    db.user.findOne({ where: { id: req.user.id } }).then(user => {
      let currentUser = user.get();

      // Check the password
      bcrypt.compare(password, currentUser.password).then(isMatch => {
        if (isMatch) {
          db.user
            .findOne({ where: { id: user.id } })
            .then(user => {
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, (err, hash) => {
                  if (err) throw err;
                  hashedPassword = hash;

                  db.user
                    .update(
                      {
                        password: hashedPassword
                      },
                      {
                        where: {
                          id: req.user.id
                        }
                      }
                    )
                    .then(user => {
                      res.status(200).json({
                        message: 'Password successfully created.',
                        passwordUpdated: true
                      });
                    })
                    .catch(err => console.log(err));
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

  // @route PUT api/profile/
  // @desc updates a user profile
  app.put('/api/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.profile
      .update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          handle: req.body.handle,
          phone: req.body.phone,
          bio: req.body.bio,
          site: req.body.site,
          state: req.body.state,
          city: req.body.city,
          company: req.body.company
        },
        {
          where: {
            userId: req.user.id
          }
        }
      )
      .then(isUpdated => {
        if (isUpdated) {
          db.profile
            .findOne({
              where: {
                userId: req.user.id
              }
            })
            .then(user => {
              let updatedUser = user.get();
              res.json(updatedUser);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  });
};
