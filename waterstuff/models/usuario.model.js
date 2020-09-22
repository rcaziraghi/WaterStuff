const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("usuario", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      },
      idperfil: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { tableName: 'usuario' });
    return User;
  };