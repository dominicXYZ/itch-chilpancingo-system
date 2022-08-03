'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('seguimiento_proyectos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url_seguimiento: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null
      },
      id_seguimiento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Seguimientos',
          key: 'id',
          as: 'id_seguimiento'
        }
      },
      id_proyecto: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Proyectos',
          key: 'id',
          as: 'id_proyecto'
        }
      },
      id_evaluacion_asesor_interno: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        defaultValue: null
      },
      id_evaluacion_asesor_externo: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        defaultValue: null
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
    return queryInterface.dropTable('seguimiento_proyectos');
  }
};