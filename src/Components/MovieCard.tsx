import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router";

const MovieCard = ({ movie, toggleFavorite, isFavorite }: any) => {
    const navigate=useNavigate()
  return (
    <div
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden p-4 text-center relative cursor-pointer"
      onClick={() => navigate("/movie-details",{state:movie?.imdbID})}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2 font-[Roboto-Bold]">
        {movie.Title}
      </h3>
      <p className="text-gray-400 font-[Roboto-Regular]">{movie.Year}</p>
      <button
        className={`absolute top-2 right-2 p-2 rounded-full ${
          isFavorite ? "text-red-500" : "text-gray-400"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(movie);
        }}
      >
        <FaHeart className="text-xl" />
      </button>
    </div>
  );
};

export default MovieCard;
