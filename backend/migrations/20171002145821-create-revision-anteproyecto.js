'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('revision_anteproyectos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      esFactible: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['factible', 'no_factible', 'corrección'],
        defaultValue: 'no_factible',
      },
      comentario: {
        type: Sequelize.STRING(500),
      },
      id_docente: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Docentes',
          key: 'id',
          as: 'id_docente'
        }
      },
      id_anteproyecto: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Anteproyectos',
          key: 'id',
          as: 'id_anteproyecto'
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
    }, {uniqueKeys: [{name: 'unica_revision_docente', fields: ['id_docente', 'id_anteproyecto']}]});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('revision_anteproyectos');
  }
};