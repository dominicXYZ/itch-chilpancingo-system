'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('asesor_externos', [
      {
        nombre: 'LIC. Norma Angélica Marino García',
        puesto: 'Psicóloga',
        id_usuario: 13,
        id_empresa: 1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'LIC. Inés Mondragón Pérez',
        puesto: 'Contadora',
        id_usuario: 14,
        id_empresa: 1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'ING. Valentina Valdez Valdivia',
        puesto: 'Jefa de informatica',
        id_usuario: 15,
        id_empresa: 1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'ING. Arturo Valadez López',
        puesto: 'Residente gral. De carreteras federales',
        id_usuario: 16,
        id_empresa: 2,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'ISC. Miguel Ángel Pineda Velázquez',
        puesto: 'Jefe de la unidad de tecnologías de la información',
        id_usuario: 17,
        id_empresa: 2,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'LIC. Juan Carlos Salas Gutiérrez',
        puesto: 'Jefe del departamento de recursos financieros',
        id_usuario: 18,
        id_empresa: 2,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'ING. José Manuel Benítez Carranza',
        puesto: 'Jefe del departamento de Informática',
        id_usuario: 19,
        id_empresa: 3,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'MTRO. Sergio Brito Salas',
        puesto: 'Supervisor',
        id_usuario: 20,
        id_empresa: 3,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'LIC. Ana Luz Chávez Domínguez',
        puesto: 'Contadora',
        id_usuario: 21,
        id_empresa: 3,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'LIC. Juan Felipe Caballero Flores',
        puesto: 'Jefe del departamento de recursos financieros',
        id_usuario: 22,
        id_empresa: 4,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'LIC. Mirna Santos Oropeza',
        puesto: 'Jefe de recursos humanos',
        id_usuario: 23,
        id_empresa: 4,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'ING. Paola Gómez Farías',
        puesto: 'Jefe del área de desarrollo',
        id_usuario: 24,
        id_empresa: 4,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
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
