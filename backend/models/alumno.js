'use strict';
module.exports = (sequelize, DataTypes) => {
  var Alumno = sequelize.define('Alumno', {
    no_control: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: {msg: 'El numero de control debe ser numerico'},
        notEmpty: {msg: 'El campo no debe estar vacio'},
        len: [8,8]
      }
    },
    plan_estudios: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['2009-2010', '2015-2016'],
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'}
      }
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    ap_paterno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    ap_materno: {
      type: DataTypes.STRING,

      allowNull: false,
      validate: {
        notEmpty: {msg: 'El campo no debe estar vacio'},
      }
    },
    sexo: {
      type: DataTypes.ENUM,
      values: ['H', 'M'],
      allowNull: false
    },
    domicilio: {
      type: DataTypes.STRING
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    colonia: {
      type: DataTypes.STRING
    },
    codigo_postal: {
      type: DataTypes.STRING
    },
    no_seguro: {
      type: DataTypes.STRING, 
      allowNull: true,
      validate: {
        isNumeric: {msg: 'Deben ser solo letras '}
      }
    },
    numero_celular: {
      type: DataTypes.STRING
    }
  },  { tableName: 'alumnos'});
  Alumno.associate = (models) => {
    Alumno.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
      onDelete: 'CASCADE',
      as: 'usuario'
    });
    Alumno.belongsTo(models.tipo_seguro, {
      foreignKey: 'id_tipo_seguro',
      onDelete: 'CASCADE',
      as: 'seguro'
    });
    Alumno.belongsTo(models.Carrera, {
      foreignKey: 'id_carrera',
      onDelete: 'CASCADE',
      as: 'carrera'
    })
  }
  return Alumno;
};