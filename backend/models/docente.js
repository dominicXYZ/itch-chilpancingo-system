'use strict';
module.exports = (sequelize, DataTypes) => {
  var Docente = sequelize.define('Docente', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    ap_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    ap_materno:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    titulo:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    status: {
      type: DataTypes.ENUM, 
      allowNull: false, 
      values: ['activo','inactivo'],
      validate: {
        notEmpty: {msg: 'El campo debe tener un valor'}
      }
    }
  },{ tableName: 'docentes'}
  );
  Docente.associate = (models) => {
    Docente.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
      onDelete: 'CASCADE',
      as: 'usuario',
    });
    Docente.belongsTo(models.Departamento, {
      foreignKey: 'id_departamento',
      onDelete: 'CASCADE',
      as: 'departamento',
    })

    Docente.hasMany(models.docente_carreras, {
      foreignKey: 'id_docente',
      onDelete: 'CASCADE',
      as: 'docente_carrera'
    });
    
  }
  return Docente;
};