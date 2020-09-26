module.exports = (sequelize, Sequelize) => {
    const CodigoRecSenha = sequelize.define("codRecSenha", {
        // Atributos
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            primaryKey: true
        },
        token: {
            type: Sequelize.STRING
        },
        expira: {
            type: Sequelize.DATE
        },
        criado: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        criadoPeloIP: {
            type: Sequelize.STRING
        },
        revogado: {
            type: Sequelize.DATE
        },
        revogadoPeloIp: {
            type: Sequelize.STRING
        },
        substituidoPeloToken: {
            type: Sequelize.STRING
        },
        estaExpirado: {
            type: Sequelize.VIRTUAL,
            get() {
                return Date.now() >= this.expira;
            }
        },
        estaAtivo: {
            type: Sequelize.VIRTUAL,
            get() {
                return !this.revoked && !this.estaExpirado;
            }
        }
    }, {
        // Opcoes
        tableName: 'codigo_recuperacao_senha',
        timestamps: false
    });
    return CodigoRecSenha;
};