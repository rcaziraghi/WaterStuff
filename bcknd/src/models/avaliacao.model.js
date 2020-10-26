module.exports = (sequelize, Sequelize) => {
  const Avaliacao = sequelize.define(
    "avaliacao",
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
      atendimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      observacoes: {
        type: Sequelize.STRING,
      },
      OS_idOS: {
        type: Sequelize.INTEGER,
      },
      OS_usuario_id: {
        type: Sequelize.INTEGER,
      },
      protocolo_idprotocolo: {
        type: Sequelize.INTEGER,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "avaliacao",
      timestamps: true,
    }
  );
  return Avaliacao;
};
