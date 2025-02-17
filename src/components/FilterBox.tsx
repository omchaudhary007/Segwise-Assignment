import { useState } from "react";
import { CiFilter, CiSearch } from "react-icons/ci";
import { FaSortDown, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const dataCategories = {
  Creative: [
    "creative_id",
    "creative_name",
    "country",
    "ad_network",
    "os",
    "campaign",
    "ad_group",
  ],
  Performance: ["ipm", "ctr", "impressions", "clicks", "installs"],
  Metrics: ["spend", "cpm", "cost_per_click", "cost_per_install"],
};

const FilterBox = () => {
  const [filterCount, setfilterCount] = useState<number>(0);
  const [expendFilter, setfilExpend] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ category: string; value: string }[]>(
    []
  );
  const [filterCategory, setCategory] = useState<
    "Creative" | "Performance" | "Metrics"
  >("Performance");

  const handleDelete = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const addFilter = (category: string, value: string) => {
    const isDuplicate = filters.some(
      (filter) => filter.category === category && filter.value === value
    );

    if (!isDuplicate) {
      setFilters([...filters, { category, value }]);
      setfilterCount(filterCount + 1);
    }
  };

  return (
    <div className="relative w-full p-3 my-6 rounded-lg border border-zinc-200 bg-zinc-100">
      <div
        onClick={() => setfilExpend(!expendFilter)}
        className="w-fit p-1 bg-white shadow rounded-lg text-sm flex gap-1.5 cursor-pointer"
      >
        <CiFilter className="w-5 h-5 text-zinc-400" />
        <span>Filters</span>
        {filterCount !== 0 && (
          <span className="px-3 rounded-full bg-lime-200">{filterCount}</span>
        )}
        <FaSortDown className="w-4 h-4 text-zinc-400" />
      </div>

      {expendFilter && (
        <div className="absolute z-10 top-full  w-[22.5rem] p-2 bg-white text-sm shadow rounded-lg border border-zinc-200">
          <div className="mb-2 p-1 bg-white text-zinc-500 rounded-lg border border-zinc-200 flex items-center gap-2 cursor-pointer">
            <FaPlus className="w-4 h-4 p-0.5 border rounded-md" />
            <p>Add Filter</p>
          </div>
          {filters.length > 0 &&
            filters.map((filter, index) => (
              <div
                key={index}
                className="p-2 bg-white border border-zinc-200 rounded-lg"
              >
                <div className="flex items-center gap-1 opacity-60">
                  <p>{filter.category}</p>
                  <p>&gt;</p>
                  <p>{filter.value}</p>
                  <FaSortDown className="w-4 h-4" />
                  <RiDeleteBin6Line
                    onClick={() => {
                      handleDelete(index);
                      setfilterCount(filterCount - 1);
                    }}
                    className="ml-auto w-6 h-6 p-1 rounded-sm hover:border border-zinc-200 hover:shadow hover:text-red-400"
                  />
                </div>
              </div>
            ))}

          <div className="w-[20.6rem] absolute z-20 top-full left-1/2 -translate-x-1/2 bg-white shadow rounded-lg border border-zinc-200">
            <div className="p-2 flex items-center gap-2">
              <CiSearch className="text-xl text-zinc-400" />
              <input
                className="outline-none caret-lime-300"
                type="text"
                placeholder="Search"
              />
            </div>
            <div>
              <div className="h-10 border-y border-zinc-200 font-medium flex items-center gap-3">
                <p
                  onClick={() => setCategory("Creative")}
                  className={`${
                    filterCategory === "Creative"
                      ? "text-black border-b-2"
                      : "text-zinc-400"
                  } p-2 cursor-default`}
                >
                  Creative
                </p>
                <p
                  onClick={() => setCategory("Performance")}
                  className={`${
                    filterCategory === "Performance"
                      ? "text-black border-b-2"
                      : "text-zinc-400"
                  } p-2 cursor-default`}
                >
                  Performance
                </p>
                <p
                  onClick={() => setCategory("Metrics")}
                  className={`${
                    filterCategory === "Metrics"
                      ? "text-black border-b-2"
                      : "text-zinc-400"
                  } p-2 cursor-default`}
                >
                  Metrics
                </p>
              </div>
              <div className="max-h-44 p-1 overflow-auto flex flex-col gap-2">
                {dataCategories[filterCategory].map((elem, index) => (
                  <p
                    onClick={() => addFilter(filterCategory, elem)}
                    key={index}
                    className="p-2 hover:bg-zinc-200 rounded-md"
                  >
                    {elem}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBox;
