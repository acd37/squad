module.exports = function(sequelize, Sequelize) {
  const Task = sequelize.define('task', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pointValue: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  Task.associate = function(models) {
    Task.belongsTo(models.squad, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};
