import React from "react";
import { FaArrowUp } from "react-icons/fa";

interface tableInterface {
  headers?: Array<string>;
  reportdata?: object[];
  sortBy: string;
  setSortBy: (value: string) => void;
  sortAsc:boolean;
  setSortOrder: (value: boolean) => void;
}

const ReportTable = ({
  headers = [],
  reportdata = [],
  sortBy,
  setSortBy,
  sortAsc,
  setSortOrder,
}: tableInterface) => {
  const handleSort = (rowHeading: string) => {
    if (sortBy === rowHeading) {
      setSortOrder(!sortAsc);
    } else {
      setSortOrder(true);
    }
    setSortBy(rowHeading);
  };

  return (
    <table className="block my-4 overflow-auto text-sm whitespace-nowrap">
      <thead>
        <tr className="border-y-2 border-blue-700">
          {headers.map(
            (rowHeading, index) =>
              rowHeading !== "tags" && (
                <th key={index} className="min-w-14 px-3 py-1">
                  <span>{rowHeading}</span>{" "}
                  <FaArrowUp
                    onClick={() => handleSort(rowHeading)}
                    className={`${
                      (sortAsc && sortBy===rowHeading) ? "rotate-180 " :"rotate-0"
                    } inline w-5 h-5 py-1 rounded-full opacity-70 active:bg-zinc-300`}
                  />
                </th>
              )
          )}
        </tr>
      </thead>
      <tbody>
        {reportdata.map((rows, index) => (
          <tr key={index} className="border-b border-zinc-200">
            {Object.entries(rows).map(
              (field, index) =>
                field[0] !== "tags" && (
                  <td key={index} className="px-2 py-1 text-center opacity-80">
                    {field[1]}
                  </td>
                )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(ReportTable);
