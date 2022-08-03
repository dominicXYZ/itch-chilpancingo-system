'use strict';
module.exports = (sequelize, DataTypes) => {
  const Departamento = sequelize.define('Departamento', {
    nombre:  {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {msg: 'El campo no debe estar vacio'}
        }
    }
  }, { tableName: 'departamentos'});
  // relaciones
  Departamento.associate = (models) => {
    Departamento.hasMany(models.Carrera, {
      foreignKey: 'id_departamento',
      as: 'carreras'
    })
    Departamento.hasMany(models.Docente, {
      foreignKey: 'id_departamento',
      as: 'docentes'
    },)
  }
  return Departamento;
};