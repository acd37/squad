module.exports = function(app) {
  const db = require('../models');
  const passport = require('passport');
  const { Op } = require('sequelize');

  // @route GET api/streak/test
  // @desc tests the profiles api route
  app.get('/api/streak/test', (req, res) => {
    res.json({
      success: true,
      msg: 'Testing endpoint works correctly.'
    });
  });

  // @route GET api/streak
  // @desc tests the profiles api route
  app.get('/api/streak', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.streak
      .findAll({
        where: {
          [Op.or]: [
            {
              userId: req.user.id
            },
            {
              squadId: req.user.squadId
            }
          ]
        }
      })
      .then(streaks => {
        res.json(streaks);
      });
  });

  // @route POST api/streak/individual
  // @desc creates a user streak
  app.post(
    '/api/streak/individual',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const newUserStreak = {
        description: req.body.description,
        length: req.body.length,
        userId: req.user.id
      };

      db.streak
        .create(newUserStreak)
        .then(streak => {
          res.status(200).json({
            message: 'Streak was successfully created.',
            streakCreated: true
          });
        })
        .catch(err => console.log(err));
    }
  );

  // @route POST api/streak/squad
  // @desc creates a user streak
  app.post('/api/streak/squad', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.squadId !== null) {
      const newSquadStreak = {
        description: req.body.description,
        length: req.body.length,
        squadId: req.user.squadId
      };

      db.streak
        .create(newSquadStreak)
        .then(streak => {
          res.status(200).json({
            message: 'Streak was successfully created.',
            streakCreated: true
          });
        })
        .catch(err => console.log(err));
    } else {
      res.status(400).json({
        streakCreated: false,
        streak: 'You cannot create a Squad streak without a Squad.'
      });
    }
  });

  // @route  DELETE api/streak
  // @desc deletes a streak
  app.delete('/api/streak/', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.streak
      .destroy({ where: { id: req.body.id } })
      .then(status => {
        if (status === 1) {
          res.status(200).json({
            message: 'Streak successfully deleted.',
            streakDeleted: true
          });
        }
      })
      .catch(err => res.json(err));
  });
};
