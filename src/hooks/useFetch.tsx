import { useState, useEffect } from "react";

const useFetch = <T,>(
  url: string,
  options: RequestInit
): [T | null, boolean, any] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data: T = await response.json();
        setData(data);
      } catch (e) {
        setError(e as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return [data, isLoading, error];
};

export default useFetch;
