import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function MovieDetails() {
  const movies = useSelector((store) => store.movies);
  const genres = useSelector((store) => store.genres);
  const [currentMovie, setCurrentMovie] = useState([]);
  const [currentGenres, setCurrentGenres] = useState([]);
  const history = useHistory();

  // Grab the ID to pull from the URL
  let { id } = useParams();
  // Initializes stores to access variables
  useEffect(() => {
    setCurrentMovie(movie.filter((item) => id == item.id));
    setCurrentGenres(genres.filter((item) => id == item.id));
  }, []);
  
// Displays infomration on the DOM
// Bring in Title, Genra, Poster, Description
  return (
    <>
    <h1>Movie Details</h1>
    <h4>{currentMovie[0]?.title}</h4>
    <img src={currentMovie[0]?.poster}/>
    <h4>Genres</h4>
    {currentGenres?.map((item, i) => (
      <p key={i}>{item.genre}</p>
    ))}
    <h4>Description</h4>
    <p>{currentMovie[0]?.description}</p>
    <button data-testid='toList' onClick={() => history.push('/')}>
      Return to Movies
    </button>
    </>
  );
}
