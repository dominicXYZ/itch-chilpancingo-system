'use strict';
module.exports = (sequelize, DataTypes) => {
  var evaluacion = sequelize.define('evaluacion', {
    observaciones: {
      type:DataTypes.STRING(500),
      allowNull: false,
      defaultValue: ''
    },
    tipo: {
      type: DataTypes.ENUM,
      values: ['asesor_externo', 'asesor_interno'],
      validate: {
        notEmpty: {msg: 'El campo debe tener un valor'}
      }
    }
  },{tableName: 'evaluaciones'});
  
  evaluacion.associate = (models) => {
    evaluacion.hasMany(models.criterio_evaluacion, {
      foreignKey: 'id_evaluacion',
      as: 'criterios_de_evaluacion'
    })
  }
  return evaluacion;
};