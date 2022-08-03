'use strict';
module.exports = (sequelize, DataTypes) => {
  var cancelacion_proyecto = sequelize.define('cancelacion_proyecto', {
    nombre_proyecto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El anteproyecto debe tener un nombre'}
      }
    },
    justificacion: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    }
  },{tableName: 'cancelacion_proyectos'});
  cancelacion_proyecto.associate = models => {
    cancelacion_proyecto.belongsTo(models.Alumno, {
      foreignKey: 'id_alumno',
      onDelete: 'CASCADE',
      as: 'alumno'
    });
    cancelacion_proyecto.belongsTo(models.Docente, {
      foreignKey: 'id_asesor_interno',
      onDelete: 'CASCADE',
      as: 'asesor_interno'
    });
    cancelacion_proyecto.belongsTo(models.Periodo, {
      foreignKey: 'id_periodo',
      onDelete: 'CASCADE',
      as: 'periodo'
    })

  }
  return cancelacion_proyecto;
};