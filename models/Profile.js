module.exports = function(sequelize, Sequelize) {
  const Profile = sequelize.define('profile', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    handle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gravatar: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    }
  });

  Profile.associate = function(models) {
    Profile.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Profile;
};
