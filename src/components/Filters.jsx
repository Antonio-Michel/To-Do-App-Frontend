import React, {useState} from "react";
import {useDispatch} from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Filters = ({state, setState}) => {
  const [filters, setFilters] = useState({
    name: "",
    priority: -1,
    done: -1,
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFilters({...filters, [name]: value});
  };

  function sendFilters() {
    let filterQuery =
      "&name=" +
      filters.name +
      "&priority=" +
      filters.priority +
      "&done=" +
      filters.done;
    setState({
      ...state,
      filterQuery: filterQuery,
      page: 1,
    });
  }

  return (
    <div className="filters">
      <h3>Filters</h3>
      <Container fluid="md">
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Name:</InputGroup.Text>
              <Form.Control
                type="text"
                name="name"
                onChange={handleInputChange}
                placeholder="Start typing..."
              />
            </InputGroup>
          </Col>
        </Row>
        <Row xs={6} md={3}>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Priority:</InputGroup.Text>
              <Form.Select
                name="priority"
                id="priority"
                onChange={handleInputChange}
              >
                <option value={-1}>All</option>
                <option value={0}>Low</option>
                <option value={1}>Medium</option>
                <option value={2}>High</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Status:</InputGroup.Text>
              <Form.Select name="done" id="done" onChange={handleInputChange}>
                <option value={-1}>All</option>
                <option value={1}>Done</option>
                <option value={0}>Not Done</option>
              </Form.Select>
            </InputGroup>
          </Col>
          <Col></Col>
          <Col lg="2">
            <Button variant="primary" onClick={sendFilters}>
              Search
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Filters;
