import { FC, useState } from "react";
import { Button } from "react-bootstrap";

import styles from "./TableVideoRow.module.css";
import { useDeleteVideo } from "../../query/videos/useDelete";
import { ModalUpdate } from "../ModalUpdate";

interface IVideoRow {
  id?: string;
  title: string;
  description: string;
  url: string;
  index: number;
}

export const TableVideoRow: FC<IVideoRow> = ({
  title,
  description,
  url,
  index,
  id,
}) => {
  const { mutate, isError, isPending } = useDeleteVideo();

  const deleteVideo = () => {
    if (id) {
      mutate(id);
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  {
    isPending && <div>Loading...</div>;
  }
  {
    isError && <div>Упс!!! При удалении что-то пошло не так!!!</div>;
  }

  return (
    <>
      {show && (
        <ModalUpdate
          show={show}
          handleClose={handleClose}
          title={title}
          description={description}
          url={url}
          id={id}
        />
      )}

      <tr>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{description}</td>
        <td className={styles["td-flex"]}>
          <div className={styles["img-block"]}>
            <video
              src={`http://localhost:4200/${url}`}
              controls
              autoPlay={false}
            />
          </div>
        </td>
        <td>
          <Button variant="warning" className="mx-4" onClick={handleShow}>
            Редактировать
          </Button>
          <Button variant="danger" onClick={deleteVideo}>
            Удалить
          </Button>
        </td>
      </tr>
    </>
  );
};
