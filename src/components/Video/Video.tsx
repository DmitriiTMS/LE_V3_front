import { FC } from "react";
import Accordion from "react-bootstrap/Accordion";
import { IVideo } from "../../types/videos";

export const Video: FC<IVideo> = ({ title, description, url, eventKey }) => {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        <div>{description}</div>
        <div>{url}</div>
      </Accordion.Body>
    </Accordion.Item>
  );
};
