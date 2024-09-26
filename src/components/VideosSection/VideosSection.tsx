import { Video } from "../Video";

import { Accordion } from "react-bootstrap";
import { useGetAll } from "../../query/videos/useGetAll";
import { useProfile } from "../../query/users/useProfile";

export const VideosSection = () => {
  const { user } = useProfile();
  const { videos, isLoading, isError } = useGetAll();

  if (isError) return <div>Упс!!! Что-то пошло не так!!!</div>;
  if (isLoading) return <div>...Loading</div>;

  return user && user.isHasPremium ? (
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
                id={""}
              />
            );
          })
        ) : (
          <p>Видео не загружено</p>
        )}
      </Accordion>
    </div>
  ) : (
    <div>Дождитесь подтверждения оплаты</div>
  );
};
