import { useState } from "react";
import { TodoItem } from "./TodoItem";

export function TodoList({ todos, editTodo, showUnchecked, toggleUnchecked, toggleTodo, deleteTodo }) {
  const [editId, setEditId] = useState("");
  function toggleEditId(id){
    if (editId === id){
      setEditId("");
      return;
    }

    setEditId(id)
  }

  function todosFilter(){
    return showUnchecked ? todos.filter((todo) => !todo.completed) : todos;
  }

  return (
    <div className="h-4/5 px-5 py-1 my-5 bg-gradient-to-b from-blue-950">
      <div className="flex items-center justify-between">
        <h1 className="header font-mono">Todo List</h1>
        <button className={"btn font-mono text-xs " + (showUnchecked && "btn-danger animate-pulse")} onClick={() => toggleUnchecked()}>Only show unchecked</button>
      </div>
      <ul className="list overflow-ellipsis">
        <div className="font-mono">{todos.length === 0 && "No todos"}</div>
        {(todosFilter()).map((todo) => {
          return (
            <TodoItem
              {...todo}
              key={todo.id}
              editId={editId}
              toggleEditId={toggleEditId}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          );
        })}
      </ul>
    </div>
  );
}
