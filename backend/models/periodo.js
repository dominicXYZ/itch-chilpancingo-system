'use strict';
module.exports = (sequelize, DataTypes) => {
  var Periodo = sequelize.define('Periodo', {
    periodo:{
      type: DataTypes.ENUM,
      values: ['FEBRERO-JUNIO','AGOSTO-DICIEMBRE'],
      allowNull: false
    },
    ciclo:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: {msg: 'El valor debe ser numerico, ejemplo: 2017'},
        len: [4,4]
      }
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    fecha_inicio_entrega_anteproyecto: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    fecha_fin_entrega_anteproyecto: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    filename_dictamen: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  }, {tableName: 'periodos', indexes: [{unique: true, fields: ['periodo', 'ciclo', 'id_carrera']}]});
  
  Periodo.associate = (models) => {
    Periodo.hasMany(models.Anteproyecto, {
      foreignKey: 'id_periodo',
      as: 'anteproyectos'
    })
    Periodo.belongsTo(models.Carrera, {
      foreignKey: 'id_carrera',
      onDelete: 'CASCADE',
      as: 'carrera'
    })
    Periodo.hasMany(models.Seguimiento, {
      foreignKey: 'id_periodo',
      onDelete: 'CASCADE',
      as: 'seguimientos'
    })
  }
  return Periodo;
};