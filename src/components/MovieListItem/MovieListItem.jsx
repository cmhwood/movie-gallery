import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function MovieListItem({ movie }) {
  const history = useHistory();
  return (
    <div onClick={() => history.push(`/details/${movie.id}`)} className="movie-poster">
      <img src={movie.poster} alt={movie.title} className="hover-poster" />
    </div>
  );
}
