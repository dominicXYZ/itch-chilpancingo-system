'use strict';
module.exports = (sequelize, DataTypes) => {
  var Titular = sequelize.define('Titular', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       notEmpty: {msg: 'El titulo no debe estar vacío.'}
      }
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El nombre no debe estar vacío'},
        min: 15,
      }
    },
    puesto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El nombre no debe estar vacío'}
      }
    }
  }, {tableName: 'titulares'});
  return Titular;
};
