'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let migrations = [];
    migrations.push(
      queryInterface.addConstraint('seguimiento_proyectos', ['id_evaluacion_asesor_interno'], {
        type: 'FOREIGN KEY',
        name: 'fkey_id_evaluacion_asesor_interno_seguimiento',
        references: { //Required field
          table: 'evaluaciones',
          field: 'id'
        },
        onDelete: 'cascade',
      })
    )
    migrations.push(
      queryInterface.addConstraint('seguimiento_proyectos', ['id_evaluacion_asesor_externo'], {
        type: 'FOREIGN KEY',
        name: 'fkey_id_evaluacion_asesor_externo_seguimiento',
        references: { //Required field
          table: 'evaluaciones',
          field: 'id'
        },
        onDelete: 'cascade',
      })
    )
    return Sequelize.Promise.all(migrations);
  },

  down: (queryInterface, Sequelize) => {
    let migrations = [];
    migrations.push(
      queryInterface.removeConstraint('seguimiento_proyectos', 'fkey_id_evaluacion_asesor_interno_seguimiento')
    )
    migrations.push(
      queryInterface.removeConstraint('seguimiento_proyectos', 'fkey_id_evaluacion_asesor_interno_seguimiento')
    )
    return Sequelize.Promise.all(migrations);
  }
};
