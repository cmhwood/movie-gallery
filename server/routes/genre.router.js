const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Endpoint to get all movies with their genres
router.get('/', (req, res) => {
  const query = `
      SELECT m.*, array_agg(g.name) AS genres
      FROM movies m
      LEFT JOIN movies_genres mg ON m.id = mg.movie_id
      LEFT JOIN genres g ON mg.genre_id = g.id
      GROUP BY m.id
      ORDER BY m.title ASC;
    `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('ERROR: Get all genres', err);
      res.sendStatus(500);
    });
});

module.exports = router;
