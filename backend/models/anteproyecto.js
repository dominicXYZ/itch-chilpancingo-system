'use strict';
module.exports = (sequelize, DataTypes) => {
  var Anteproyecto = sequelize.define('Anteproyecto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: {msg: 'El anteproyecto debe tener un nombre'}
      }
    },
    objetivo_general: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        notEmpty: {msg: 'El antrpoyecto debe tener un nombre'}
      }
    },
    origen: {
      type: DataTypes.ENUM,
      values: ['Banco de proyectos', 'Propuesta propia', 'Trabajador'],
      allowNull: true,
      defaultValue: null
    },
    dictamen:{
      type: DataTypes.ENUM,
      values: ['aprobado','no aprobado'],
      allowNull: false,
      defaultValue: 'no aprobado'
    },
    path_file_anteproyecto:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  },{ tableName: 'anteproyectos'});

  Anteproyecto.associate = (models) => {
    Anteproyecto.hasMany(models.revision_anteproyecto, {
      foreignKey: 'id_anteproyecto',
      as: 'revisiones'
    });
    Anteproyecto.belongsTo(models.Alumno, {
      foreignKey: 'id_alumno',
      onDelete: 'CASCADE',
      as: 'alumno'
    });
    Anteproyecto.belongsTo(models.Periodo, {
      foreignKey: 'id_periodo',
      onDelete: 'CASCADE',
      as: 'periodo'
    });
    Anteproyecto.belongsTo(models.asesor_externo, {
      foreignKey: 'id_asesor_externo',
      onDelete: 'CASCADE',
      as: 'asesor_externo'
    })
    Anteproyecto.belongsTo(models.Docente, {
      foreignKey: 'id_asesor_interno',
      onDelete: 'CASCADE',
      as: 'asesor_interno'
    })
  }
  return Anteproyecto;
};