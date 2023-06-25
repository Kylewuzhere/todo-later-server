const express = require("express");
const router = express.Router();
const todosRepo = require("./todos.repository");
const { checkJwt } = require("../middleware/authorizationMiddleware");

// Routes
// Get all todos
router.get("/", checkJwt, async (req, res) => {
  try {
    const { body, auth } = req;
    const newRequest = {
      userId: auth.payload.sub,
      ...body,
    };
    const allTodos = await todosRepo.getTodos(newRequest.userId);
    return res.status(200).json(allTodos);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Get single todo
router.get("/:id", checkJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todosRepo.getTodo(id);
    return res.status(200).json(todo);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Create todo
router.post("/", checkJwt, async (req, res) => {
  try {
    const { body, auth } = req;
    const newRequest = {
      userId: auth.payload.sub,
      ...body,
    };
    const newTodo = await todosRepo.createTodo(newRequest);
    return res.status(201).json(newTodo);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Update todo
router.put("/:id", checkJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updateTodo = todosRepo.updateTodo(id, {
      title,
      description,
      completed,
    });
    return res.status(201).json(updateTodo);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Delete todo
router.delete("/:id", checkJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await todosRepo.deleteTodo(id);
    return res.status(201).json(deleteTodo);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
