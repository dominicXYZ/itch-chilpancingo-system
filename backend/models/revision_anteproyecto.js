'use strict';
module.exports = (sequelize, DataTypes) => {
  const revision_anteproyecto = sequelize.define('revision_anteproyecto', {
    esFactible: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['factible', 'no_factible', 'corrección'],
      defaultValue: 'no_factible',
      validate: {
        notEmpty: {msg: 'El campo debe tener un valor'}
      }
    },
    comentario: {
      type: DataTypes.STRING
    }
  }, {tableName: 'revision_anteproyectos', indexes: [{unique: true, fields: ['id_docente', 'id_anteproyecto']}]});

  revision_anteproyecto.associate = (models) => {
    revision_anteproyecto.belongsTo(models.Docente, {
      foreignKey: 'id_docente',
      onDelete: 'CASCADE',
      as: 'docente'
    });
    revision_anteproyecto.belongsTo(models.Anteproyecto, {
      foreignKey: 'id_anteproyecto',
      onDelete: 'CASCADE',
      as: 'anteproyecto'
    })
  }
  return revision_anteproyecto;
};