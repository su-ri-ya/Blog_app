<template>
  <div class="container">
    <h1>➕ Add New Blog</h1>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <label for="title">Title:</label>
      <input v-model="title" type="text" placeholder="Enter title" required />

      <label for="description">Description:</label>
      <textarea v-model="description" placeholder="Enter description" required></textarea>

      <label for="image">Image:</label>
      <input type="file" @change="handleFileUpload" accept="image/*" required />

      <button>Submit</button>
    </form>

    <NuxtLink to="/" class="btn">⬅️ Back</NuxtLink>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const config = useRuntimeConfig();
const router = useRouter();

const title = ref('');
const description = ref('');
const imageFile = ref(null);

const handleFileUpload = (event) => {
  imageFile.value = event.target.files[0];
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('description', description.value);
  formData.append('image', imageFile.value);
  formData.append('date', new Date().toISOString().slice(0, 10));

  try {
    const res = await fetch(`${config.public.apiBase}/blogs`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Blog submission failed');
    router.push('/');
  } catch (err) {
    console.error('❌ Blog submit failed:', err);
    alert('Something went wrong while submitting blog.');
  }
};
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
  background: green;
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