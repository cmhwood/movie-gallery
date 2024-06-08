const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  // Add query to get all genres this grabs just the genre title and id
  const query = `
      select movies.id, movies.title, genres.name as genre from movies 
  join movies_genres on movies.id = movies_genres.movie_id
  join genres on movies_genres.genre_id = genres.id;
    `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all genres', err);
      res.sendStatus(500);
    });
});

module.exports = router;
