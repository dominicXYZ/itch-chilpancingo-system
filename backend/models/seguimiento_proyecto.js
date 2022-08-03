'use strict';
module.exports = (sequelize, DataTypes) => {
  var seguimiento_proyecto = sequelize.define('seguimiento_proyecto', {
    url_seguimiento: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: {msg: 'Debe indicar la url del seguimiento'}
      }
    }
  }, { tableName: 'seguimiento_proyectos'});
  seguimiento_proyecto.associate = (models) => {
    seguimiento_proyecto.hasMany(models.revision_seguimiento, {
      foreignKey: 'id_seguimiento_proyecto',
      onDelete: 'CASCADE',
      as: 'revisiones_seguimiento'
    })
    seguimiento_proyecto.belongsTo(models.Seguimiento, {
      foreignKey: 'id_seguimiento',
      onDelete: 'CASCADE',
      as: 'seguimiento'
    })
    seguimiento_proyecto.belongsTo(models.Proyecto, {
      foreignKey: 'id_proyecto',
      onDelete: 'CASCADE',
      as: 'proyecto'
    })
    seguimiento_proyecto.belongsTo(models.evaluacion, {
      foreignKey: 'id_evaluacion_asesor_interno',
      as: 'evaluacion_asesor_interno'
    })
    seguimiento_proyecto.belongsTo(models.evaluacion, {
      foreignKey: 'id_evaluacion_asesor_externo',
      as: 'evaluacion_asesor_externo'
    })

  }

  return seguimiento_proyecto;
};