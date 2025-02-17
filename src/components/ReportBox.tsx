import { useFetchCsv } from "../hooks/useFetchCsv";
import ReportTable from "../subcomponents/ReportTable";
import { useMemo, useState } from "react";
import PaginationBox from "../subcomponents/PaginationBox";
import FilterBox from "./FilterBox";

const ReportBox = () => {
  const { data: reportdata, loading } = useFetchCsv("db/Report.csv");
  const [currentPage, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortAsc, setSortOrder] = useState<boolean>(true);
  const tableHeading = !reportdata[0] ? [] : Object.keys(reportdata[0]);

  // sorting feature
  const sortedData = useMemo(() => {
    if (!sortBy || !reportdata) return reportdata;

    return [...reportdata].sort((first, second) => {
      const value1 = first[sortBy as keyof typeof first];
      const value2 = second[sortBy as keyof typeof second];

      return sortAsc ? (value1 > value2 ? 1 : -1) : value1 < value2 ? 1 : -1;
    });
  }, [reportdata, sortBy, sortAsc]);

  // pagination-feature
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    return sortedData.slice(start, end);
  }, [sortedData, limit, currentPage]);

  return (
    <div className="w-[97vw] m-auto my-10 p-4 bg-zinc-50">
      <h3 className="text-xl">Report Data</h3>

      <FilterBox />
      <div className="flex items-center justify-end gap-2">
        <p className="text-sm opacity-70">Rows Per Page:</p>
        <select
          onChange={(e) => setLimit(Number(e.target.value))}
          className="outline-blue-800 border rounded-md text-blue-500"
          name="limit"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {loading ? (
        <img className="h-44 m-auto" src="/loading.gif" alt="loading..." />
      ) : reportdata.length === 0 ? (
        <p className="mt-10 text-lg font-medium text-center text-red-500">
          Data Not Available!
        </p>
      ) : (
        <>
          <ReportTable
            headers={tableHeading}
            reportdata={paginatedData}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortAsc={sortAsc}
            setSortOrder={setSortOrder}
          />
          <PaginationBox
            currentPage={currentPage}
            setPage={setPage}
            limit={limit}
            maxLength={Math.ceil(reportdata.length / limit)}
          />
        </>
      )}
    </div>
  );
};

export default ReportBox;
