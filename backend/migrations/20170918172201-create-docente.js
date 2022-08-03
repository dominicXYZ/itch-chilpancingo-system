'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Docentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(40),
        allowNull: false,
        validate: {
          notEmpty: {msg: 'El campo no debe estar vacio'}
        }
      },
      ap_paterno: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: {msg: 'El campo no debe estar vacio'}
        }
      },
      ap_materno: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: {msg: 'El campo no debe estar vacio'}
        }
      },
      titulo:  {
        type: Sequelize.STRING(10),
        allowNull: false,
        validate: {
          notEmpty: {msg: 'El campo no debe estar vacio'}
        }
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
      id_departamento: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Departamentos',
          key: 'id',
          as: 'id_departamento'
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
    return queryInterface.dropTable('Docentes');
  }
};