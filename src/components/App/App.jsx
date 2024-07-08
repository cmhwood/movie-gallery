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
  }, []); // talks to the store to make a GET request to the db to get the movies from their table

  return (
    <>
      <div className='App'>
        {/* <hr /> */}
        <h1>The Movie Gallery!</h1>
        {/* <hr /> */}
        {/* // header that lives on every page */}
        <Router>
          <Route path='/' exact>
            <MovieList />
            {/* the home page, displays a gallery grid of movies */}
          </Route>
          <Route path='/addMovie'>
            <AddMovie />
            {/* takes user to form to submit their own movie to the database */}
          </Route>
          <Route path='/details/:id'>
            <Details />
            {/* poster click takes user to a details page w/edit & delete btn */}
          </Route>
          <Route path='/edit/:id'>
            <EditPage />
            {/* User is taken to a form to adjust title and description of selected movie */}
          </Route>
        </Router>
      </div>
    </>
  );
}

export default App;
