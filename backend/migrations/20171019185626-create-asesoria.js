'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Asesoria', {
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
      permitir_generar_formato: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      tipo: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['presencial', 'virtual'],
        defaultValue: 'virtual'
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      url_avance: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      temas_a_asesorar: {
        type: Sequelize.STRING(500),
        allowNull: false
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
    return queryInterface.dropTable('Asesoria');
  }
};