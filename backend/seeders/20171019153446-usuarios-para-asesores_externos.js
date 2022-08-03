'use strict';
const bCrypt = require('bcrypt-nodejs');
const generateHash = (contrasenia) => {
  return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [
      {
        // empienza en id_usuario 13
        correo: 'norm-arig@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'i_mper@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'vale-vv1@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'arturo_lop@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'angel.pinv@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'juca-gtz@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'mir1221@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'sbsal@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'Anidom.10@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'jufecaflo@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'mirna_santos@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        correo: 'pagom_fr@gmail.com',
        rol: 'asesor_externo',
        contrasenia: generateHash('123456'),
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
