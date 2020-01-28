module.exports = function(sequelize, Sequelize) {
  const Streak = sequelize.define('streak', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    length: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    isComplete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    icon: {
      type: Sequelize.STRING
    }
  });

  Streak.associate = function(models) {
    Streak.belongsTo(models.squad, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Streak;
};
