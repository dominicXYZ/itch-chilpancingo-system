'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Alumnos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_control: {
        type: Sequelize.STRING(8),
        allowNull: false,
        unique: true,
      },
      plan_estudios: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['2009-2010', '2015-2016'],
      },
      nombre: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      ap_paterno: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      ap_materno: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      sexo: {
        type: Sequelize.ENUM,
        values: ['H', 'M']
      },
      domicilio: {
        type: Sequelize.STRING(200)
      },
      colonia: {
        type: Sequelize.STRING(30)
      },
      codigo_postal: {
        type: Sequelize.STRING(5)
      },
      no_seguro: {
        type: Sequelize.STRING(20), 
        allowNull: true
      },
      numero_celular: {
        type: Sequelize.STRING(20)
      },
      ciudad: {
        type: Sequelize.STRING(150),
        allowNull: false,
        defaultValue: ''
      },
      id_tipo_seguro: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
          model: 'tipo_seguros',
          key: 'id',
          as: 'id_tipo_seguro'
        }
      },
      id_carrera: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'carreras',
          key: 'id',
          as: 'id_carrera'
        }
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        onDelete: 'CASCADE',
        references: {
          model: 'usuarios',
          key: 'id',
          as: 'id_usuario'
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
    return queryInterface.dropTable('Alumnos');
  }
};