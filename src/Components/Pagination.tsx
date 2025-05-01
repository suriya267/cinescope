import React,{useState} from "react";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const total = Math.ceil(totalItems / itemsPerPage);
  const [showPages, setShowPages] = useState<number>(10);

  const handleClick = (page: any) => {
    setShowPages(page + 8);
    setCurrentPage(page);
    onPageChange(page);
  };

  const nextPrev = (page: any, nextPrev: string) => {
    if (nextPrev === "next") {
      setShowPages(page + 8);
      setCurrentPage(page);
      onPageChange(page);
    } else {
      if (currentPage - 8 >= 1) {
        setShowPages(page - 8);
        setCurrentPage(page);
        onPageChange(page);
      } else {
        setShowPages(8);
        setCurrentPage(page);
        onPageChange(page);
      }
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= showPages; i++) {
      if (showPages-8<=i) {
        pages.push(
          <div className="w-[90%]" key={i}>
            <button
              onClick={() => handleClick(i)}
              className={`h-8 w-8 mx-1 border rounded-[50%] font-[Roboto-Regular]  ${
                currentPage === i
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black cursor-pointer"
              }`}
            >
              {i}
            </button>
          </div>
        );
      }
    }
    return (
      <div className="flex">
        {pages}
        <span className="mt-1 ml-2 flex">{". . ."}</span>
      </div>
    );
  };

  return (
    <div className="flex justify-center mt-4 w-[100%]">
      <button
        onClick={() => nextPrev(currentPage, "prev")}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 cursor-pointer w-[5%]"
      >
        Prev
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => nextPrev(currentPage, "next")}
        disabled={currentPage === total}
        className="mx-1 px-3 py-1 cursor-pointer w-[5%]"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
