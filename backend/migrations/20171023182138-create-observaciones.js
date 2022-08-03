'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('observaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_proyecto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Proyectos',
          key: 'id',
          as: 'id_proyecto'
        }
      },
      id_asesor_interno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Docentes',
          key: 'id',
          as: 'id_asesor_interno'
        }
      },
      observacion: {
        type: Sequelize.STRING(500)
      },
      solucionada: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      tipo: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['plan_de_trabajo', 'cronograma']
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
    return queryInterface.dropTable('observaciones');
  }
};