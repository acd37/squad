module.exports = function(sequelize, Sequelize) {
  const Streak = sequelize.define('streak', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    length: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  Streak.associate = function(models) {
    Streak.belongsTo(models.squad, {
      foreignKey: {
        allowNull: true
      },
      onDelete: 'CASCADE'
    });

    Streak.belongsTo(models.user, {
      foreignKey: {
        allowNull: true
      },
      onDelete: 'CASCADE'
    });
  };

  return Streak;
};
