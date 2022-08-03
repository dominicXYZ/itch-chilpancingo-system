'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Periodos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      periodo:{
        type: Sequelize.ENUM,
        values: ['FEBRERO-JUNIO','AGOSTO-DICIEMBRE'],
        allowNull: false
      },
      ciclo:{
        type: Sequelize.STRING(4),
        allowNull: false
      },
      fecha_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      fecha_fin: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      fecha_inicio_entrega_anteproyecto: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      fecha_fin_entrega_anteproyecto: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      filename_dictamen: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      id_carrera:{
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'carreras',
          key: 'id',
          as: 'id_carrera'
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
    return queryInterface.dropTable('Periodos');
  }
};