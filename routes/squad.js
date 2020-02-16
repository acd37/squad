module.exports = function(app) {
  const db = require('../models');
  const passport = require('passport');

  // @route GET api/streak/test
  // @desc tests the profiles api route
  app.get('/api/squad/test', (req, res) => {
    res.json({
      success: true,
      msg: 'Testing endpoint works correctly.'
    });
  });

  // @route GET api/squad
  // @desc gets a user's squad details
  app.get('/api/squad', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.squad
      .findOne({
        where: { id: req.user.squadId },
        include: [
          {
            model: db.user
          }
        ]
      })
      .then(squad => {
        let squadProfiles = [];
        let squadMembers = squad.users;

        for (let i = 0; i < squadMembers.length; i++) {
          db.profile
            .findOne({
              where: {
                userId: squadMembers[i].id
              }
            })
            .then(squadMember => {
              squadProfiles.push(squadMember);

              if (squadProfiles.length === squadMembers.length) {
                res.json({
                  id: squad.id,
                  squadName: squad.squadName,
                  createdAt: squad.createdAt,
                  updatedAt: squad.updatedAt,
                  squadProfiles
                });
              }
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

  // @route POST api/squad/
  // @desc creates a squad
  app.post('/api/squad/create', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newSquad = {
      squadName: req.body.squadName
    };

    db.squad
      .create(newSquad)
      .then(squad => {
        db.user
          .update(
            {
              squadId: squad.id
            },
            {
              where: {
                id: req.user.id
              }
            }
          )
          .then(isUpdated => {
            // check if updated
            if (isUpdated) {
              console.log('test');
              // if updated, get squad details
              db.user
                .findOne({
                  where: {
                    id: req.user.id
                  }
                })
                .then(user => {
                  db.squad
                    .findOne({
                      id: user.squadId
                    })
                    .then(squad => {
                      db.user
                        .findAll({
                          where: {
                            squadId: squad.id
                          }
                        })
                        .then(users => {
                          let squadProfiles = [];

                          for (let i = 0; i < users.length; i++) {
                            db.profile
                              .findOne({
                                where: {
                                  userId: users[i].id
                                }
                              })
                              .then(squadMember => {
                                squadProfiles.push(squadMember);

                                if (squadProfiles.length === users.length) {
                                  res.json({
                                    id: squad.id,
                                    squadName: squad.squadName,
                                    createdAt: squad.createdAt,
                                    updatedAt: squad.updatedAt,
                                    squadProfiles
                                  });
                                }
                              });
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    })
                    .catch(err => {
                      console.log(err);
                    });
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err));
  });

  // @route POST api/squad/join
  // @desc joins a squad
  app.put('/api/squad/join', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { invitationCode } = req.body;
    db.user
      .update(
        {
          squadId: invitationCode
        },
        {
          where: {
            id: req.user.id
          }
        }
      )
      .then(isUpdated => {
        if (isUpdated) {
          db.squad
            .findOne({
              where: {
                id: invitationCode
              }
            })
            .then(squad => {
              db.user
                .findAll({
                  where: {
                    squadId: invitationCode
                  }
                })
                .then(users => {
                  let squadProfiles = [];

                  for (let i = 0; i < users.length; i++) {
                    db.profile
                      .findOne({
                        where: {
                          userId: users[i].id
                        }
                      })
                      .then(squadMember => {
                        squadProfiles.push(squadMember);

                        if (squadProfiles.length === users.length) {
                          res.json({
                            id: squad.id,
                            squadName: squad.squadName,
                            createdAt: squad.createdAt,
                            updatedAt: squad.updatedAt,
                            squadProfiles
                          });
                        }
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => console.log(err));
  });

  // @route  DELETE api/squad
  // @desc deletes a squad
  app.delete('/api/squad/', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.squad
      .destroy({ where: { id: req.user.squadId } })
      .then(status => {
        if (status === 1) {
          res.status(200).json({
            message: 'Squad successfully deleted.',
            streakDeleted: true
          });
        }
      })
      .catch(err => res.json(err));
  });

  // @route PUT api/squad/
  // @desc updates a squad name
  app.put('/api/squad', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body);
    db.squad
      .update(
        {
          squadName: req.body.squadName
        },
        {
          where: {
            id: req.body.squadId
          }
        }
      )
      .then(isUpdated => {
        console.log(isUpdated);
        if (isUpdated) {
          res.json({
            message: 'Squad name successfully updated',
            squadUpdated: true
          });
        }
      })
      .catch(err => console.log(err));
  });
};
