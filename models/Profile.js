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
    avatar: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    phone: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    site: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    company: {
      type: Sequelize.STRING
    }
  });

  Profile.associate = function(models) {
    Profile.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
  };

  return Profile;
};
