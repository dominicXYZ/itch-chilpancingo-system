'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
      },
      clasificacion: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['industrial','servicios','público','privado','otro']
      },
      rfc: {
        type: Sequelize.STRING(13),
      },
      domicilio: {
        type: Sequelize.STRING(50)
      },
      colonia: {
        type: Sequelize.STRING(50)
      },
      mision: {
        type: Sequelize.STRING(500),
        allowNull: false,
        defaultValue: ''
      },
      codigo_postal: {
        type: Sequelize.STRING(5)
      },
      fax: {
        type: Sequelize.STRING(15)
      },
      id_titular: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_representante_legal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Empresas');
  }
};