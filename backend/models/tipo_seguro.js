'use strict';
module.exports = (sequelize, DataTypes) => {
  var tipo_seguro = sequelize.define('tipo_seguro', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    }
  }, { tableName: 'tipo_seguros'});
  tipo_seguro.associate = (models) => {
    tipo_seguro.hasMany(models.Alumno, {
      foreignKey: 'id_tipo_seguro',
      as: 'alumnos'
    })
  }
  return tipo_seguro;
};