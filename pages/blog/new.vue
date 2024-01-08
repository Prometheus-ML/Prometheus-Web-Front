<template>
  <div class="container mx-auto pt-40 pb-24">
    <p class="font-bold text-5xl mb-14">게시글 등록</p>
    <!-- <Editor :post="post"/> -->
    <form @submit.prevent="submitPost">
      <label>Title: <input v-model="postData.title" /></label>
      <label>Thumb: <input type="file" @change="handleFileChange" /></label>
      <label>Category: <input v-model="postData.category" /></label>
      <label>URL: <input v-model="postData.url" /></label>
      <button type="submit">Submit</button>
    </form>

  </div>
</template>

<script setup>
// const post = ref({
//   tag: []
// })

const postData = ref({
  title: '',
  thumb: null,
  category: '',
  url: '',
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  postData.thumb = file;
};

const submitPost = async () => {
  try {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('thumb', postData.thumb);
    formData.append('category', postData.category);
    formData.append('url', postData.url);

    // Assuming your API endpoint is '/api/posts'
    const result = await $api(`/link/create_link`, {
      method: 'POST',
      body: formData.value
    })

    console.log('Post submitted successfully:', result.data);
    navigateTo('/posts');
  } catch (error) {
    console.error('Error submitting post:', error);
  }
};

</script>