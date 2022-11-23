'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      password: '123456', // plain text; agjalskjfaoiis1234 -> hash password
      email: 'admin@gmail.com',
      firstName: 'Giang',
      lastName: 'Pham',
      address: 'USA',
      gender: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
