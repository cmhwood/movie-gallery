import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import MovieListItem from '../MovieListItem/MovieListItem';
import './MovieList.css';

function MovieList() {
  const movies = useSelector((store) => store.movies);
  const history = useHistory();

  return (
    <main>
      <Button onClick={() => history.push(`/addMovie`)}>ADD NEW MOVIE</Button>
      <div className='container-gallery'>
      <br />
        <section className='movies'>
          <Row xs={1} sm={3} md={4} className='g-4'>
            {movies.map((movie) => (
              <Col key={movie.id}>
                <div className='movie-item'>
                  <h5 className='movie-title'>{movie.title}</h5>
                  <MovieListItem movie={movie} />
                </div>
              </Col>
            ))}
          </Row>
        </section>
      </div>
    </main>
  );
}

export default MovieList;
