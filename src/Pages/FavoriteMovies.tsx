import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState<any>([]);

  useEffect(() => {
    const savedFavorites: any =
      JSON.parse(`${localStorage.getItem("favorites")}`) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (movie: any) => {
    let updatedFavorites;
    if (favorites.some((fav: any) => fav.imdbID === movie.imdbID)) {
      updatedFavorites = favorites.filter(
        (fav: any) => fav.imdbID !== movie.imdbID
      );
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="p-6 rounded-lg text-white">
      <h2 className="text-2xl font-[Roboto-Bold] mb-4">Favorite Movies</h2>
      {favorites.length === 0 ? (
        <div className="mt-[37vh]">
          <p className="text-gray-400 font-[Roboto-Bold] text-center">
            No favorite movies added.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {favorites.map((movie: any) => (
            <div key={movie.imdbID} className="text-center relative">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-32 object-cover rounded"
              />
              <p className="text-sm mt-2">{movie.Title}</p>
              <button
                className="absolute -top-2 -right-2 rounded-full text-white bg-gray-600 p-1 cursor-pointer"
                onClick={() => toggleFavorite(movie)}
              >
                <FaTimes className="text-md" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMovies;
