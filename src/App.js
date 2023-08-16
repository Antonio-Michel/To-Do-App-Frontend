import "./App.css";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";

import TodosList from "./components/TodosList.jsx";
import AddTodo from "./components/AddTodo.jsx";
import Filters from "./components/Filters.jsx";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

function App() {
  const [state, setState] = useState({
    show: false,
    filterQuery: "&name=&priority=-1&done=-1",
    page: 1,
  });

  function showModal(e) {
    setState({
      ...state,
      show: !state.show,
    });
  }

  function handleSubmit() {
    showModal();
  }
  useEffect(() => {}, [state]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>To Do List</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <Filters state={state} setState={setState} />

            <Modal show={state.show} onHide={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Create a new task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddTodo
                  data={state}
                  handleSubmit={handleSubmit}
                  setState={setState}
                />
              </Modal.Body>
            </Modal>

            <Button
              variant="success"
              onClick={(e) => {
                showModal();
              }}
            >
              + New To Do
            </Button>

            <TodosList data={state} setState={setState} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
