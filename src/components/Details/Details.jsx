import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function Details() {
  const details = useSelector((store) => store.details); // talks to store reducer, object and keys are used to render data
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // when page loads talk to sagas and reducers to get selected movie's details
    console.log('params.id:', params.id);
    dispatch({ type: 'FETCH_DETAILS', payload: params.id });
  }, [params.id]);

  console.log('details content', details);

  if (params.id === undefined) {
    return <h1>Loading...</h1>;
  }

  function deleteMovie() {
    //delete button triggers this and sends a DELETE request to db w/id
    dispatch({
      type: 'DELETE_MOVIE',
      payload: params.id,
    });
    history.push(`/`); // takes user back to home
  }

  return (
    <>
      <hr />
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
      <hr />
      {/* THIS IS ALL FOR SOME FANCY BUTTONS */}
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
        <button type='button' className='btn btn-secondary' onClick={() => deleteMovie()}>
          DELETE
        </button>
      </div>
    </>
  );
}
