import { FC } from "react";
import { Button } from "react-bootstrap";

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
      <td>{url}</td>
      <td>
        <Button variant="warning" className="mx-4">
          Редактировать
        </Button>
        <Button variant="danger">Удалить</Button>
      </td>
    </tr>
  );
};
