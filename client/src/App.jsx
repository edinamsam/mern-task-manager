import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const obtainData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");

        if (!response.ok) {
          throw new Error("Failed to retrieve tasks");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError("Failed to retrieve tasks");
      } finally {
        setLoading(false);
      }
    };

    obtainData();
  }, []);

  const changeFilter = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = data.filter((task) => {
    if (filter === "all") {
      return true;
    }

    if (filter === "pending") {
      return task.completed === false;
    }

    if (filter === "completed") {
      return task.completed === true;
    }
  });

  const addTask = async (e) => {
    e.preventDefault();

    setError(null);

    if (!title.trim()) {
      setError("Please enter a task title");
      return;
    }

    try {
      setIsAdding(true);

      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
      });

      if (response.ok) {
        const result = await response.json();
        //setData([...data, result.task]);
        setData((prevData) => [...prevData, result.task]);
        setTitle("");
      } else {
        setError("Failed to add task");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const toggleTask = async (task) => {
    setError(null);
    setUpdatingTaskId(task._id);

    try {
      const updatedCompleted = !task.completed;
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            completed: updatedCompleted,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const result = await response.json();
      setData(
        data.map((item) => {
          if (item._id === task._id) {
            return result;
          } else {
            return item;
          }
        }),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const deleteTask = async (task) => {
    setError(null);
    setDeletingTaskId(task._id);

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      //setData(data.filter((item) => item._id !== task._id));
      setData((prevData) => prevData.filter((data) => data._id !== task._id));
    } catch (error) {
      setError(error.message);
    } finally {
      setDeletingTaskId(null);
    }
  };

  return (
    <>
      <h1>My Tasks</h1>
      <button onClick={() => changeFilter("all")}>All</button>
      <button onClick={() => changeFilter("pending")}>Pending</button>
      <button onClick={() => changeFilter("completed")}>Completed</button>
      {loading && <p>Loading tasks.....</p>}
      {error && <p className="error-message">{error}</p>}
      <div>
        {!loading && data.length === 0 ? (
          <p>No tasks yet. Add your first task!</p>
        ) : !loading && filteredTasks.length === 0 ? (
          <p>
            {filter === "pending" ? "No pending tasks" : "No completed tasks"}
          </p>
        ) : (
          filteredTasks.map((task) => {
            return (
              <div key={task._id} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    toggleTask(task);
                  }}
                  disabled={updatingTaskId === task._id}
                />
                <p className={task.completed ? "completed" : ""}>
                  {task.title}
                </p>
                <button
                  className="delete-button"
                  onClick={() => {
                    deleteTask(task);
                  }}
                  disabled={deletingTaskId === task._id}
                >
                  {deletingTaskId === task._id ? "Deleting" : "Delete"}
                </button>
              </div>
            );
          })
        )}
      </div>
      <form onSubmit={addTask}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className="add-button" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add task"}
        </button>
      </form>
    </>
  );
}

export default App;
