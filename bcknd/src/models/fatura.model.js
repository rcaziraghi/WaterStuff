module.exports = (sequelize, Sequelize) => {
    const Fatura = sequelize.define('fatura', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
        numFatura: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ano: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        mes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        valor: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        situacao: {
            type: Sequelize.STRING,
            allowNull: false
        },
        leitura_idLeitura: {
            type: Sequelize.INTEGER
        },
        instalacaoId: {
            type: Sequelize.INTEGER
        }
    },
      { 
        tableName: 'fatura' ,
        timestamps: true
      });
      return Fatura;
}