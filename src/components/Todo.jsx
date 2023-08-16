import React, {useEffect, useState, useCallback} from "react";
import {useDispatch} from "react-redux";
import {
  retrieveTodos,
  findTodoByName,
  deleteTodo,
  markAsDone,
  markAsUndone,
  findById,
} from "../slices/todosSlice";
import {findByDisplayValue} from "@testing-library/react";
import {useNavigate} from "react-router-dom";
import UpdateTodo from "./UpdateTodo";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

function Todo({data, rerender}) {
  const [todo, setTodo] = useState(data);
  const dispatch = useDispatch();
  console.log(todo);

  function updateDone() {
    if (todo.done) {
      dispatch(markAsUndone(todo.id))
        .unwrap()
        .then((data) => {
          setTodo({...todo, done: data.done});
          rerender();
        });
    } else {
      dispatch(markAsDone(todo.id))
        .unwrap()
        .then((data) => {
          setTodo({...todo, done: data.done});
          rerender();
        });
    }
  }
  const [state, setState] = useState({show: false});

  useEffect(() => {
    setTodo(data);
  }, [setTodo, state]);

  const removeTodo = () => {
    dispatch(deleteTodo(todo.id))
      .unwrap()
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
    rerender();
  };

  function showModal(e) {
    setState({
      show: !state.show,
    });
  }

  function handleSubmit() {
    showModal();
  }
  useEffect(() => {}, [state]);

  return (
    <>
      {todo ? (
        <tr
          className={
            todo.done
              ? ""
              : todo.urgency === 0
              ? ""
              : todo.urgency === 1
              ? "table-danger"
              : todo.urgency === 2
              ? "table-warning"
              : "table-success"
          }
        >
          <td scope="row" style={{textAlign: "center"}}>
            <Form.Check
              id="done"
              name="done"
              checked={todo.done}
              onChange={updateDone}
            />
          </td>
          <td className={todo.done ? "done" : ""}>{todo.name}</td>
          <td style={{textAlign: "center"}} className={todo.done ? "done" : ""}>
            {todo.priority == 0
              ? "Low"
              : todo.priority == 1
              ? "Medium"
              : "High"}
          </td>
          <td style={{textAlign: "center"}} className={todo.done ? "done" : ""}>
            {todo.dueDate ? todo.dueDate.slice(0, 10) : "-"}
          </td>
          <td style={{textAlign: "center"}}>
            <Button
              style={{alignContent: "center"}}
              size="sm"
              variant="primary"
              onClick={(e) => {
                showModal();
              }}
            >
              Edit
            </Button>{" "}
            <Modal show={state.show} onHide={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Edit this task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UpdateTodo
                  show={state.show}
                  data={todo}
                  handleSubmit={handleSubmit}
                  setState={setState}
                  rerender={rerender}
                />
              </Modal.Body>
            </Modal>
            &nbsp;
            <Button size="sm" variant="danger" onClick={removeTodo}>
              Delete
            </Button>
          </td>
        </tr>
      ) : (
        <div>"missing data"</div>
      )}
    </>
  );
}

export default Todo;
