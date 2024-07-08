import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function Details() {
  const details = useSelector((store) => store.details);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: params.id });
  }, [params.id, dispatch]);

  if (!details) {
    return <h1>Loading...</h1>;
  }

  const deleteMovie = () => {
    console.log('Deleting movie with ID:', params.id);
    dispatch({ type: 'DELETE_MOVIE', payload: params.id });
    history.push(`/`);
  };

  return (
    <>
      <br />
      <div className='container-gallery'>
        <div className='details-container'>
          <div className='image-container'>
            <img src={details.poster} alt={details.title} />
          </div>
          <div className='info-container'>
            <h2>{details.title}</h2>
            <p>{details.description}</p>
            <p>
              <strong>Genre:</strong> {details.genre}
            </p>
          </div>
        </div>
      </div>
      <br />
      <div className='btn-group' role='group' aria-label='Basic example'>
        <button type='button' className='btn btn-secondary' onClick={() => history.push(`/`)}>
          HOME
        </button>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => history.push(`/edit/${params.id}`)}
        >
          EDIT
        </button>
        <button type='button' className='btn btn-secondary' onClick={deleteMovie}>
          DELETE
        </button>
      </div>
    </>
  );
}
