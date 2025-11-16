import { useQuery } from "@tanstack/react-query";
import { getAllPlayers, type PlayerRole } from "../Services/getAllPlayers";
import { useMemo } from "react";
interface Props {
  tab: PlayerRole;
}
export const useGetAllPlayers = ( {tab} : Props) => {
  const { data, isLoading, isError, error, fetchStatus } = useQuery({
    queryKey: ["all-players"],
    queryFn: getAllPlayers,
  });
  const tabData = useMemo(() => {
    return data?.filter((player) => player.role === tab) ?? [];
  }, [data, tab]);

  return {
    data,
    tabData,
    isLoading,
    isError,
    error,
    fetchStatus,
  };
};
