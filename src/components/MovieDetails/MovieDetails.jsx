import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MovieDetails() {
  const dispatch = useDispatch;

  const movieList = useSelector((store) => store.movieList);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <h1>Movie Details</h1>
    // bring in Title, Genra, Poster, Description
  );
}
