'use strict';
const models = require('../models');
const { User, Movie, Genre, Rating } = models;
const faker = require ('@faker-js/faker').faker; 

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    const genreCount = faker.number.int({min: 3, max: 10});
    const userCount = faker.number.int({min: 3, max: 20});
    const movieCount = faker.number.int({min: 3, max: 100});
    const ratingCount = faker.number.int({min: 3, max: 100});

    let genres = [];
    let users = [];
    let movies = [];
    let ratings = [];

    // genre-k generálása
    for (let i = 0; i < genreCount; i++) {
      genres.push(
        await Genre.create({
          name: faker.lorem.words({min: 2, max: 6}),
          description: faker.lorem.text()
        })
      );
    }

    // userek generálása
    for (let i = 0; i < userCount; i++) {
      users.push(
        await User.create({
          username: faker.internet.userName(),
          displayname: faker.internet.displayName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          isAdmin: faker.datatype.boolean()
        })
      );
    }

    // movie-k generálása
    for (let i = 0; i < movieCount; i++) {
      movies.push(
        await Movie.create({
          title: faker.lorem.words({min: 1, max: 5}),
          director: faker.person.fullName(),
          description: faker.lorem.sentences({min: 4, max: 10}),
          year: faker.number.int({min: 1980, max: 2023}),
          imageUrl: faker.image.urlPicsumPhotos(),
          ratingsEnabled: true
        })
      );
    }

    // id-k, amiket hozzárendül a ratingekhez
    let userIds = [];
    let movieIds = [];
    users.forEach(user => userIds.push(user.id));
    movies.forEach(movie => movieIds.push(movie.id));

    // ratingek generálása
    for (let i = 0; i < ratingCount; i++) {
      ratings.push(
        await Rating.create({
          rating: faker.number.int({min: 1, max: 4}),
          comment: faker.lorem.sentence({min: 1, max: 5}),
          UserId: faker.helpers.arrayElement(userIds),
          MovieId: faker.helpers.arrayElement(movieIds)
        })
      );
    }

    // kapcsolótábla feltöltése, minden filmhez rendelünk egy random műfajt
    movies.forEach(async movie => {
      await movie.addGenre(faker.helpers.arrayElement(genres))
    });
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
