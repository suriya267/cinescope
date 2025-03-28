import { SearchOutlined } from "@ant-design/icons";
import "./SearchBar.css";
import { useState } from "react";

export default function SearchBar({ setSearchInput }: any) {
  const [inputValue, setInputValue] = useState<string>();

  return (
    <div className="w-[42%] flex">
      <div
        style={{ backgroundColor: "#f0f5ff" }}
        className="flex item-center px-[20px] py-[10px] w-[90%]"
      >
        <div className="flex item-center justify-center mr-[10px]">
          <SearchOutlined />
        </div>
        <div className="flex item-center justify-center text-[18px] w-[100%]">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for your favorite movies"
            className="px-[7px] text-black search-field w-full font-[Roboto-Regular]"
            type="text"
          />
        </div>
      </div>
      <button
        onClick={() => setSearchInput(inputValue)}
        className="cursor-pointer bg-gray-600 font-[Roboto-Regular] pl-3 pr-3"
      >
        Search
      </button>
    </div>
  );
}
