import "../App.css";
import { useEffect, useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [showUnchecked, setShowUnchecked] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Function to fetch todos
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/todos");
        setTodos(response.data); // Update the todos state with fetched data
      } catch (error) {
        console.error("There was an error fetching the todos:", error);
      }
    };
  
    fetchTodos();
    console.log("Data updated")
    setRefresh(false);
  }, [refresh]);

  async function addTodo(title) {
    const newTodo = {
      // id: crypto.randomUUID(), // Generate a UUID for the new todo item
      title,
      completed: false,
    };

    await axios.post("http://localhost:8000/todos/new", newTodo)
    .catch((error) => {
      console.error("there was an error deleting the todo", error);
    });

    setRefresh(true);
  }

  async function toggleTodo(id) {
    await axios.patch(`http://localhost:8000/todos/toggle/${id}`)
    .catch((error) => {
        console.error("there was an error deleting the todo", error);
      });
    setRefresh(true);
  }

  async function deleteTodo(id) {
    await axios.delete(`http://localhost:8000/todos/delete/${id}`)
    .catch((error) => {
        console.error("there was an error deleting the todo", error);
      });
    
    setRefresh(true);
  }

  async function editTodo(id, title) {
    if(title === "") return;
    await axios.patch(`http://localhost:8000/todos/edit/${id}`, {title})
    .catch((error) => {
      console.error("there was an error editing the todo", error)
    })

    setRefresh(true);
  }

  function toggleUnchecked() {
    setShowUnchecked(!showUnchecked);
    return;
  }

  return (
    <>
      <div className="h-screen p-5 bg-gradient-to-br from-gray-900 to-slate-800">
        <TodoForm addTodo={addTodo}/>
        <TodoList todos={todos} showUnchecked={showUnchecked} toggleUnchecked={toggleUnchecked} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>
      </div>
    </>
  );
}

export default Todo;
