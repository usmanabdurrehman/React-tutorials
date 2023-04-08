import React, { useCallback, useState } from "react";

import {
  useCreateTodo,
  useDeleteTodo,
  useTodos,
  useUpdateTodo,
} from "./requests";

import "./index.css";
import { useQuery, useQueryClient } from "react-query";
import { Todo } from "./types";

const Loader = () => (
  <div className="spinner-border spinner-border-sm text-light" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

export default function SetQueryData() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [todoId, setTodoId] = useState<number | undefined>();
  const [deleteTodoId, setDeleteTodoId] = useState<number | undefined>();

  const { data: todos = [] } = useTodos();
  const { mutateAsync: createTodo, isLoading: isCreating } = useCreateTodo();
  const { mutateAsync: deleteTodo, isLoading: isDeleting } = useDeleteTodo();
  const { mutateAsync: updateTodo, isLoading: isUpdating } = useUpdateTodo();

  const onDeleteTodo = useCallback(async (id: number) => {
    await deleteTodo(id);
    setDeleteTodoId(undefined);

    queryClient.setQueryData(["GET_TODOS"], (todos?: Todo[]) => {
      return (todos || [])?.filter((todo) => todo.id !== id);
    });
  }, []);

  const onCreateTodo = useCallback(async () => {
    const newTodo = await createTodo(title);

    queryClient.setQueryData(["GET_TODOS"], (todos?: Todo[]) => {
      return [newTodo, ...(todos || [])];
    });
  }, [title]);

  const onUpdateTodo = useCallback(async () => {
    if (!todoId) return;
    const updatedTodo = await updateTodo({ id: todoId, title });
    setTodoId(undefined);

    queryClient.setQueryData(["GET_TODOS"], (todos?: Todo[]) => {
      return (todos || []).map((todo) =>
        todo.id === todoId ? updatedTodo : todo
      );
    });
  }, [todoId, title]);

  return (
    <div className="container-lg p-5">
      <div className="row">
        <div className="col">
          {todos.map(({ id, title }) => (
            <div className="d-flex justify-content-between align-items-center">
              <p key={id}>{title}</p>
              <div>
                <button
                  className="btn btn-light btn-fixed"
                  onClick={() => setTodoId(id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-fixed"
                  onClick={() => {
                    setDeleteTodoId(id);
                    onDeleteTodo(id);
                  }}
                >
                  {isDeleting && id === deleteTodoId ? <Loader /> : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          <h2>{todoId ? "Update" : "Create"} a todo</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <button
            onClick={() => (todoId ? onUpdateTodo() : onCreateTodo())}
            className="btn btn-success btn-fixed"
          >
            {isCreating || isUpdating ? <Loader /> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
