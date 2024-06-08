import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import './App.css';
// import Details from '../MovieDetails/MovieDetails';
import Header from '../Header/Header';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Route path='/' exact>
          <MovieList />
        </Route>

        {/* Details page */}

        {/* Add Movie page */}
      </div>
    </Router>
  );
}

export default App;
