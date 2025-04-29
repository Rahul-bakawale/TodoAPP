import React, { useMemo, useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  console.log("newTask", tasks);
  const handleAdd = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggle = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const handleSave = () => {
    const updated = [...tasks];
    updated[editIndex].text = editText;
    setTasks(updated);
    setEditIndex(null);
    setEditText("");
  };
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {tasks.length ? (
        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("incomplete")}>Incomplete</button>
        </div>
      ) : (
        ""
      )}

      {filteredTasks.map((task, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggle(index)}
          />
          {editIndex === index ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  marginLeft: "8px",
                  flex: 1,
                }}
              >
                {task.text}
              </span>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;
