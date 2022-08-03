'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let migrations = [];
    migrations.push(
      queryInterface.addConstraint('Empresas', ['id_titular'], {
        type: 'FOREIGN KEY',
        name: 'fk_titular_empresa',
        references: {
          table: 'Titulares',
          field: 'id',
        }
      })
    );
    migrations.push(
      queryInterface.addConstraint('Empresas', ['id_representante_legal'], {
        type: 'FOREIGN KEY',
        name: 'fk_representante_legal_empresa',
        references: { //Required field
          table: 'Titulares',
          field: 'id'
        },
        onDelete: 'cascade',
      })
    );
    return Sequelize.Promise.all(migrations);
  },

  down: (queryInterface, Sequelize) => {
    let migrations = [];
    migrations.push(
      queryInterface.removeConstraint('Empresa', 'id_titular')
    )
    migrations.push(
      queryInterface.removeConstraint('Empresa', 'id_representante_legal')
    )
    return Sequelize.Promise.all(migrations);
  }
};

