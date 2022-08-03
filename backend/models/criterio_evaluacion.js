'use strict';
module.exports = (sequelize, DataTypes) => {
  var criterios_evaluacion = sequelize.define('criterio_evaluacion', {
    valor_de_evaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo debe tener un valor'},
      }
    }
  },{tableName: 'criterio_evaluacion'});


  criterios_evaluacion.associate = (models) => {
    criterios_evaluacion.belongsTo(models.evaluacion, {
      foreignKey: 'id_evaluacion',
      onDelete: 'CASCADE',
      as: 'evaluacion'
    })
    criterios_evaluacion.belongsTo(models.criterio, {
      foreignKey: 'id_criterio',
      onDelete: 'CASCADE',
      as: 'ref_criterio'
    })
  }
  return criterios_evaluacion;
};
