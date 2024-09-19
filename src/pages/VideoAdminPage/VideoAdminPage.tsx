import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FormCreateVideo } from "../../components/FormCreateVideo";
import { TableVideo } from "../../components/TableVideo";

export const VideoAdminPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h1>Видео админа</h1>

      <div className="mb-4">
        <Button variant="success" onClick={handleShow}>
          Создать видео
        </Button>
      </div>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Создание видео</Modal.Title>
          </Modal.Header>

          <FormCreateVideo handleClose={handleClose}/>
        </Modal>
      </div>

      <div>
        <TableVideo />
      </div>
    </>
  );
};
