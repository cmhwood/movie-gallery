import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function EditPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [movieDescription, setMovieDescription] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const details = useSelector((store) => store.details);

  const handleInputChangeTitle = (e) => {
    setMovieTitle(e.target.value);
  };

  const handleInputChangeDesc = (e) => {
    setMovieDescription(e.target.value);
  };

  useEffect(() => {
    setMovieTitle(details.title);
    setMovieDescription(details.description);
  }, [details]);

  const postMovieEdit = () => {
    const changedMovieData = {
      title: movieTitle,
      description: movieDescription,
      id: params.id,
    };
    console.log('checking payload of submit', changedMovieData);

    if (!movieTitle || !movieDescription) {
      setShowAlert(true);
      return;
    }

    dispatch({
      type: 'EDIT_MOVIE',
      payload: changedMovieData,
    });

    setTimeout(() => {
      history.push(`/details/${params.id}`);
    }, 500);
  };

  return (
    <>
      {showAlert && (
        <div className='alert alert-dismissible alert-danger'>
          <button type='button' className='btn-close' onClick={() => setShowAlert(false)}></button>
          <strong>Oh oh!</strong> Try again.
        </div>
      )}
      <form>
        <div className='form-group container'>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='floatingInput'
              value={movieTitle}
              onChange={handleInputChangeTitle}
            />
            <label htmlFor='floatingInput'>Enter Movie Title Here</label>
          </div>
          <div className='form-floating mb-3'>
            <textarea
              type='text'
              className='form-control'
              id='textArea'
              value={movieDescription}
              onChange={handleInputChangeDesc}
              rows='5'
            />
            <label htmlFor='textArea'>Enter Movie Description</label>
          </div>
        </div>
      </form>
      <div className='btn-group' role='group' aria-label='Basic example'>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => history.push(`/details/${params.id}`)}
        >
          CANCEL
        </button>
        <button type='button' className='btn btn-secondary' onClick={postMovieEdit}>
          SAVE
        </button>
      </div>
    </>
  );
}
