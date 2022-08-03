'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('asesor_externos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      puesto: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        unique: true,
        references: {
          model: 'Usuarios',
          key: 'id',
          as: 'id_usuario'
        }
      },
      id_empresa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Empresas',
          key: 'id',
          as: 'id_empresa'
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
    return queryInterface.dropTable('asesor_externos');
  }
};