<template>
  <div class="container">
    <h1>✏️ Edit Blog</h1>

    <form @submit.prevent="handleSubmit">
      <label for="title">Title:</label>
      <input v-model="title" type="text" placeholder="Title" required />

      <label for="description">Description:</label>
      <textarea v-model="description" placeholder="Description" required></textarea>

      <label for="image">Image URL:</label>
      <input v-model="image" type="text" placeholder="Image URL" required />

      <button type="submit">Update</button>
    </form>

    <NuxtLink to="/" class="btn">⬅ Back</NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const id = route.params.id
const title = ref('')
const description = ref('')
const image = ref('')

onMounted(async () => {
  try {
    const res = await fetch(`${config.public.apiBase}/blogs`)
    const data = await res.json()

    const blog = Array.isArray(data)
      ? data.find(b => b.id === parseInt(id))
      : null

    if (blog) {
      title.value = blog.title
      description.value = blog.description
      image.value = blog.image
    } else {
      console.warn('Blog not found')
    }
  } catch (err) {
    console.error('Error fetching blog:', err)
  }
})

const handleSubmit = async () => {
  const updatedBlog = {
    id: parseInt(id),
    title: title.value,
    description: description.value,
    image: image.value,
    date: new Date().toISOString().slice(0, 10)
  }

  try {
    const res = await fetch(`${config.public.apiBase}/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBlog)
    })

    if (!res.ok) throw new Error('Update failed')

    router.push('/')
  } catch (err) {
    console.error('❌ Update failed:', err)
    alert('Something went wrong while updating the blog.')
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
input, textarea {
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
}
button {
  background: orange;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
}
.btn {
  display: inline-block;
  margin-top: 20px;
  background: #ccc;
  padding: 8px 14px;
  text-decoration: none;
}
</style>