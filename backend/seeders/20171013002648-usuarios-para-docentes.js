'use strict';
const bCrypt = require('bcrypt-nodejs');
const generateHash = (contrasenia) => {
  return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [
      {
        correo: 'yanet@gmail.com',
        rol: 'docente',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'jose_daniel@gmail.com',
        rol: 'docente',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'oscar@gmail.com',
        rol: 'docente',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: '00fblanco@gmail.com',
        rol: 'jefe_departamento',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'mauricio@gmail.com',
        rol: 'docente',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'jose_expinoza@gmail.com',
        rol: 'docente',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'victor_garcia@gmail.com',
        rol: 'docente',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'ramiero_silva@gmail.com',
        rol: 'docente',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'esmeralda_hernandez@gmail.com',
        rol: 'docente',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'toledo@gmail.com',
        rol: 'jefe_departamento',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'jesus_marin@gmail.com',
        rol: 'jefe_departamento',
        contrasenia: generateHash('123456'),
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
