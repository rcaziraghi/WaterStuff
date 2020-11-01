module.exports = (sequelize, Sequelize) => {
  const Estado = sequelize.define(
    "estado",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sigla: {
        type: Sequelize.STRING,
      },
      idPais: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "estado",
      timestamps: false,
    }
  );
  return Estado;
};
