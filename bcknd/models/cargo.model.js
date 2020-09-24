module.exports = (sequelize, Sequelize) => {
    const Cargo = sequelize.define("cargo", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    { 
      tableName: 'cargo' ,
      timestamps: false
    });
    return Cargo;
  };