const mongoose = require('mongoose');
const Movie = require('../server/models/Movie');
const Cast = require('../server/models/Cast');
const Hall = require('../server/models/Hall');
const Screening = require('../server/models/Screening');
const moviesData = require('../src/data/movie.json');
const castData = require('../src/data/cast.json');
const seatsData = require('../src/data/seats.json');
const screeningsData = require('../src/data/screenings.json');
require('dotenv').config();

async function importData() {
  try {
    // Підключення до MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB підключено');

    // Очищення колекцій
    await Movie.deleteMany({});
    await Cast.deleteMany({});
    await Hall.deleteMany({});
    await Screening.deleteMany({});
    console.log('Колекції очищено');

    // 1. Імпорт акторів
    const castDocs = await Cast.insertMany(castData);
    const castMap = castDocs.reduce((map, cast) => {
      map[cast.name] = cast._id;
      return map;
    }, {});
    console.log('Імпортовано акторів:', castDocs.length);

    // 2. Імпорт фільмів
    const movies = moviesData.map(movie => ({
      title: movie.title,
      brief_description: movie.brief_description,
      description: movie.description,
      genres: movie.genres,
      imageURL: movie.imageURL,
      image: movie.image,
      trailer: movie.trailer,
      details: {
        language: movie.details.language,
        release_date: new Date(movie.details.release_date),
        country: movie.details.country,
        rating: movie.details.rating,
        year: movie.details.year,
        duration_minutes: movie.details.duration_minutes,
        display_technologies: movie.details['display-technologies'],
        age_restriction: movie.details.age_restriction,
      },
      cast: movie.id === 1 ? Object.values(castMap) : [],
    }));
    const movieDocs = await Movie.insertMany(movies);
    // Створюємо мапу: id із movie.json до _id у MongoDB
    const movieMap = movieDocs.reduce((map, movie, index) => {
      const jsonMovieId = moviesData[index].id;
      map[jsonMovieId] = movie._id;
      return map;
    }, {});
    console.log('Імпортовано фільмів:', movieDocs.length);
    console.log('Мапа фільмів:', movieMap);

    // 3. Імпорт залу
    const hall = new Hall({
      name: 'Зал 1',
      cinema: 'Планета Кіно',
      seats: seatsData,
      capacity: seatsData.flat().filter(seat => seat > 0).length,
    });
    await hall.save();
    console.log('Імпортовано зал:', hall.name);

    // 4. Імпорт сеансів
    const screenings = screeningsData.map(screening => {
      // Зіставляємо movie_id: 101 до id: 1 у movie.json
      const movieId = screening.movie_id === 101 ? 1 : screening.movie_id;
      const movieMongoId = movieMap[movieId];
      if (!movieMongoId) {
        console.warn(`Фільм із movie_id: ${screening.movie_id} не знайдено, пропускаємо сеанс`);
        return null;
      }
      return {
        movie: movieMongoId,
        cinema: screening.cinema,
        hall: hall._id,
        date: new Date(screening.date),
        times: screening.times,
      };
    }).filter(screening => screening !== null); // Видаляємо невалідні сеанси
    if (screenings.length === 0) {
      throw new Error('Немає валідних сеансів для імпорту');
    }
    await Screening.insertMany(screenings);
    console.log('Імпортовано сеансів:', screenings.length);

    console.log('Імпорт даних успішно завершено');
  } catch (err) {
    console.error('Помилка під час імпорту:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB відключено');
  }
}

importData();