'use strict';
module.exports = (sequelize, DataTypes) => {
  var revision_seguimiento = sequelize.define('revision_seguimiento', {
    observacion: {
      type: DataTypes.STRING,
      allowNull: false,
      validates: {
        notEmpty: {msg: 'Debe indicar la observación'}
      }
    },
    solucionado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },{tableName: 'revision_seguimientos'});

  revision_seguimiento.associate = (models) => {
    revision_seguimiento.belongsTo(models.seguimiento_proyecto, {
      foreignKey: 'id_seguimiento_proyecto',
      onDelete: 'CASCADE',
      as: 'seguimiento_proyecto'
    })
    revision_seguimiento.belongsTo(models.Docente, {
      foreignKey: 'id_docente',
      onDelete: 'CASCADE',
      as: 'docente'
    })
  }
  return revision_seguimiento;
};