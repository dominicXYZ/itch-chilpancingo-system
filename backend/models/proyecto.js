'use strict';
module.exports = (sequelize, DataTypes) => {
  var Proyecto = sequelize.define('Proyecto', {
    filename_plan_trabajo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aprobacion_plan_trabajo:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    filename_cronograma: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aprobacion_cronograma:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    url_informe_tecnico: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    autorizar_carta_liberacion_asesor_interno: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    autorizar_carta_liberacion_asesor_externo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, { tableName: 'proyectos'});
  Proyecto.associate = (models) => {
    Proyecto.belongsTo(models.Anteproyecto, {
      foreignKey: 'id_anteproyecto',
      onDelete: 'CASCADE',
      as: 'anteproyecto'
    })

    Proyecto.hasMany(models.Asesoria, {
      foreignKey: 'id_proyecto',
      as: 'asesorias'
    })
    Proyecto.hasMany(models.seguimiento_proyecto, {
      foreignKey: 'id_proyecto',
      as: 'seguimientos_proyecto'
    })
    Proyecto.hasMany(models.observaciones, {
      foreignKey: 'id_proyecto',
      as: 'observaciones'
    })
    Proyecto.belongsTo(models.evaluacion, {
      foreignKey: 'id_evaluacion_asesor_interno',
      as: 'evaluacion_asesor_interno'
    })
    Proyecto.belongsTo(models.evaluacion, {
      foreignKey: 'id_evaluacion_asesor_externo',
      as: 'evaluacion_asesor_externo'
    })

  }
  return Proyecto;
};