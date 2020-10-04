module.exports = (sequelize, Sequelize) => {
    const Instalacao = sequelize.define('instalacao', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      codConsumidor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      usuarioId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
    }, 
      { 
        tableName: 'instalacao' ,
        timestamps: true
      });
    return Instalacao;
  };