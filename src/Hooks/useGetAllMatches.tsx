import { useQuery } from "@tanstack/react-query";
import { getAllMatches } from "../Services/getAllMatches";
import type { SportsName } from "../context/FantasyTypes";


export const useAllMatches = (sport:SportsName) => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchStatus
  } = useQuery({
    queryKey: ["all-matches"],
    queryFn: getAllMatches,
  });

  return {
    data:data?.matches[sport] ?? [],
    isLoading,
    isError,
    error,
    fetchStatus
  };
};
