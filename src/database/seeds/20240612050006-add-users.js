'use strict';

const {faker} = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = [];
    const numUsers = 100;
    const hashedPassword = bcrypt.hashSync('password', 10);

    for (let i = 0; i < numUsers; i++) {
      users.push({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await queryInterface.bulkInsert('Users', users, {});
    }


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
