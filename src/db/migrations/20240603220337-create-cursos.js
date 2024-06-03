'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comision: {
        type: Sequelize.STRING
      },
      turno: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fechaInicio: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fechaFin: {
        allowNull: false,
        type: Sequelize.DATE
      },
      materiaId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cursos');
  }
};