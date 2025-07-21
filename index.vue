<template>
  <div class="container">
    <h1>📝 Blogs</h1>
    <NuxtLink to="/add" class="btn add-btn">➕ Add Blog</NuxtLink>

    <!-- If no blogs -->
    <div v-if="blogs.length === 0" class="card">
      
      <h2>No Blogs Yet</h2>
      <p>Add a blog by clicking the button above.</p>
    </div>

    <!-- Loop through blogs -->
    <div v-for="(blog, index) in blogs" :key="blog.id" class="card">
      {{ console.log("blog image:",blog.image)}}
      <img :src="`${config.public.imageBase}/${blog.image}`" alt="Blog Image" />

      <h2>{{ index + 1 }}. {{ blog.title }}</h2>
      
      <p>{{ truncate(blog.description, 100) }}...</p>
      <p><strong>Date:</strong> {{ blog.date }}</p>

      <!-- Buttons -->
      <div class="card-actions">
        <NuxtLink :to="`/blog/${blog.id}`" class="btn">📖 Read More</NuxtLink>
        <NuxtLink :to="`/edit/${blog.id}`" class="btn">✏️ Edit</NuxtLink>
        <button @click="deleteBlog(blog.id)" class="btn danger">🗑 Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const blogs = ref([])
const config = useRuntimeConfig()

// Fetch all blogs
const fetchBlogs = async () => {
  try {
    const res = await fetch(`${config.public.apiBase}/blogs`)
    blogs.value = await res.json() 
  } catch (error) {
    console.error("❌ Error fetching blogs:", error)
  }
}
onMounted(fetchBlogs)

// Truncate helper
const truncate = (text, length) => {
  return text.length > length ? text.slice(0, length) : text
}

// ✅ Delete blog
const deleteBlog = async (id) => {
  const confirmed = confirm("Are you sure you want to delete this blog?");
  if (!confirmed) return;

  try {
    const res = await fetch(`${config.public.apiBase}/blogs/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      blogs.value = blogs.value.filter(blog => blog.id !== id);
      console.log("🗑 Blog deleted successfully!");
    } else {
      console.log("❌ Failed to delete blog!");
    }
  } catch (error) {
    console.error("❌ Error deleting blog:", error);
  }
}
</script>

<style scoped>
.container {
  max-width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: white;
}

.card {
  width: 100%;
  max-width: 600px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 16px;
  border-radius: 8px;
  background-color: #121212;
}

.card img {
  width: 100%;
  max-height: 500px;
  object-fit:cover;
  border-radius: 6px;
  margin-bottom: 10px;
}

.btn {
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.danger {
  background-color: red;
}

.add-btn {
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: green;
}

.card-actions {
  margin-top: 10px;
}
</style>