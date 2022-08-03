'use strict';
module.exports = (sequelize, DataTypes) => {
  var solucion_recomendada = sequelize.define('solucion_recomendada', {
    solucion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Debe indicar la solución recomendada.'}
      }
    },
    solucionado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, { tableName: 'solucion_recomendadas'});
  solucion_recomendada.associate = (models) => {
    solucion_recomendada.belongsTo(models.Asesoria, {
      foreignKey: 'id_asesoria',
      onDelete: 'CASCADE',
      as: 'asesoria'
    } )
  }

  return solucion_recomendada;
};