
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cancelacion_proyectos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_proyecto: {
        type: Sequelize.STRING
      },
      justificacion: {
        type: Sequelize.STRING
      },
      id_alumno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Alumnos',
          key: 'id',
          as: 'id_alumno'
        }
      },
      id_asesor_interno: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Docentes',
          key: 'id',
          as: 'id_asesor_interno'
        }
      },
      id_periodo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Periodos',
          key: 'id',
          as: 'id_periodo'
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
    return queryInterface.dropTable('cancelacion_proyectos');
  }
};