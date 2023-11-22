'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('GenreMovie', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GenreId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      MovieId: {
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

    await queryInterface.addConstraint('GenreMovie', {
      fields: ['GenreId'],
      type: 'foreign key',
      name: 'fk_genre_movie_genre',
      references: {
      table: 'Genres',
      field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    
    await queryInterface.addConstraint('GenreMovie', {
      fields: ['MovieId'],
      type: 'foreign key',
      name: 'fk_genre_movie_movie',
      references: {
      table: 'Movies',
      field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('GenreMovie');
  }
};
