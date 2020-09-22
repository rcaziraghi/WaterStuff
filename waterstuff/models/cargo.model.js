module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("cargo", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    { tableName: 'cargo' });
  
    return Cargo;
  };