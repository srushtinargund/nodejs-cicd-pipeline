import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// In-memory task store (demo purposes)
interface Task {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "done";
  createdAt: string;
}

const tasks: Map<string, Task> = new Map();

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// GET all tasks
app.get("/tasks", (_req: Request, res: Response) => {
  res.json({ tasks: Array.from(tasks.values()) });
});

// GET task by ID
app.get("/tasks/:id", (req: Request, res: Response) => {
  const task = tasks.get(req.params.id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(task);
});

// POST create task
app.post("/tasks", (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title || typeof title !== "string") {
    res.status(400).json({ error: "title is required and must be a string" });
    return;
  }
  const task: Task = {
    id: `task-${Date.now()}`,
    title: title.trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  tasks.set(task.id, task);
  res.status(201).json(task);
});

// PATCH update task status
app.patch("/tasks/:id", (req: Request, res: Response) => {
  const task = tasks.get(req.params.id);
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  const { status } = req.body;
  const validStatuses = ["pending", "in-progress", "done"];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ error: `status must be one of: ${validStatuses.join(", ")}` });
    return;
  }
  task.status = status;
  tasks.set(task.id, task);
  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req: Request, res: Response) => {
  if (!tasks.has(req.params.id)) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  tasks.delete(req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`[INFO] Task service running on port ${PORT}`);
});

export default app;
