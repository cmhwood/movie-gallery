import { Route, HashRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';
import EditPage from '../EditPage/EditPage';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <>
      <div className='App'>
        <h1>The Movie Gallery!</h1>

        <Router>
          <Route path='/' exact>
            <MovieList />
          </Route>
          <Route path='/addMovie'>
            <AddMovie />
          </Route>
          <Route path='/details/:id'>
            <Details />
          </Route>
          <Route path='/edit/:id'>
            <EditPage />
          </Route>
        </Router>
      </div>
    </>
  );
}

export default App;
