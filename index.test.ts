import request from "supertest";
import app from "../src/index";

describe("Health check", () => {
  it("GET /health returns 200 and status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.timestamp).toBeDefined();
  });
});

describe("Task API", () => {
  it("GET /tasks returns empty array initially", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.tasks)).toBe(true);
  });

  it("POST /tasks creates a new task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test task" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test task");
    expect(res.body.status).toBe("pending");
    expect(res.body.id).toBeDefined();
  });

  it("POST /tasks returns 400 if title is missing", async () => {
    const res = await request(app).post("/tasks").send({});
    expect(res.status).toBe(400);
  });

  it("GET /tasks/:id returns the task", async () => {
    const create = await request(app).post("/tasks").send({ title: "Find me" });
    const id = create.body.id;
    const res = await request(app).get(`/tasks/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Find me");
  });

  it("GET /tasks/:id returns 404 for unknown id", async () => {
    const res = await request(app).get("/tasks/nonexistent-id");
    expect(res.status).toBe(404);
  });

  it("PATCH /tasks/:id updates status", async () => {
    const create = await request(app).post("/tasks").send({ title: "Update me" });
    const id = create.body.id;
    const res = await request(app).patch(`/tasks/${id}`).send({ status: "done" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("done");
  });

  it("PATCH /tasks/:id returns 400 for invalid status", async () => {
    const create = await request(app).post("/tasks").send({ title: "Bad update" });
    const id = create.body.id;
    const res = await request(app).patch(`/tasks/${id}`).send({ status: "flying" });
    expect(res.status).toBe(400);
  });

  it("DELETE /tasks/:id removes the task", async () => {
    const create = await request(app).post("/tasks").send({ title: "Delete me" });
    const id = create.body.id;
    const del = await request(app).delete(`/tasks/${id}`);
    expect(del.status).toBe(204);
    const get = await request(app).get(`/tasks/${id}`);
    expect(get.status).toBe(404);
  });
});
