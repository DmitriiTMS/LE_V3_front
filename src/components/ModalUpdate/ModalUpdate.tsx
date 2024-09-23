import { FC } from "react";
import { Modal } from "react-bootstrap";
import { FormUpdateVideo } from "../FormUpdateVideo";

interface IUpdateVideo {
  show: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  url: string
  id?: string
}

export const ModalUpdate: FC<IUpdateVideo> = ({ show, handleClose, title, description, url, id }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Обновление видео</Modal.Title>
        </Modal.Header>

        <FormUpdateVideo title={title}  description={description} url={url} id={id} handleClose={handleClose}/>
      </Modal>
    </div>
  );
};
