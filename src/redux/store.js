import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_DETAILS', fetchDetails);
  yield takeEvery('POST_MOVIE', postMovie);
  yield takeEvery('FETCH_GENRES', fetchGenresSaga);
  yield takeEvery('EDIT_MOVIE', editMovieSaga);
  yield takeEvery('DELETE_MOVIE', deleteMovie);
}

function* fetchAllMovies() {
  try {
    const moviesResponse = yield call(axios.get, '/api/movies');
    yield put({ type: 'SET_MOVIES', payload: moviesResponse.data });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

function* fetchGenresSaga() {
  try {
    const genresResponse = yield call(axios.get, '/api/genres');
    yield put({ type: 'SET_GENRES', payload: genresResponse.data });
  } catch (error) {
    console.log('fetchGenresSaga error:', error);
  }
}

function* fetchDetails(action) {
  try {
    const detailsResponse = yield call(axios.get, `/api/movies/${action.payload}`);
    yield put({ type: 'SET_DETAILS', payload: detailsResponse.data[0] });
  } catch (error) {
    console.log('fetchDetails error:', error);
  }
}

function* postMovie(action) {
  try {
    yield call(axios.post, '/api/movies', action.payload);
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.error('postMovie error:', error);
  }
}

function* editMovieSaga(action) {
  try {
    const { id, ...movieData } = action.payload;
    console.log('editMovieSaga action.payload:', action.payload);
    const response = yield call(axios.put, `/api/movies/${id}`, movieData);
    console.log('editMovieSaga response:', response);
    yield put({ type: 'FETCH_MOVIES' });
    yield put({ type: 'FETCH_DETAILS', payload: id });
  } catch (error) {
    console.error('editMovie error:', error);
  }
}

function* deleteMovie(action) {
  try {
    console.log('Deleting movie with ID:', action.payload);
    yield call(axios.delete, `/api/movies/${action.payload}`);
    console.log('Delete request successful');
    yield put({ type: 'FETCH_MOVIES' });
  } catch (error) {
    console.log('Error with deleteMovie saga:', error);
  }
}

const sagaMiddleware = createSagaMiddleware();

const details = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

const storeInstance = createStore(
  combineReducers({ movies, genres, details }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default storeInstance;
