import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Metrics({avgTimes}) {
  function secsToHrMinSec(num) {
    if (typeof num == NaN) return "00";
    let hrs = Math.floor(num / 60 / 60);
    let mins = Math.floor(num / 60) % 60;
    let secs = Math.floor((num % 60) % 60);

    let time =
      "" +
      (hrs < 10 ? "0" + hrs : hrs == 0 ? "00" : hrs) +
      ":" +
      (mins < 10 ? "0" + mins : mins == 0 ? "00" : mins) +
      ":" +
      (secs < 10 ? "0" + secs : secs == 0 ? "00" : secs);
    return time;
  }

  return (
    <div className="metrics">
      <Container>
        <Row>
          <Col>
            <h4>Average time to finish tasks:</h4>
            <br />
            <h6>(Hrs : Min : Sec)</h6>
            <h5>
              &nbsp; &nbsp; &nbsp;{" "}
              {avgTimes ? secsToHrMinSec(avgTimes?.[3]) : "00:00:00"}
            </h5>
          </Col>
          <Col>
            <h4>Average time to finish tasks by priority:</h4>
            <br />
            <h6>&nbsp; &nbsp; (Hrs : Min : Sec)</h6>
            <h5>
              Low: {avgTimes ? secsToHrMinSec(avgTimes?.[0]) : "00:00:00"}
            </h5>
            <h5>
              Medium: {avgTimes ? secsToHrMinSec(avgTimes?.[1]) : "00:00:00"}
            </h5>
            <h5>
              High: {avgTimes ? secsToHrMinSec(avgTimes?.[2]) : "00:00:00"}
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Metrics;
