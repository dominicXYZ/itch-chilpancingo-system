'use strict';
module.exports = (sequelize, DataTypes) => {
  var criterio = sequelize.define('criterio', {
    descripcion: {
      type: DataTypes.STRING
    },
    valor_max: {
      type: DataTypes.INTEGER
    },
    tipo: {
      type: DataTypes.ENUM,
      values: ['asesor_externo', 'asesor_interno'],
      validate: {
        notEmpty: {msg: 'El campo debe tener un valor'}
      }
    },
    anexo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo debe tener un valor'}
      }
    }
  }, { tableName: 'criterios'});


  criterio.associate = (models) => {
    criterio.hasMany(models.criterio_evaluacion, {
      foreignKey: 'id_criterio',
      as: 'criterio'
    })
  }
  return criterio;
};