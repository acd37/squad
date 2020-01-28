module.exports = function(app) {
  const db = require('../models');
  const passport = require('passport');
  const gravatar = require('gravatar');

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
    const avatar = gravatar.url(req.body.email, {
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
        console.log(err);
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
          bio: req.body.bio
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
