'use strict';
module.exports = (sequelize, DataTypes) => {
  var Seguimiento = sequelize.define('Seguimiento', {
    fecha_inicial: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validates: {
        isDate: {msg: 'La fecha inicial debe ser de tipo fecha'}
      }
    },
    fecha_final: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validates: {
        isDate: {msg: 'La fecha final debe ser de tipo fecha'}
      }
    }
  }, { tableName: 'seguimientos'});
  Seguimiento.associate = (models) => {
    Seguimiento.belongsTo(models.Periodo, {
      foreignKey: 'id_periodo',
      onDelete: 'CASCADE',
      as: 'periodo'
    })
    Seguimiento.hasMany(models.seguimiento_proyecto, {
      foreignKey: 'id_seguimiento',
      as: 'seguimientos_proyecto'
    })
  }
  return Seguimiento;
};