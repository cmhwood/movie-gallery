import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function AddMovie() {
  const genres = useSelector((store) => store.genres);
  const history = useHistory();
  const dispatch = useDispatch();

  const [movieTitle, setMovieTitle] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieGenre, setMovieGenre] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChangeTitle = (e) => {
    setMovieTitle(e.target.value);
  };

  const handleInputChangePoster = (e) => {
    setMoviePoster(e.target.value);
  };

  const handleInputChangeDesc = (e) => {
    setMovieDescription(e.target.value);
  };

  const movieData = {
    title: movieTitle,
    poster: moviePoster,
    description: movieDescription,
    genre_id: movieGenre,
  };

  function postMovie() {
    console.log('checking payload of submit', movieData);

    if (!movieTitle || !moviePoster || !movieDescription || !movieGenre) {
      setShowAlert(true);
      return;
    }

    dispatch({
      type: 'POST_MOVIE',
      payload: movieData,
    });
    setMovieTitle('');
    setMoviePoster('');
    setMovieDescription('');
    setMovieGenre('');
    history.push(`/`);
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  return (
    <>
      {showAlert && (
        <div className='alert alert-dismissible alert-danger'>
          <button type='button' className='btn-close' onClick={() => setShowAlert(false)}></button>
          <strong>Oh snap!</strong> Change a few things up and try submitting again.
        </div>
      )}
      <form>
        <div class='form-group container'>
          <div class='form-floating mb-3'>
            <input
              type='text'
              class='form-control'
              id='floatingInput'
              value={movieTitle}
              onChange={handleInputChangeTitle}
            />
            <label for='floatingInput'>Enter Movie Title Here</label>
          </div>
          <div class='form-floating mb-3'>
            <input
              type='url'
              class='form-control'
              id='floatingInput'
              value={moviePoster}
              onChange={handleInputChangePoster}
            />
            <label for='floatingInput'>Enter Movie Poster URL Here</label>
          </div>
          <div class='form-floating mb-3'>
            <textarea
              type='text'
              class='form-control'
              id='textArea'
              value={movieDescription}
              onChange={handleInputChangeDesc}
              rows='5'
            />
            <label for='textArea'>Enter Movie Description</label>
          </div>
        </div>
        <div class='form-group form-floating mb-3 container'>
          <select
            class='form-select'
            id='genreSelect'
            value={movieGenre}
            onChange={(e) => {
              const selectedGenre = e.target.value;
              console.log('Selected Genre from user:', selectedGenre);
              setMovieGenre(selectedGenre);
            }}
          >
            <option value=''> Select Genre </option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <label for='genreSelect'>Select Genre</label>
        </div>
      </form>
      <hr />
      <Button onClick={() => history.push(`/`)}>GO BACK</Button>
      <Button
        onClick={() => {
          postMovie();
        }}
      >
        ADD MOVIE
      </Button>
    </>
  );
}
