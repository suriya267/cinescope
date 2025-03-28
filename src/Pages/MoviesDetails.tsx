import { Spin } from "antd";
import { useEffect, useState } from "react";
import {
  FaAward,
  FaClock,
  FaFilm,
  FaGlobe,
  FaMoneyBillWave,
  FaStar,
} from "react-icons/fa";
import { useLocation } from "react-router";

const MovieDetails = () => {
  const id = useLocation().state;
  const [movie, setMovie] = useState<any>(null);

  const getMovies = () => {
    const apiUrl = "http://www.omdbapi.com/";
    const params = new URLSearchParams({
      i: id,
      apikey: "d14f494",
    });
    fetch(`${apiUrl}?${params.toString()}&`)
      .then((res) => res.json())
      .then((data) => {
        console.log("response", data);
        setMovie(data);
      })
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (!movie) {
    return (
      <div className="text-center pt-[45vh] text-white font-[Roboto-Medium]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 pt-10">
      <div className="p-6 text-white max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img
            src={movie?.Poster}
            alt={movie?.Title}
            className="w-full h-auto rounded-lg shadow-md"
          />
          <div className="col-span-2">
            <h1 className="text-4xl font-bold mb-2 font-[Roboto-Bold]">
              {movie?.Title} ({movie?.Year})
            </h1>
            <p className="text-gray-300 font-[Roboto-Medium] mb-4">
              {movie?.Plot}
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-gray-400">
              <p className="font-[Roboto-Regular]">
                <FaFilm className="inline text-yellow-500 mr-2" />
                {movie?.Genre}
              </p>
              <p className="font-[Roboto-Regular]">
                <FaClock className="inline text-blue-400 mr-2" />
                {movie?.Runtime}
              </p>
              <p className="font-[Roboto-Regular]">
                <FaGlobe className="inline text-green-400 mr-2" />
                {movie?.Language}
              </p>
              <p className="font-[Roboto-Regular]">
                <FaAward className="inline text-red-400 mr-2" />
                {movie?.Awards}
              </p>
              <p className="font-[Roboto-Regular]">
                <FaMoneyBillWave className="inline text-green-500 mr-2" />
                {movie?.BoxOffice}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2 font-[Roboto-Bold] ">
                Ratings:
              </h3>
              <div className="flex flex-wrap gap-3">
                {movie?.Ratings.map((rating: any, index: any) => (
                  <p
                    key={index}
                    className="bg-gray-700 px-3 py-1 rounded-lg shadow-md font-[Roboto-Regular]"
                  >
                    <FaStar className="inline text-yellow-400 mr-2" />
                    {rating.Source}: {rating.Value}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-4 font-[Roboto-Regular]">
              <p>
                <strong className="font-[Roboto-Bold]">Director:</strong>{" "}
                {movie?.Director}
              </p>
              <p>
                <strong className="font-[Roboto-Bold]">Writer:</strong>{" "}
                {movie?.Writer}
              </p>
              <p>
                <strong className="font-[Roboto-Bold]">Actors:</strong>{" "}
                {movie?.Actors}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
