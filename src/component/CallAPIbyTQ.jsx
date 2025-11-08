import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CreateQueryOption } from "../queryoption/CreateQueryOption.jsx";

const API_URL = "https://api.restful-api.dev/objects";

/**
 * Provide React Query state and controls for fetching from the configured API endpoint.
 *
 * @returns {Object} An object containing the query result and helpers.
 * @property {Array} data - The fetched data array; defaults to an empty array when no data is available.
 * @property {boolean} isPending - `true` if the query is pending.
 * @property {boolean} isLoading - `true` if the query is currently loading.
 * @property {boolean} isError - `true` if the query finished with an error.
 * @property {*} error - The error returned by the query, if any.
 * @property {Function} refetch - Function to manually re-run the query.
 */
function CallAPIbyTQ() {
  const { data, isPending, isLoading, isError, error, refetch } = useQuery(
    CreateQueryOption(API_URL)
  );

  return {
    data: data || [],
    isPending,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export default CallAPIbyTQ;