// controllers/blogController.js
import { connection } from '../config/db.js';

export const getAllBlogs = (req, res) => {
  const sql = 'SELECT * FROM blogs ORDER BY id DESC';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Failed to fetch blogs:', err);
      return res.status(500).json({ error: 'Failed to fetch blogs' });
    }
    res.json(results);
    
  });
};

// ✅ Add blog (POST)
export const addBlog = (req, res) => {
  const { title, description, date } = req.body;
  const image =req.file.filename;

  if (!title || !description || !image) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO blogs (title, description, image, date) VALUES (?, ?, ?, ?)';
  const values = [title, description, image, date];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error inserting blog:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: '✅ Blog added successfully!' });
  });
};
// DELETE a blog by ID
// DELETE /api/blogs/:id
export const deleteBlog = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM blogs WHERE id = ?';

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Failed to delete blog:', err);
      return res.status(500).json({ error: 'Failed to delete blog' });
    }

    res.json({ message: '✅ Blog deleted successfully' });
  });
};
// UPDATE a blog by ID
export const updateBlog = (req, res) => {
  const blogId = req.params.id;
  const { title, description, image, date } = req.body;

  if (!title || !description || !image || !date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `
    UPDATE blogs
    SET title = ?, description = ?, image = ?, date = ?
    WHERE id = ?
  `;
  const values = [title, description, image, date, blogId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Failed to update blog:', err);
      return res.status(500).json({ error: 'Failed to update blog' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ message: 'Blog updated successfully' });
  });
};