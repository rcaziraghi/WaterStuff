module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idperfil: {
        type: Sequelize.INTEGER,
      }
    }, 
      { 
        tableName: 'usuario' ,
        timestamps: true
      });
    return Usuario;
  };