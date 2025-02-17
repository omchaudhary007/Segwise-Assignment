import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import fetchCsvAsJson  from "../utils/ParseCsv";

export const useFetchCsv = (csvPath: string) => {
  const [data, setData] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const response = await fetchCsvAsJson(csvPath, signal);
        setData(response);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(true);
          toast.error("Failed to load CSV Data!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort(); // prevent-memory leak
  }, [csvPath]); 

  return { data, loading, error };
};
