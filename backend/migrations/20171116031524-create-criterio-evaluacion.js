'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('criterio_evaluacion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_evaluacion: {
        type: Sequelize.INTEGER
      },
      valor_de_evaluacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_evaluacion: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'evaluaciones',
          key: 'id',
          as: 'id_evaluacion'
        }
      },
      id_criterio: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'criterios',
          key: 'id',
          as: 'id_criterio'
        }
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
    return queryInterface.dropTable('criterio_evaluacion');
  }
};