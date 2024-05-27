import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setTodos(
        todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        )
    );
  };

  const editTodo = (index, newText) => {
    setTodos(
        todos.map((todo, i) => (i === index ? { ...todo, text: newText } : todo))
    );
  };

  return (
      <div className="container">
        <h1>To-Do List</h1>
        <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter Your TO-DO"
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map((todo, index) => (
              <li key={index} className={todo.completed ? "completed" : ""}>
                <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => editTodo(index, e.target.value)}
                    className="todo-input"
                />
                <button onClick={() => toggleComplete(index)}>
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => deleteTodo(index)} className="delete-todo-btn">
                  X
                </button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
