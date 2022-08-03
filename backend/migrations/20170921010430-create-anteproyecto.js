'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Anteproyectos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      objetivo_general: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      origen: {
        type: Sequelize.ENUM,
        values: ['Banco de proyectos', 'Propuesta propia', 'Trabajador'],
        allowNull: true,
        defaultValue: null
      },
      dictamen:{
        type: Sequelize.ENUM,
        values: ['aprobado','no aprobado'],
        allowNull: false,
        defaultValue: 'no aprobado'
      },
      path_file_anteproyecto:{
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      id_alumno: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        unique: true,
        allowNull: false,
        references: {
          model: 'alumnos',
          key: 'id',
          as: 'id_alumno'
        }
      },
      id_periodo: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'periodos',
          key: 'id',
          as: 'id_periodo'
        }
      },
      id_asesor_externo: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'asesor_externos',
          key: 'id',
          as: 'id_asesor_externo'
        }
      },
      id_asesor_interno: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'docentes',
          key: 'id',
          as: 'id_asesor_interno'
        }
      }
      ,
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
    return queryInterface.dropTable('Anteproyectos');
  }
};