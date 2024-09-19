import { FC } from "react";
import { Button } from "react-bootstrap";

import styles from './TableVideoRow.module.css';

interface IVideoRow {
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
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td className={styles['td-flex']}>
        <div className={styles["img-block"]}>
          <video
            src={`http://localhost:4200/${url}`}
            controls
            autoPlay={false}
          />
        </div>
      </td>
      <td>
        <Button variant="warning" className="mx-4">
          Редактировать
        </Button>
        <Button variant="danger">Удалить</Button>
      </td>
    </tr>
  );
};
