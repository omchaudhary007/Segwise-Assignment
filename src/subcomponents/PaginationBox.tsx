import { useMemo } from "react";

interface pagingInterface {
  currentPage: number;
  setPage: (value: number) => void;
  limit: number;
  maxLength: number;
}

const PaginationBox = ({
  currentPage,
  setPage,
  limit,
  maxLength,
}: pagingInterface) => {
  const pageArray = useMemo(() => {
    let Arr = [];
    for (let i = 0; i < maxLength; i++) {
      Arr.push(i + 1);
    }
    return Arr;
  }, [currentPage, limit, maxLength]);
  
  return (
    <div className="w-fit ml-auto text-sm opacity-80 flex gap-1">
      <button
        disabled={currentPage === 1}
        onClick={() => setPage(Math.max(currentPage - 1, 1))}
        className={`px-3 py-1 shadow rounded-lg border border-zinc-300 
      ${
        currentPage === 1
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-zinc-200"
      }`}
      >
        &lt;
      </button>
      {pageArray.map((elem) => (
        <button
          key={elem}
          onClick={() => setPage(elem)}
          className={`px-3 py-1 rounded-lg shadow border border-zinc-300 
        ${
          currentPage === elem ? "bg-blue-500 text-white" : "hover:bg-zinc-200"
        }`}
        >
          {elem}
        </button>
      ))}

      <button
        disabled={currentPage >= maxLength}
        onClick={() => setPage(currentPage + 1)}
        className={`px-3 py-1 shadow rounded-lg border border-zinc-300 
      ${
        currentPage >= maxLength
          ? "opacity-30 cursor-not-allowed"
          : "hover:bg-zinc-200"
      }`}
      >
        &gt;
      </button>
    </div>
  );
};

export default PaginationBox;
