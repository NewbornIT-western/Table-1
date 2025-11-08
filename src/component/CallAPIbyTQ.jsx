import { useQuery } from "@tanstack/react-query";
import { CreateQueryOption } from "../queryoption/CreateQueryOption";

const API_URL = "https://api.restful-api.dev/objects";

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
