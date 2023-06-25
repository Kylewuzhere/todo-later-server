const request = require("supertest");
const app = require("../app");
const todosRepository = require("./todos.repository");
const { checkJwt } = require("../middleware/authorizationMiddleware");

jest.mock("./todos.repository");
jest.mock("../middleware/authorizationMiddleware");

describe("Todos router", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("GET /api/todos returns 401 when user is not authenticated", async () => {
    checkJwt.mockImplementation((req, res, next) => {
      try {
        const error = new Error("Unauthenticated");
        error.status = 401;
        throw error;
      } catch (err) {
        next(err);
      }
    });

    await request(app)
      .get("/api/todos")
      .set("Accept", "application/json")
      .expect((response) => {
        expect(response.status).toEqual(401);
      });
  });
});

test("GET /api/todos return status code 200 and array of todos", async () => {
  checkJwt.mockImplementation((req, res, next) => next());
  const todos = [
    {
      id: "1",
      title: "Todo 1",
      description: "Todo 1 description",
      completed: false,
    },
    {
      id: "2",
      title: "Todo 2",
      description: "Todo 2 description",
      completed: false,
    },
  ];

  todosRepository.getTodos.mockResolvedValue(todos);

  await request(app)
    .get("/api/todos")
    .set("Accept", "application/json")
    .expect((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(todos);
    });
});

test("GET /api/todos return status code 200 and empty array", async () => {
  checkJwt.mockImplementation((req, res, next) => next());

  const todos = [];

  todosRepository.getTodos.mockResolvedValue(todos);

  await request(app)
    .get("/api/todos")
    .set("Accept", "application/json")
    .expect((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(todos);
    });
});

test("GET /api/todos returns status code 500 when server has problems", async () => {
  todosRepository.getTodos.mockRejectedValue(
    new Error("Internal Server Error")
  );

  const response = await request(app)
    .get("/api/todos")
    .set("Accept", "application/json");

  expect(response.status).toBe(500);
});

test("POST /api/todos returns status code 201 and todo posted", async () => {
  checkJwt.mockImplementation((req, res, next) => next());

  const todo = {
    id: "1",
    title: "Todo 1",
    description: "Todo 1 description",
    completed: false,
  };

  todosRepository.createTodo.mockResolvedValue(todo);

  await request(app)
    .post("/api/todos")
    .send({ title: "Todo 1", description: "Todo 1 description" })
    .set("Accept", "application/json")
    .expect((response) => {
      expect(response.statusCode).toEqual(201);
      expect(response.body).toEqual(todo);
    });
});

test("POST /api/todos returns status 500 when server has a problem", async () => {
  const todo = {
    id: "1",
    title: "Todo 1",
    description: "Todo 1 description",
    completed: false,
  };

  todosRepository.createTodo.mockRejectedValue(
    new Error("Internal Server Error")
  );

  const response = await request(app)
    .post("/api/todos")
    .send(todo)
    .set("Accept", "application/json");

  expect(response.status).toBe(500);
});
test("PUT /api/todos/:id", async () => {
  checkJwt.mockImplementation((req, res, next) => next());

  const todo = {
    todo_id: "1",
    title: "Todo 1",
    description: "Todo 1 description",
    completed: true,
  };

  await todosRepository.updateTodo.mockResolvedValue(todo);

  await request(app)
    .put("/api/todos/1")
    .send(todo)
    .set("Accept", "application/json")
    .expect((response) => {
      expect(response.statusCode).toEqual(201);
    });
});

test("PUT /api/todos/:id returns status 500 when server has a problem", async () => {
  const todo = {
    id: "1",
    title: "Todo 1",
    description: "Todo 1 description",
    completed: false,
  };

  await todosRepository.updateTodo.mockRejectedValue(
    new Error("Internal Server Error")
  );

  const response = await request(app)
    .post("/api/todos")
    .send(todo)
    .set("Accept", "application/json");

  expect(response.status).toBe(500);
});

test("DELETE /api/todos/:id", async () => {
  checkJwt.mockImplementation((req, res, next) => next());

  const todo = {
    todo_id: "1",
    title: "Todo 1",
    description: "Todo 1 description",
    completed: true,
  };

  todosRepository.deleteTodo.mockResolvedValue(todo);

  await request(app)
    .delete("/api/todos/1")
    .set("Accept", "application/json")
    .expect((response) => {
      expect(response.statusCode).toEqual(201);
    });
});

test("DELETE /api/todos/:id returns status 500 when server has a problem", async () => {
  const todo = {
    id: "1",
    title: "Todo 1",
    description: "Todo 1 description",
    completed: false,
  };

  await todosRepository.deleteTodo.mockRejectedValue(
    new Error("Internal Server Error")
  );

  const response = await request(app)
    .post("/api/todos")
    .send(todo)
    .set("Accept", "application/json");

  expect(response.status).toBe(500);
});
