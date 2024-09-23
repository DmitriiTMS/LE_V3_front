import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVideo } from "../../api/api";

interface IVideo {
  id?: string;
  title: string;
  description: string;
  url: string;
}

export const useUpdateVideo = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["update-video"],
    mutationFn: (data: IVideo) => updateVideo(id,data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getAllVideos"] });
    },
  });

  return { mutate, isError, isPending, error };
};
