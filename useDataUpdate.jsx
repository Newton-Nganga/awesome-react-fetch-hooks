/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";

export default function useUpdateData(url,options) {
  const opt = options ?  options : {}

  const [responseData, setresponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const updateData = async (updatedData) => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        ...opt,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...opt?.headers,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      setresponseData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { responseData, error, isLoading, updateData };
}
