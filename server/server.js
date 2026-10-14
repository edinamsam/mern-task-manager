const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Task = require("./models/Task.js");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Unable to fetch data:", error.message);
    res.status(500).json({
      message: "Failed to retrieve data",
    });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Couldn't find requested task:", error.message);
    res.status(500).json({
      message: "Failed to retrieve task",
    });
  }
});

app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const { title, completed } = req.body;
    const newData = {};

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
          message: "Title must be a non-empty string",
        });
      }

      newData.title = title;
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          message: "Completed must be a Boolean value",
        });
      }

      newData.completed = completed;
    }

    if (Object.keys(newData).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update",
      });
    }

    const task = await Task.findByIdAndUpdate(id, newData, { new: true });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Couldn't update task:", error.message);
    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

app.post("/api/tasks", async (req, res) => {
  const { title } = req.body;

  try {
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        message: "Title must be a non-empty string",
      });
    }

    const task = await Task.create({
      title,
    });

    res.status(201).json({
      message: "Task received",
      task,
    });
  } catch (error) {
    console.error("Task creation failed:", error.message);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (task) {
      return res.status(200).json(task);
    }

    res.status(404).json({
      message: "Task not found",
    });
  } catch (error) {
    console.error("Failed to delete task:", error.message);
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

startServer();
