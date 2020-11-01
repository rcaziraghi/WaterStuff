module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define(
    "usuario",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      nomeCompleto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      idperfil: {
        type: Sequelize.INTEGER,
      },
      dtNascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      siglaEstado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "usuario",
      timestamps: true,
    }
  );
  return Usuario;
};
