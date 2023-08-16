import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import TodoDataService from "../services/TodoService";

/*const mockTodos = [
  {
    id: "1",
    name: "comer",
    dueDate: "2023-10-08T00:00:00.000+00:00",
    done: true,
    doneDate: "2023-09-09T18:24:53.077+00:00",
    priority: 1,
    createdOn: "2023-08-09T18:24:53.077+00:00",
  },
  {
    id: "2",
    name: "cenar",
    dueDate: "2023-10-08T00:00:00.000+00:00",
    done: false,
    doneDate: null,
    priority: 1,
    createdOn: "2023-08-09T18:24:53.077+00:00",
  },
  {
    id: "3",
    name: "dormir",
    dueDate: "2023-10-09T00:00:00.000+00:00",
    done: false,
    doneDate: null,
    priority: 2,
    createdOn: "2023-08-09T18:24:53.077+00:00",
  },
];*/

const initialState = {};

export const createTodo = createAsyncThunk(
  "todos/create",
  async ({name, priority, dueDate}) => {
    const res = await TodoDataService.create({name, priority, dueDate});
    return res.data;
  }
);

export const retrieveTodos = createAsyncThunk(
  "todos/retrieve",
  async (page) => {
    const res = await TodoDataService.getAll(page);
    return res.data;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async ({id, data}) => {
    const res = await TodoDataService.update(id, data);
    return res.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/delete", async (id) => {
  await TodoDataService.remove(id);
  return {id};
});

export const markAsDone = createAsyncThunk("todos/markDone", async (id) => {
  const res = await TodoDataService.markDone(id);
  return res.data;
});

export const markAsUndone = createAsyncThunk("todos/markUndone", async (id) => {
  const res = await TodoDataService.markUndone(id);
  return res.data;
});

export const findTodoByName = createAsyncThunk(
  "todos/findByName",
  async ({name}) => {
    const res = await TodoDataService.findByName(name);
    return res.data;
  }
);

export const findById = createAsyncThunk("todos/findById", async (id) => {
  const res = await TodoDataService.get(id);
  return res.data;
});

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: {
    [createTodo.fulfilled]: (state, action) => {},
    [retrieveTodos.fulfilled]: (state, action) => {
      return {...action.payload};
    },
    [updateTodo.fulfilled]: (state, action) => {
      const index = state.results.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.results[index] = {
        ...state.results[index],
        ...action.payload,
      };
    },
    [deleteTodo.fulfilled]: (state, action) => {
      let index = state.results.findIndex(({id}) => id === action.payload.id);
      state.results.splice(index, 1);
    },
    [markAsDone.fulfilled]: (state, action) => {
      return;
    },
    [markAsUndone.fulfilled]: (state, action) => {
      return;
    },
    [findTodoByName.fulfilled]: (state, action) => {
      return {...action.payload};
    },
  },
});

const {reducer} = todosSlice;
export default reducer;
