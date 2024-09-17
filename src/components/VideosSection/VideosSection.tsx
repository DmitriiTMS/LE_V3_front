import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook-redux";
import { getAllVideos } from "../../store/feature/videosSlice";

import { Video } from "../Video";

import { Accordion } from "react-bootstrap";

export const VideosSection = () => {
  const dispatch = useAppDispatch();
  const { videos, isLoading, isError } = useAppSelector(
    (state) => state.videos
  );

  useEffect(() => {
    dispatch(getAllVideos());
  }, []);

  if (isError) return <div>Упс!!! Что-то пошло не так!!!</div>;
  if (isLoading) return <div>...Loading</div>;

  return (
    <div>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        {videos && videos.length > 0 ? (
          videos.map((video, index) => {
            return (
              <Video
                key={video.id}
                eventKey={String(index)}
                title={video.title}
                description={video.description}
                url={video.url}
              />
            );
          })
        ) : (
          <p>Видео не загружено</p>
        )}
      </Accordion>
    </div>
  );
};
