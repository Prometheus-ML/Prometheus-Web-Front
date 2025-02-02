<template>
  <div class="container min-h-screen text-white mx-auto pt-40 pb-24">
    <p class="font-bold text-3xl md:text-5xl mb-14">게시글 등록</p>
    <div class="gap-2">
      <div class="md:grid grid-cols-2 gap-2 md:gap-6">
        <div class="w-full flex flex-col gap-2">
          <label>Title</label> 
          <input class="bg-neutral-500 py-1 px-3 w-full" v-model="formData.title" />
          <label>Category </label>
          <select 
            class="bg-neutral-500 cursor-pointer px-3 rounded-none text-white py-1 focus:outline-none" 
            v-model="formData.domain">
            <option class="px-2 py-1">AI News</option>
            <option class="px-2 py-1">Newspaper</option>
          </select>

          <label>URL</label> 
          <input class="bg-neutral-500 py-1 px-3" v-model="formData.url" />

          <label>Tags</label>
          <input 
            v-model="tagName"
            type="text"
            class="bg-neutral-500 text-white w-full py-1 px-3" 
            placeholder="태그 입력 후 엔터를 눌러주세요"
            @keyup.enter="addTag(tagName)"
            >
          
          <div class="flex gap-2 flex-wrap">
            <div class="bg-white text-black rounded-xl px-2 flex items-center" v-for="(tag, index) in formData.tags">
              <span class="px-1"><strong class="font-semibold">#</strong>{{ tag }}</span>
              <font-awesome-icon @click="removeTag(index)" class="ml-1 cursor-pointer" icon="fa-solid fa-xmark" />
            </div>
          </div>
          <label>Editor</label> 
          <input class="bg-neutral-500 py-1 px-3" v-model="formData.meta.editor" />

          <label>Date</label> 
          <input class="bg-neutral-500 py-1 px-3" v-model="formData.meta.date" />

          <label>Description</label>
          <textarea class="bg-neutral-500 py-1 mb-2 w-full h-16" v-model="formData.description"></textarea>
        </div>
        <div>
          <label>Image</label> 
          <div class="mt-2 relative row-span-2 py-40 rounded bg-contain bg-center bg-no-repeat border border-dashed border-4"
              :style="{ backgroundImage: 'url(' + imageCache + ')', backgroundSize: 'cover', backgroundPosition: 'center' }">
            <div
                v-if="imageCache"
                class="absolute top-0 right-0 flex items-center justify-center p-6 rounded-full cursor-pointer text-rose-600 hover:opacity-70"
                @click="clearImageCache"
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
                    @change="cacheImage"
                >
                <label
                    for="image-upload"
                    class="cursor-pointer w-full h-full hover:bg-neutral-400/70 hover:text-white"
                >
                  <p class="absolute text-2xl left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">+</p>
                </label>
            </div>
          </div>
          <div class="w-full mt-6 md:mt-4 flex justify-end">
            <button class="hover:opacity-70 px-3 py-1 rounded bg-rose-600" @click="submitPost">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const formData = ref({
  title: '',
  description: '',
  domain: '',
  link_thumb: '',
  url: '',
  tags: [],
  meta: {}
});

const tagName = ref('');
const imageCache = ref(''); // 이미지 캐시
const imageFile = ref(null);

async function uploadImage(file) {
  if (file.size > 2 * 1024 * 1024) {
    alert('File size exceeds 2MB. Please select a smaller file.');
    return;
  }

  const form = new FormData();
  form.append('domain', 'link-prometheus-web');
  form.append('file', file);

  try {
    const response = await $api('/file/upload-file', {
      method: 'POST',
      body: form
    });

    return response.file_id;

  } catch (error) {
    console.error(error);
  }
}

function cacheImage(event) {
  const file = event.target.files[0];


  if (file.size > 2 * 1024 * 1024) {
    alert('File size exceeds 2MB. Please select a smaller file.');
    return;
  }
  imageFile.value = file;
  const reader = new FileReader();
  reader.onload = () => {
    imageCache.value = reader.result; // 이미지 캐시에 저장
  };
  reader.readAsDataURL(file);
}

// 이미지 캐시 초기화
function clearImageCache() {
  imageCache.value = '';
}



function addTag(name) {
  if (name.trim()) {
    // 중복 검사 (문자열 비교)
    const filter = formData.value.tags.includes(name);
    if (!filter) {
      // 문자열로 추가
      formData.value.tags.push(name);
    }
  }

  tagName.value = "";
}

function removeTag(index) {
  formData.value.tags.splice(index, 1);
}

async function submitPost() {
  // 링크 데이터 전송
  const postData = ref({
    title: formData.value.title,
    description: formData.value.description,
    URL_type: formData.value.domain,
    linkURL: formData.value.url,
    tags: formData.value.tags,
    meta: formData.value.meta
  });

  try {

    if (imageFile.value) {
      const imageUrl = await uploadImage(imageFile.value); // 파일 객체 전달

      postData.value.link_thumb = imageUrl;
      console.log(imageUrl);
      if(!imageUrl) {
        return;
      }
    }

    const linkResponse = await $api('/link/auto_new_link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData.value)
    });



    console.log('게시글 업로드 성공:', linkResponse);
    navigateTo('/blog');
  } catch (error) {
    console.error('게시글 업로드 실패:', error);
  }
}
</script>

<style>
.container select option:hover {
  background-color: #4caf50;
  color: white;
}
</style>
