'use strict';
module.exports = (sequelize, DataTypes) => {
  var Actividad = sequelize.define('Actividad', {
    semana:{
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    
    cantidad_semanas: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['1', '2','3','4','5'],
      defaultValue: '1'
    },
    resultados: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['completado', 'no_completado'],
      defaultValue: 'no_completado'
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: false,
      
    }
    
  }, { tableName: 'actividades'});
  Actividad.associate = (models) => {
    Actividad.belongsTo(models.Proyecto, {
      foreignKey: 'id_proyecto',
      onDelete: 'CASCADE',
      as: 'proyecto'
    })
    Actividad.belongsTo(models.Docente, {
      foreignKey: 'id_asesor_interno',
      onDelete: 'CASCADE',
      as: 'asesor_interno'
    })

   
  }
  return Actividad;
};