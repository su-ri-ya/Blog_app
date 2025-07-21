<template>
  <div class="container" v-if="blog">
    <h1>{{ blog.title }}</h1>
   <img :src="`${config.public.imageBase}/${blog.image}`" alt="Blog Image" />
    <p>{{ blog.description }}</p>
    <p><strong>Date:</strong> {{ blog.date }}</p>
    <NuxtLink to="/" class="btn">⬅️ Back</NuxtLink>
  </div>

  <div v-else class="loading">
    <p>Loading blog or blog not found...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const blog = ref(null)
const route = useRoute()
const config = useRuntimeConfig()

onMounted(async () => {
  try {
    const res = await fetch(`${config.public.apiBase}/blogs`)
    const data = await res.json()

    // ✅ Safely find the blog with matching id
    const found = Array.isArray(data)
      ? data.find(b => b.id === parseInt(route.params.id))
      : null

    if (found) {
      blog.value = found
    } else {
      console.warn('Blog not found')
    }
  } catch (err) {
    console.error('Error loading blog:', err)
  }
})
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  color: white;
  background-color: #121212;
}
img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 6px;
}
.btn {
  display: inline-block;
  margin-top: 20px;
  background: #ccc;
  padding: 8px 14px;
  text-decoration: none;
  color: black;
}
.loading {
  text-align: center;
  margin-top: 40px;
  color: white;
}
</style>