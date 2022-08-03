'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('evaluaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      observaciones: {
        type: Sequelize.STRING(500),
        allowNull: false,
        defaultValue: ''
      },
      tipo: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['asesor_externo', 'asesor_interno'],
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
    return queryInterface.dropTable('evaluaciones');
  }
};