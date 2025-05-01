import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import Header from "../Components/Header";
import { useNavigate } from "react-router";
import SearchBar from "../Components/SearchBar";
import { Pagination, Spin } from "antd";

interface movieType {
  title: string;
  id: string;
}
const type = [
  { title: "Movie", id: "movie" },
  { title: "Series", id: "series" },
  { title: "Episode", id: "episode" },
];

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<any>([]);
  const [favorites, setFavorites] = useState<any>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<string>("");

  const getMovies = () => {
    const apiUrl = "https://www.omdbapi.com/";
    const params = new URLSearchParams({
      s: searchInput,
      apikey: "d14f494",
      type: selectedType,
      page: page,
    });
    fetch(`${apiUrl}?${params.toString()}&`)
      .then((res) => res.json())
      .then((data) => {
        console.log("response", data);
        if (data.Response === "True") {
          setMovies(data?.Search);
          setTotalCount(parseInt(data?.totalResults));
        } else {
          setMovies([]);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedType !== "") {
      getMovies();
    }
  }, [selectedType]);

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
    if (favorites.some((fav: any) => fav?.imdbID === movie?.imdbID)) {
      updatedFavorites = favorites.filter(
        (fav: any) => fav?.imdbID !== movie?.imdbID
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

  const paginationChange = (pageNum: any, pageSize: any) => {
    setPage(`${pageNum}`);
  };

  useEffect(() => {
    if (page !== "") {
      getMovies();
    }
  }, [page]);

  return (
    <div>
      <Header
        favoritesCount={favorites.length}
        openFavorites={() => gotoFavouteMovie()}
      />
      <div className="p-6 text-center mt-17">
        <h1 className="text-3xl font-bold mb-4">Welcome to CineScope</h1>
        <div className="flex items-center justify-center mt-7 mb-5">
          <SearchBar setSearchInput={setSearchInput} getMovies={getMovies} />
          <div className="ml-5">
            <select
              className="bg-gray-600 py-[12px] px-[7px] font-[Roboto-Regular] border-none outline-none rounded-none"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {type.map((item: movieType) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading === false ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {movies?.map((movie: any) => (
              <MovieCard
                key={movie?.imdbID}
                movie={movie}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites?.some(
                  (fav: any) => fav?.imdbID === movie?.imdbID
                )}
              />
            ))}
          </div>
        ) : (
          <div className="text-center pt-[25vh] text-white font-[Roboto-Medium]">
            <Spin size="large" />
          </div>
        )}
        {totalCount > 10 && (
          <div className="flex justify-end mt-6">
            <Pagination
              onChange={paginationChange}
              total={totalCount}
              pageSize={10}
              showSizeChanger={false}
              showQuickJumper={false}
              showTotal={() => null}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
