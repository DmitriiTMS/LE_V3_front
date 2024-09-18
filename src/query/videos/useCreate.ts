import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVideo } from "../../api/api";
import { useState } from "react";

interface IVideo {
  id?: string;
  title: string;
  description: string;
  url: string;
}

export const useCreateVideo = () => {
  const [errorStatusCode, setErrorStatusCode] = useState<any>(null);

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["create-video"],
    mutationFn: (data: IVideo) => createVideo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllVideos"] });
    },
    onError: (error: any) => {
      console.log(error.response.data.message);

      setErrorStatusCode(error.status);
    },
  });

  return { mutate, isError, isPending, error, errorStatusCode };
};
