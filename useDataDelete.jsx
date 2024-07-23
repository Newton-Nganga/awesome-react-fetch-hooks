/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";

export default function useDeleteData(url, options) {
  const opt = options ?  options : {}
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  

  const deleteData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        ...opt,
        method:  'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...opt?.headers,
        },
      });

      const result = await response.json();
      setResponseData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { responseData, error, isLoading, deleteData };
}
