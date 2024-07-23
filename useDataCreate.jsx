/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";

export default function useCreateData(url, options) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const createData = async (newData) => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: JSON.stringify(newData),
      });

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, isLoading, createData };
}
