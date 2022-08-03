'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Titulares', [
      {
        titulo: 'Lic.',
        nombre: 'Jesús Eduardo Tejada Herrera',
        puesto: 'Coordinador',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'Ing.',
        nombre: 'Rigoberto Villegas Montoya',
        puesto: 'Director general',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'Lic.',
        nombre: 'Leticia Hernández Gómez',
        puesto: 'Jefe de departamento de recursos humanos',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'Dra.',
        nombre: 'Margarita Nava Nava',
        puesto: 'Coordinadora Estatal',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        titulo: 'Ing.',
        nombre: 'José Alfredo Jiménez Campos',
        puesto: 'Jefe del departamento de recursos humanos',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }, 
      {
        titulo: 'Lic.',
        nombre: 'Juanita García León',
        puesto: 'Gerente general',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }
  ]);
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
