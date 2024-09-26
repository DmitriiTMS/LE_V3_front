import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FormCreateVideo } from "../../components/FormCreateVideo";
import { TableVideo } from "../../components/TableVideo";
import { useProfile } from "../../query/users/UseProfile";
import { useNavigate } from "react-router-dom";

export const VideoAdminPage = () => {
  const { user } = useProfile();
  const naigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      naigate("/");
      return;
    }
  }, []);

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

          <FormCreateVideo handleClose={handleClose} />
        </Modal>
      </div>

      <div>
        <TableVideo />
      </div>
    </>
  );
};
