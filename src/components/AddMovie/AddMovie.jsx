import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function AddMovie() {
  const genres = useSelector((store) => store.genres); // populates the dropdown with genres from db using reducer
  const history = useHistory();
  const dispatch = useDispatch();

  const [movieTitle, setMovieTitle] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieGenre, setMovieGenre] = useState(''); // local state used for form submission
  const [showAlert, setShowAlert] = useState(false); //false to start then alert appears if form values are empty

  //   console.log("what is a genre?", genres);

  const handleInputChangeTitle = (e) => {
    setMovieTitle(e.target.value);
  };

  const handleInputChangePoster = (e) => {
    setMoviePoster(e.target.value);
  };

  const handleInputChangeDesc = (e) => {
    setMovieDescription(e.target.value);
  }; // each of these is setting the local state for the inputs
  // genres doesn't have one because dropdown

  const movieData = {
    title: movieTitle,
    poster: moviePoster,
    description: movieDescription,
    genre_id: movieGenre,
  }; // an object to post to the db using the keys needed for db and grabbing values from local state

  function postMovie() {
    console.log('checking payload of submit', movieData); // used to check if values and keys are populated and correct

    if (!movieTitle || !moviePoster || !movieDescription || !movieGenre) {
      setShowAlert(true);
      return;
    } // empty input on form alerts user

    dispatch({
      type: 'POST_MOVIE', // tell the rootsaga we got a payload coming in
      payload: movieData, // object of form data that eventually talks to axios post to db
    });
    setMovieTitle('');
    setMoviePoster('');
    setMovieDescription('');
    setMovieGenre(''); // resets form inputs
    history.push(`/`); // takes user back to home with successful submission
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []); // called when page loads to populate dropdown with genres to assign

  return (
    <>
      {/* THIS IS HIDDEN UNTIL USER TRIGGERS A BAD SUBMIT OF FORM */}
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
        {/* above is 3 inputs of text for the db, uses local state to keep record and bootstrap to style */}
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
            {/* onChange assigns the selected value to local state */}
            <option value=''> Select Genre </option>
            {/* make shift placeholder above */}
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          {/* map thrue the genres in select of dropdown */}
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
