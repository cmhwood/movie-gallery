import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  // Displays movie list on the DOM
  return (
    <main>
      <Heading as='h1' size='lg' letterSpacing={'tighter'}>
        The Movie Gallery
      </Heading>
      <section className='movies'>
        {movies.map((movie) => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title}</h3>
              {/* clicking goes to details page */}
              <img
                onClick={() => history.push(`/${movie.id}`)}
                data-testid='toDetails'
                src={movie.poster}
                alt={movie.title}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
