import { useState } from "react";
import "./App.css";

export default function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = newTodo.trim();
    if (!text) return;
    setTodos([...todos, { text, done: false }]);
    setNewTodo("");
  };

  const handleDelete = (idx) => setTodos(todos.filter((_, i) => i !== idx));

  const handleDone = (idx) =>
    setTodos(todos.map((t, i) => (i === idx ? { ...t, done: !t.done } : t)));

  return (
    <main className="container">
      <h1>Simple Todo</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="todo-input"
          type="text"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="todo-button" type="submit">
          Add
        </button>
      </form>

      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map((todo, i) => (
            <li key={i} className="todo-item">
              <label className="todo-item-label">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleDone(i)}
                />
                <span className={todo.done ? "todo completed" : "todo"}>
                  {todo.text}
                </span>
              </label>
              <button
                type="button"
                onClick={() => handleDelete(i)}
                className="delete-button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks added yet.</p>
      )}
    </main>
  );
}
