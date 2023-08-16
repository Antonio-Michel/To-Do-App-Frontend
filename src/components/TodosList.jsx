import React, {useState, useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  retrieveTodos,
  findTodoByName,
  deleteTodo,
  markAsDone,
  markAsUndone,
  findById,
} from "../slices/todosSlice";
import Todo from "./Todo";
import Metrics from "./Metrics";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {FaSortUp, FaSortDown} from "react-icons/fa";
import {LiaSortSolid} from "react-icons/lia";

function TodosList({data, setState}) {
  const global = useSelector((state) => state.todos);

  let todos = global.results;
  let avgTimes = global.avgTimes;
  let size = global.size?.[0];
  let pages = global.size?.[1];
  console.log("size and pages", size, pages);
  /*


  -----------IMPLEMENT AVERAGE TIMES FOR METRICS COMPONENT ------------


  */

  const dispatch = useDispatch();

  const [sort, setSort] = useState({
    byDate: "",
    byPrio: "",
  });

  const initialFetch = useCallback(() => {
    dispatch(
      retrieveTodos(
        data.page +
          data.filterQuery +
          "&sortByPriority=" +
          sort.byPrio +
          "&sortByDueDate=" +
          sort.byDate
      )
    );
  });

  useEffect(() => {
    initialFetch();
  }, [data, sort]);

  function prevPage() {
    if (data.page > 1) {
      setState({
        ...data,
        page: data.page - 1,
      });
    }
  }
  function nextPage() {
    setState({
      ...data,
      page: data.page + 1,
    });
  }

  function rerender() {
    setState({
      ...data,
    });
  }

  function handlePrioSort() {
    setSort({
      ...sort,
      byPrio: sort.byPrio == "" ? "ASC" : sort.byPrio == "ASC" ? "DESC" : "",
    });
  }

  function handleDateSort() {
    setSort({
      ...sort,
      byDate: sort.byDate == "" ? "ASC" : sort.byDate == "ASC" ? "DESC" : "",
    });
  }

  return (
    <Container>
      <Row>
        <Col
          style={{display: "flex", flexDirection: "column", marginTop: "2vh"}}
        >
          <Col md="auto" style={{flex: "1"}}>
            <Table responsive bordered hover aligned="middle">
              <thead>
                <tr>
                  <th scope="col" style={{textAlign: "center"}}>
                    Done
                  </th>
                  <th scope="col" style={{textAlign: "center"}}>
                    Task
                  </th>
                  <th
                    onClick={handlePrioSort}
                    scope="col"
                    style={{textAlign: "center", cursor: "pointer"}}
                    className="sort"
                  >
                    Priority
                    {sort.byPrio === "" ? (
                      <LiaSortSolid />
                    ) : sort.byPrio === "ASC" ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )}
                  </th>
                  <th
                    onClick={handleDateSort}
                    scope="col"
                    style={{textAlign: "center", cursor: "pointer"}}
                    className="sort"
                  >
                    Due Date
                    {sort.byDate === "" ? (
                      <LiaSortSolid />
                    ) : sort.byDate === "ASC" ? (
                      <FaSortUp />
                    ) : (
                      <FaSortDown />
                    )}
                  </th>
                  <th scope="col" style={{textAlign: "center"}}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {todos?.length
                  ? todos.map((todo) => {
                      return (
                        <Todo key={todo.id} data={todo} rerender={rerender} />
                      );
                    })
                  : null}
              </tbody>
            </Table>
          </Col>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Pagination>
                <Pagination.Item hidden={data.page === 1} onClick={prevPage}>
                  &lt;
                </Pagination.Item>
                <Pagination.Item active={true}>{data?.page}</Pagination.Item>
                <Pagination.Item hidden={data.page == pages} onClick={nextPage}>
                  &gt;
                </Pagination.Item>
              </Pagination>
            </Col>
          </Row>

          <div>
            <Metrics avgTimes={avgTimes} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default TodosList;
