import { TableVideoRow } from "../TableVideoRow";
import { Table } from "react-bootstrap";
import { useGetAll } from "../../query/videos/useGetAll";

export const TableVideo = () => {
  const { videos, isLoading, isError } = useGetAll();

  if (isError) return <div>Упс!!! Что-то пошло не так!!!</div>;
  if (isLoading) return <div>...Loading</div>;

  return (
    <>
      {videos && videos.length > 0 ? (
        <Table bordered hover>
          <thead>
            <tr>
              <th>№</th>
              <th>Заголовок</th>
              <th>Описание</th>
              <th>Видео</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => {
              return <TableVideoRow {...video} key={index} index={index} />;
            })}
          </tbody>
        </Table>
      ) : (
        <p>Видео не создано</p>
      )}
    </>
  );
};
