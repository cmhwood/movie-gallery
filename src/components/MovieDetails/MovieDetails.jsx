import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './movieDetails.css';

export default function MovieDetails() {
  const movies = useSelector((store) => store.movies);
  const genres = useSelector((store) => store.genres);
  const [currentMovie, setCurrentMovie] = useState([]);
  const [currentGenres, setCurrentGenres] = useState([]);
  const history = useHistory();

  // Grab the ID to pull from the URL
  let { id } = useParams();
  // Initializes stores to access variables
  useEffect(() => {
    setCurrentMovie(movies.filter((item) => id == item.id));
    setCurrentGenres(genres.filter((item) => id == item.id));
  }, []);

  // Displays movie details on the DOM
  // Bring in Title, Genre, Poster, Description
  return (
    <div className='desc'>
      <h1>
        <strong>Movie Details</strong>
      </h1>
      <h4>{currentMovie[0]?.title}</h4>
      <img src={currentMovie[0]?.poster} />
      <h4>
        <strong>Genres:</strong>
      </h4>
      {currentGenres?.map((item, i) => (
        <p key={i}>{item.genre}</p>
      ))}
      <h4>
        <strong>Description:</strong>
      </h4>
      <p>{currentMovie[0]?.description}</p>
      <button class='btn default' data-testid='toList' onClick={() => history.push('/')}>
        Return to Movies
      </button>
    </div>
  );
}
