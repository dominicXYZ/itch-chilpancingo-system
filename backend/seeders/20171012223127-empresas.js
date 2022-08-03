'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Empresas',[
      {
        nombre: 'Unidad de Especialidad Médica – Centro de Atención Primaria en Adicciones (UNEME-CAPA)',
        clasificacion: 'público',
        rfc: 'SES870401TX8',
        domicilio: 'Venustiano Carranza No. 18',
        colonia: '20 de noviembre',
        codigo_postal: '39096',
        fax: '',
        id_titular: 1,
        id_representante_legal: 1, 
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'Secretaria de Comunicaciones y Transportes',
        clasificacion: 'servicios',
        rfc: 'NUF865849RR3',
        domicilio: 'Dr. Gabriel Leyva Alarcón S.N.',
        colonia: 'Burócratas',
        codigo_postal: '39091',
        fax: '4725227',
        id_titular: 2,
        id_representante_legal: 3,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'Coordinación Estatal del Servicio Profesional Docente (CESPD)  del Estado de Guerrero',
        clasificacion: 'público',
        rfc: 'SPD547728CE4',
        domicilio: 'Prolongación Valerio Trujano 5',
        colonia: 'Nicolás Bravo',
        codigo_postal: '39050',
        fax: '4725227',
        id_titular: 4,
        id_representante_legal: 5,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        nombre: 'Cafetalera los portales',
        clasificacion: 'privado',
        rfc: 'POR948394CF9',
        domicilio: 'Heroico Colegio Militar 7',
        colonia: 'Centro',
        codigo_postal: '39000',
        fax: '4723599',
        id_titular: 6,
        id_representante_legal: 6,
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
