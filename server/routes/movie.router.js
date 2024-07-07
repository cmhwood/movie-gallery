const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GETS ALL MOVIES
router.get("/", (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "id" ASC;
  `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

// GETS THE DETAILS FOR THE MOVIE THAT WAS CLICKED ON
router.get("/:id", (req, res) => {
  movieId = req.params.id;
  const query = `
  SELECT "movies"."title", "movies"."description", "movies"."poster", STRING_AGG("genres"."name", ', ') as "genre" 
  FROM "movies"
  JOIN "movies_genres" on "movies"."id"="movies_genres"."movie_id"
  JOIN "genres" on "genres"."id"="movies_genres"."genre_id"
  WHERE "movies"."id"=$1
  GROUP BY "movies"."title", "movies"."description", "movies"."poster"
  ORDER BY "title" ASC;
  `;
  pool
    .query(query, [movieId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get a movies details", err);
      res.sendStatus(500);
    });
});

//EDIT PAGE PUT
router.put("/:id", (req, res) => {
  const updatedMovie = req.body;
  // req.body should contain the data needed for PUT
  const queryText = `
    UPDATE "movies"
      SET 
        "title"=$1,
        "description" =$2
      WHERE
        "id"=$3;
  `;
  const queryValues = [updatedMovie.title, updatedMovie.description, updatedMovie.id];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error in PUT /api/movies/:id", err);
      res.sendStatus(500);
    });
});

// EDIT PAGE DELETE
/* DELETE BUTTON MIGHT NEED A DB.SQL ADJUSTMENT FOR CASCADE TO WORK, CHECK database.sql FILE IF NOT WORKING */
router.delete("/:id", (req, res) => {
  pool
    .query('DELETE FROM "movies" WHERE id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error in PUT /api/movies/:id", err);
      res.sendStatus(500);
    });
});

// given this, used in AddMovie
router.post("/", (req, res) => {
  //STRETCH GOAL
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description,
  ];
  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, insertMovieValues)
    .then((result) => {
      // ID IS HERE!
      console.log("New Movie Id:", result.rows[0].id);
      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference:
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [createdMovieId, req.body.genre_id];
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, insertMovieGenreValues)
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
