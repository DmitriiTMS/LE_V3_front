import { useQuery } from "@tanstack/react-query";
import { getAllVideos } from "../../api/api";

export const useGetAll = () => {
  const {
    data: videos,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getAllVideos"],
    queryFn: () => getAllVideos(),
  });

  return { videos, isLoading, isError };
};
