import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import Header from "../Components/Header";
import { useNavigate } from "react-router";
import SearchBar from "../Components/SearchBar";
import { Spin } from "antd";

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  const getMovies = () => {
    const apiUrl = "http://www.omdbapi.com/";
    const params = new URLSearchParams({
      s: searchInput,
      apikey: "d14f494",
    });
    fetch(`${apiUrl}?${params.toString()}&`)
      .then((res) => res.json())
      .then((data) => {
        console.log("response", data);
        if (data.Response === "True") {
          setMovies(data?.Search);
        } else {
          setMovies([]);
        }
        setLoading(false);
      })
  };

  useEffect(() => {
    if (searchInput != "") {
      setLoading(true);
      getMovies();
    }
  }, [searchInput]);

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

  const gotoFavouteMovie = () => {
    navigate("favorite-movies");
  };

  return (
    <div>
      <Header
        favoritesCount={favorites.length}
        openFavorites={() => gotoFavouteMovie()}
      />
      <div className="p-6 text-center mt-17">
        <h1 className="text-3xl font-bold mb-4">Welcome to CineScope</h1>
        <div className="flex items-center justify-center mt-7 mb-5">
          <SearchBar setSearchInput={setSearchInput} />
        </div>
        {loading === false ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie: any) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.some(
                  (fav: any) => fav.imdbID === movie.imdbID
                )}
              />
            ))}
          </div>
        ) : (
          <div className="text-center pt-[25vh] text-white font-[Roboto-Medium]">
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
