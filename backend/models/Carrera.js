'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {msg: 'El campo no debe estar vacio'}
        }
    }
  },{ tableName: 'carreras'});
  Carrera.associate = (models) => {
    Carrera.belongsTo(models.Departamento, {
      foreignKey: 'id_departamento',
      onDelete: 'CASCADE',
      as: 'departamento'
    });
    Carrera.hasMany(models.Periodo, {
      foreignKey: 'id_carrera',
      as: 'periodos'
    });
    Carrera.hasMany(models.docente_carreras, {
      foreignKey: 'id_carrera',
      as: 'docentes_carreras'
    },);
  }
  return Carrera;
};