'use strict';
// eslint-disable-next-line no-undef
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      name: 'John Doe',
      email: 'john@test.com',
      password: 'secret',
      created_at: new Date(),
      updated_at: new Date(),
    },{
      id: uuidv4(),
      name: 'Silvia Betna',
      email: 'silvia@test.com',
      password: 'secret',
      created_at: new Date(),
      updated_at: null,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
