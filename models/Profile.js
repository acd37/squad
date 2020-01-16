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
    thumbnail: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    taskPoints: {
      type: Sequelize.INTEGER,
      defaultValue: 0
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
