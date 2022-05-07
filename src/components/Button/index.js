import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row } from "react-bootstrap";

function ButtonControl(props) {
  const { handleStartButton, handleRandomButton, handleClearButton, running } =
    props;
  return (
    <>
      <Row>
        <Col lg={2}></Col>
        <Col lg={8}>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button
                className="fw-bold"
                onClick={handleStartButton}
                variant={running ? "outline-danger" : "outline-primary"}
              >
                {running ? "STOP" : "START"}
              </Button>
            </Col>
            <Col>
              <Button
                className="fw-bold"
                onClick={handleRandomButton}
                variant="outline-primary"
                disabled={running ? true : false}
              >
                RANDOM
              </Button>
            </Col>
            <Col className="d-flex justify-content-start">
              <Button
                className="fw-bold"
                onClick={handleClearButton}
                variant="outline-primary"
              >
                CLEAR
              </Button>
            </Col>
          </Row>
        </Col>
        <Col lg={2}></Col>
      </Row>
    </>
  );
}

export default ButtonControl;
