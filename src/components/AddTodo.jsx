import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createTodo} from "../slices/todosSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddTodo = ({data, handleSubmit, setState}) => {
  const initialTodoState = {
    id: null,
    name: null,
    dueDate: null,
    done: false,
    doneDate: null,
    priority: 1,
    createdOn: null,
  };
  const [todo, setTodo] = useState(initialTodoState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setTodo({...todo, [name]: value});
  };

  const saveTodo = () => {
    const {name, priority, dueDate} = todo;

    dispatch(createTodo({name, priority, dueDate}))
      .unwrap()
      .then((data) => {
        setTodo({
          id: data.id,
          name: data.name,
          priority: data.priority,
          dueDate: data.dueDate,
        });
        handleSubmit();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTodo = () => {
    setTodo(initialTodoState);
  };

  const closeModal = () => {
    handleSubmit();
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
            onChange={handleInputChange}
            name="name"
            maxLength="120"
            minLength="1"
            defaultValue={""}
            placeholder="Task name"
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
            defaultValue={1}
          >
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
            value={todo.dueDate || null}
          />
        </Row>
        <br />
        <Button
          variant="primary"
          onClick={saveTodo}
          disabled={todo.name == null || todo.name == ""}
        >
          Create
        </Button>
      </div>
    </Container>
  );
};

export default AddTodo;
