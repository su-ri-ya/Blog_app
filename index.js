// index.js
import express from 'express';
import cors from 'cors';
import blogRoutes from './routes/blogRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("uploads"));

// Route prefix
app.use('/api/blogs', blogRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});