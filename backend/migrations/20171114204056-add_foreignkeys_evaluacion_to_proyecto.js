'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    let migrations = [];
    migrations.push(
      queryInterface.addConstraint('Proyectos', ['id_evaluacion_asesor_interno'], {
        type: 'FOREIGN KEY',
        name: 'fkey_id_evaluacion_asesor_interno',
        references: { //Required field
          table: 'evaluaciones',
          field: 'id'
        },
        onDelete: 'cascade',
      })
    )
    migrations.push(
      queryInterface.addConstraint('Proyectos', ['id_evaluacion_asesor_externo'], {
        type: 'FOREIGN KEY',
        name: 'fkey_id_evaluacion_asesor_externo',
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    let migrations = [];
    migrations.push(
      queryInterface.removeConstraint('Proyectos', 'fkey_id_evaluacion_asesor_externo')
    )
    migrations.push(
      queryInterface.removeConstraint('Proyectos', 'fkey_id_evaluacion_asesor_interno')
    )
    return Sequelize.Promise.all(migrations);

  }
};
