import http from "../http-common";

const getAll = (page) => {
  return http.get(`/todos?page=${page}`);
};

const get = (id) => {
  return http.get(`/todos/${id}`);
};

const create = (data) => {
  return http.post("/todos", data);
};

const update = (id, data) => {
  return http.put(`/todos/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/todos/${id}`);
};

const markDone = (id) => {
  return http.put(`/todos/${id}/done`);
};

const markUndone = (id) => {
  return http.put(`/todos/${id}/undone`);
};

const findByName = (name) => {
  return http.get(`/todos?name=${name}`);
};

const TodoService = {
  getAll,
  get,
  create,
  update,
  remove,
  markDone,
  markUndone,
  findByName,
};

export default TodoService;
