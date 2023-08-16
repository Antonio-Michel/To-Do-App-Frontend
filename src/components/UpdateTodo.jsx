import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {updateTodo} from "../slices/todosSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UpdateTodo = ({data, handleSubmit, rerender}) => {
  const initialTodoState = {
    id: data.id,
    name: data.name,
    dueDate: data.dueDate,
    priority: data.priority,
  };
  const [todo, setTodo] = useState(initialTodoState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setTodo({...todo, [name]: value});
  };

  const saveTodo = () => {
    const {id, name, priority, dueDate} = todo;

    dispatch(updateTodo({id: id, data: {name, priority, dueDate}}))
      .unwrap()
      .then((data) => {
        setTodo({
          id: data.id,
          name: data.name,
          priority: data.priority,
          dueDate: data.dueDate,
        });
        handleSubmit();
        rerender();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTodo = () => {
    setTodo(initialTodoState);
  };

  return (
    <Container
      className="submit-form"
      style={{paddingInline: "30px", paddingBottom: "30px"}}
    >
      <div>
        <Row className="form-group">
          <label htmlFor="name">ToDo</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={todo.name || ""}
            onChange={handleInputChange}
            name="name"
            maxLength="120"
          />
        </Row>
        <br />
        <Row className="form-group">
          <label htmlFor="priority">Priority</label>
          <Form.Select
            name="priority"
            id="prio-select"
            required
            onChange={handleInputChange}
            value={todo.priority || 0}
          >
            <option value={null} disabled hidden>
              Select a priority
            </option>
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </Form.Select>
        </Row>
        <br />
        <Row className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <Form.Control
            type="date"
            id="start"
            name="dueDate"
            min={new Date().toJSON().slice(0, 10)}
            onChange={handleInputChange}
            value={todo.dueDate?.slice(0, 10) || null}
          />
        </Row>
        <br />
        <Button
          variant="primary"
          onClick={saveTodo}
          disabled={todo.name == null || todo.name == ""}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
};

export default UpdateTodo;
