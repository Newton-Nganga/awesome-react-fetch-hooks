/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from "react";

export default function useDataFetch(url, options) {
  const opt = options ?  options : {}
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        ...opt,
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...opt?.headers,
        }
      });
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, options]);

  const refetch = () => {
    fetchData();
  };

  return { responseData, error, isLoading, refetch };
}
