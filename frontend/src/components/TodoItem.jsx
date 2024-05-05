import { useState } from "react";

export function TodoItem({ completed, id, title, editId, toggleEditId, editTodo, toggleTodo, deleteTodo }) {
  const [newName, setNewName] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  return (
    <li>
      <label>
        { editId === id ?
          <>
          <input
                type="text"
                className="textInput"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
          <button className="btn" onClick={(e)=>{
            setEditStatus(true);
            editTodo(id, newName);
            toggleEditId(id);
            }
          }>
            OK
          </button>
          </>
          :
          <input
          type="checkbox"
          checked={completed}
          onChange={(e) => {
            if(editStatus){
              setEditStatus(false);
              return;
            }
            toggleTodo(id, e.target.checked);
          }}
        />

        }
        <div className="font-mono text-lg title">{title}</div>
        { editId !== id &&
        <button className="font-mono btn btn-danger hover:animate-pulse" onClick={() => deleteTodo(id)}>
          Delete
        </button>
        }
        { editId !== id &&
        <button className="font-mono btn hover:animate-pulse" onClick={() => toggleEditId(id)}>
          Edit
        </button>
        }
      </label>
    </li>
  );
}
