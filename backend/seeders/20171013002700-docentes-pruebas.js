'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Docentes', [
      {
        titulo: 'M.C.',
        nombre: 'Yanet',
        ap_paterno: 'Evangelista',
        ap_materno: 'Alcocer',
        id_usuario: 2,
        id_departamento: 1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'ING.',
        nombre: 'José Daniel',
        ap_paterno: 'Sanchéz',
        ap_materno: 'Rodríguez',
        id_usuario: 3, 
        id_departamento: 1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'M.C.',
        nombre: 'Oscar Gabriel',
        ap_paterno: 'Flores',
        ap_materno: 'Rodríguez',
        id_usuario: 4, 
        id_departamento: 1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'M.C.',
        nombre: 'Moises',
        ap_paterno: 'Vázquez',
        ap_materno: 'Peña',
        id_usuario: 5, 
        id_departamento: 1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'M.C.',
        nombre: 'Mauricio',
        ap_paterno: 'Cordova',
        ap_materno: 'Portillo',
        id_usuario: 6, 
        id_departamento: 1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'ING',
        nombre: 'José',
        ap_paterno: 'Espinoza',
        ap_materno: 'Benitez',
        id_usuario: 7, 
        id_departamento: 2, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'ING.',
        nombre: 'Victor',
        ap_paterno: 'García',
        ap_materno: 'Díaz',
        id_usuario: 8, 
        id_departamento: 2, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'M.C.',
        nombre: 'Ramiro',
        ap_paterno: 'Ruiz',
        ap_materno: 'Silva',
        id_usuario: 9, 
        id_departamento: 2, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'LIC.',
        nombre: 'Esmeralda',
        ap_paterno: 'Hernández',
        ap_materno: 'Ramírez',
        id_usuario: 10, 
        id_departamento: 3, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'M.C.',
        nombre: 'Toledo',
        ap_paterno: 'Rodriguez',
        ap_materno: 'Corona',
        id_usuario: 11, 
        id_departamento: 4, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'M.A.T.I',
        nombre: 'Jesús',
        ap_paterno: 'Marín',
        ap_materno: 'Robles',
        id_usuario: 12, 
        id_departamento: 5, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }
      


    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
