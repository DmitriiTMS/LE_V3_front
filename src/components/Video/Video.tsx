import { FC } from "react";
import Accordion from "react-bootstrap/Accordion";
import { IVideo } from "../../types/videos";

import styles from "./Video.module.css";

export const Video: FC<IVideo> = ({ title, description, url, eventKey }) => {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        <div>{description}</div>
        <div className={styles["img-block"]}>
          <video
            src={`http://localhost:4200/${url}`}
            controls
            autoPlay={false}
            controlsList="nodownload"
          />
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};
