import { FaFilm, FaHeart } from "react-icons/fa";

const Header = ({ favoritesCount, openFavorites }:any) => {
    return (
      <header className="bg-gray-800 p-4 flex justify-between items-center text-white shadow-md fixed z-1 left-0 right-0 top-0">
        <div className="flex items-center space-x-2">
          <FaFilm className="text-2xl" />
          <span className="text-2xl font-bold">CineScope</span>
        </div>
        <div className="flex space-x-4">
          <button
            className="relative font-[Roboto-Medium] flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded hover:bg-gray-600 cursor-pointer"
            onClick={openFavorites}
          >
            <FaHeart />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      </header>
    );
  };

export default Header;
