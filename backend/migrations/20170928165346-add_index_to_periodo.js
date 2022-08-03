'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Periodos', {
        name: 'index_uq_periodo_ciclo',
        fields: ['periodo', 'ciclo', 'id_carrera'],
        unique: true,
        type: 'UNIQUE',
      })
    },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
