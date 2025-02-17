import Papa from "papaparse";

export const fetchCsvAsJson = async (csvPath: string,signal?:AbortSignal) => {
  const response = await fetch(csvPath,{signal});
  if (!response.ok) throw new Error("Failed to fetch csv Data");
  const csvText = await response.text();
  const result = Papa.parse<object>(csvText, {
    header: true, // first row as json keys
    skipEmptyLines: true,
  });
  return result.data;
};

export default fetchCsvAsJson;