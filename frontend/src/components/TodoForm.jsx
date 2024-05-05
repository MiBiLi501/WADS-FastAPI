import { useState } from "react";

export function TodoForm({ addTodo }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem === "") return;

    addTodo(newItem);
    setNewItem("");
  }

  return (
    <div>
      <form className="new-item-form">
        <div className="form-row">
          <label className="font-mono text-center text-2xl" htmlFor="item">New item</label>
          <input
            className="font-mono"
            placeholder="Enter to-do name"
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <button className={"font-mono btn hover:animate-pulse "} onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}
