const pool = require("../db");

module.exports = {
  getTodos: async (userId) => {
    try {
      const { rows } = await pool.query(
        `
        SELECT * FROM todo WHERE user_id = $1`,
        [userId]
      );
      return rows;
    } catch (err) {
      console.error(err.message);
    }
  },
  getTodo: async (id) => {
    try {
      const { rows } = await pool.query(
        `
        SELECT * FROM todo WHERE todo_id = $1`,
        [id]
      );
      return rows.length ? rows[0] : null;
    } catch (err) {
      console.error(err.message);
    }
  },
  createTodo: async (body) => {
    const { userId, title, description } = body;
    try {
      const { rows } = await pool.query(
        `INSERT INTO todo (user_id, title, description) VALUES ($1, $2, $3) RETURNING *`,
        [userId, title, description]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
    }
  },
  updateTodo: async (id, { title, description, completed }) => {
    try {
      const { rows } = await pool.query(
        `UPDATE todo SET title = $1, description = $2, completed = $3 WHERE todo_id = $4 RETURNING *`,
        [title, description, completed, id]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
    }
  },
  deleteTodo: async (id) => {
    try {
      const { rows } = await pool.query(
        `DELETE FROM todo WHERE todo_id = $1 RETURNING *`,
        [id]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
    }
  },
};
