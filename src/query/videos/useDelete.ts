import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVideo } from "../../api/api";

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["delete-video"],
    mutationFn: (id: string) => deleteVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllVideos"] });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);
    },
  });

  return { mutate, isError, isPending, error };
};
