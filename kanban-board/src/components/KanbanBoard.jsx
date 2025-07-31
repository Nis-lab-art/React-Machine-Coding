import { useState } from "react";

export default function KanbanBoard() {
  const [columns, setColumns] = useState({
    todo: {
      name: "TO DO",
      items: [],
    },
    development: {
      name: "Development",
      items: [],
    },
    testing: {
      name: "Testing",
      items: [],
    },
    completed: {
      name: "Completed",
      items: [],
    },
  });

  const [newInput, setNewInput] = useState("");
  const [dragItem, setDragItem] = useState(null);

  const handleAddTodo = () => {
    console.log(newInput);
    if (!newInput.trim()) return;

    console.log(columns);
    setColumns((prev) => ({
      ...prev,
      todo: {
        ...prev.todo,
        items: [
          ...prev.todo.items,
          { id: new Date().toString(), content: newInput },
        ],
      },
    }));
    console.log(columns);
    setNewInput("");
  };

  const handleRemove = (taskId, colName) => {
    setColumns((prev) => ({
      ...prev,
      [colName]: {
        ...prev[colName],
        items: prev[colName].items.filter((item) => item.id != taskId),
      },
    }));
  };

  const handleDragStart = (colName, task) => {
    setDragItem({ column: colName, item: task });
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, targetCol) => {
    e.preventDefault();
    if (!dragItem) return;

    const { column: sourceColumn, item: sourceItem } = dragItem;

    if (sourceColumn === targetCol) return;

    setColumns((prev) => ({
      ...prev,
      [sourceColumn]: {
        ...prev[sourceColumn],
        items: prev[sourceColumn].items.filter(
          (item) => item.id != sourceItem.id
        ),
      },
      [targetCol]: {
        ...prev[targetCol],
        items: [...prev[targetCol].items, sourceItem],
      },
    }));
    setDragItem(null);
  };

  return (
    <main className="kanban">
      {/* Task‐entry form */}
      <form
        className="add-task"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo();
        }}
      >
        <label className="visually-hidden" htmlFor="new-task">
          New task
        </label>
        <input
          id="new-task"
          name="new-task"
          type="text"
          value={newInput}
          placeholder="What needs doing…"
          onChange={(e) => setNewInput(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Board container */}
      <div className="board" role="region" aria-label="Kanban board">
        {Object.entries(columns).map(([colKey, column]) => (
          <section
            key={colKey}
            className={`board-column ${colKey}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, colKey)}
            aria-labelledby={`${colKey}-title`}
          >
            <h2 id={`${colKey}-title`} className="column-title">
              {column.name}
            </h2>
            {column.items.length > 0 ? (
              <ul className="task-list">
                {column.items.map((item) => (
                  <li
                    key={item.id}
                    className="task-item"
                    draggable
                    onDragStart={() => handleDragStart(colKey, item)}
                  >
                    <span className="task-text">{item.content}</span>
                    <button
                      type="button"
                      className="task-remove"
                      aria-label={`Remove “${item.content}”`}
                      onClick={() => handleRemove(item.id, colKey)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-task-text">Drop tasks here</p>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
