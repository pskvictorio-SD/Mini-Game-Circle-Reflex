import { useState } from "react";

export function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const request = async (URL, method = "GET", body = null) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(URL, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message ||
            "Ocurrio un error al realizar la solicitud de datos",
        );
      }

      setData(result);
      return result;
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { request, loading, error, data };
}
