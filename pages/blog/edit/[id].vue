<template>
  <div class="container mx-auto pt-40 pb-24">
    <p class="font-bold text-5xl mb-14">게시글 편집</p>
    <!-- <Editor :post="post"/> -->
    <form v-if="formData" @submit.prevent="editPost">
      <label>Title: <input class="bg-neutral-700" v-model="formData.title" /></label>
      <label>Category: <select class="bg-neutral-700" v-model="formData.category">
        <option>news</option>
        <option>article</option>
        <option>blog</option>
      </select>
      </label>
      <label>URL: <input class="bg-neutral-700" v-model="formData.url" /></label>
      <div class="relative row-span-2 pb-44 rounded basis-80 bg-contain bg-center bg-no-repeat border border-dashed border-4"
              :style="{ backgroundImage: 'url(' + useImage(formData?.thumb, type) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
        <div
            v-if="formData?.thumb"
            class="absolute top-0 right-0 flex items-center justify-center w-6 h-6 rounded-full cursor-pointer text-indigo-600 hover:text-indigo-700"
            @click="addImageStack(formData?.thumb)"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
        <div
            v-else
            class="absolute inset-0 flex items-center justify-center"
        >
            <input
                id="image-upload"
                type="file"
                class="hidden"
                @change="handleImageUpload"
            >
            <label
                for="image-upload"
                class="rounded-full cursor-pointer text-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
                +
            </label>
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>

  </div>
</template>

<script setup>
// const post = ref({
//   tag: []
// })
const type = "links"
const imageStack = ref([])
const formData = ref({})


async function uploadImage(value) {
  if (!value) {
    return;
  }

  const formData = new FormData();
  formData.append('image', value);

  return $api(`/image/upload/${type}`, {
    method: 'POST',
    body: formData
  })
}

function addImageStack(value){
  imageStack.value.push(value)
  formData.value.thumb = null;
}

async function handleImageUpload(event) {
  const file = event.target.files[0]

  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
  const fileExtension = file.name.split('.').pop()
  const fileMimeType = file.type

  // Check file extension
  if (!allowedExtensions.exec(file.name)) {
    return false
  }

  // Check MIME type
  if (!allowedMimeTypes.includes(fileMimeType)) {
    return false
  }

  const image = await uploadImage(file)
  formData.value.thumb = image.url

  return true
}

async function removeImage(value) {
	try {
		const response = await $api(`${import.meta.env.VITE_API_URL}/image/delete/${type}/${value}`, {
      method: 'DELETE',
    });
		formData.value.thumb = null
	}	catch (error) {
		console.error(error)
	}
}

const editPost = async () => {
  try {
    // Assuming your API endpoint is '/api/posts'
    const result = await $api(`/link/update_link`, {
      method: 'POST',
      body: formData.value
    })

    for(let i = 0;i < imageStack.value.length;++i){
      removeImage(imageStack.value[i]);
    }
    console.log('Post submitted successfully:', result.data);
    navigateTo('/blog');
  } catch (error) {
    console.error('Error submitting post:', error);
  }
};

const getLink = async () => {
  try {
    const response = await $fetch(`${import.meta.env.VITE_API_URL}/link/${useRoute().params.id}`, {
      method: 'GET',
    })
    formData.value = response;
    console.log(formData.value);
  } catch (error){
    console.log(error);
  }
}

onMounted(async() => {
  await getLink();
})
</script>