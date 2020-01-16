module.exports = function(sequelize, Sequelize) {
  const Squad = sequelize.define('squad', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    squadName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  Squad.associate = function(models) {
    Squad.hasMany(models.user);
  };

  return Squad;
};
