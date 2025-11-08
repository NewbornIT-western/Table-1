import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

export const CreateQueryOption = (apiUrl) => {
  const fetchObjects = async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  };

  return queryOptions({
    queryKey: ["objects", apiUrl],
    queryFn: fetchObjects,
  });
};
