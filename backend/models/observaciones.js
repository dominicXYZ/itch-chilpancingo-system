'use strict';
module.exports = (sequelize, DataTypes) => {
  var observaciones = sequelize.define('observaciones', {
    observacion:{
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    solucionada: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    tipo: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['plan_de_trabajo','cronograma']
    }
  }, { tableName: 'observaciones'});

  observaciones.associate = (models) => {
    observaciones.belongsTo(models.Proyecto, {
      foreignKey: 'id_proyecto',
      onDelete: 'CASCADE',
      as: 'proyecto'
    });
    observaciones.belongsTo(models.Docente, {
      foreignKey: 'id_asesor_interno',
      onDelete: 'CASCADE',
      as: 'asesor_interno'
    });
  }
  return observaciones;
};