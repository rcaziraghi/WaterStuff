module.exports = (sequelize, Sequelize) => {
  const Denuncia = sequelize.define(
    "denuncia",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subtitulo: {
        type: Sequelize.STRING,
      },
      descritivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "denuncia",
      timestamps: true,
    }
  );
  return Denuncia;
};
