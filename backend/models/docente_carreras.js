'use strict';
module.exports = (sequelize, DataTypes) => {
  const docente_carreras = sequelize.define('docente_carreras', {
    rol: {
      type: DataTypes.ENUM,
      values: ['docente','jefe_proyecto','presidente_academia', 'deshabilitado'],
      allowNull: false
    }
  }, {tableName: 'docente_carreras', indexes: [{unique: true, fields: ['id_docente', 'id_carrera']}]});

  docente_carreras.associate = (models) => {
    docente_carreras.belongsTo(models.Docente, {
      foreignKey: 'id_docente',
      onDelete: 'CASCADE',
      as: 'docente'
    })
    docente_carreras.belongsTo(models.Carrera, {
      foreignKey: 'id_carrera',
      onDelete: 'CASCADE'
    })
  }
  return docente_carreras;
};