import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MoviesDetails";
import NotFound from "./Pages/NotFound";
import FavoriteMovies from "./Pages/FavoriteMovies";

const Navigate = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="bg-gray-900 text-white min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie-details" element={<MovieDetails />} />
            <Route path="/favorite-movies" element={<FavoriteMovies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Navigate;
