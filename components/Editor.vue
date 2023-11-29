<template>
  <div class="">
    <p class="text-lg font-bold mb-3">제목</p>
    <input 
      v-model="formData.title"
      type="text"
      class="border rounded w-full py-2 px-3 mb-3" 
      placeholder="제목을 입력해주세요"
      required>

    <input 
      v-if="project"
      v-model="formData.description"
      type="text"
      class="border rounded w-full py-2 px-3 mb-5" 
      placeholder="간략한 개요를 입력해주세요"
      required>

    <div id="editor" class="mb-5"></div>

    <div class="flex gap-7 mb-5 items-center justify-between">
      <div>
        <p class="text-lg font-bold mb-3">대표 이미지</p>
        <p class="mb-3">업로드한 이미지가 대표 이미지가 됩니다. (PNG/JPG/GIF)</p>

        <input id="thumb-upload" type="file" class="hidden" @change="handleImageUpload" accept=".jpg, .png, .gif, .jpeg"/>
        <label class="cursor-pointer bg-white py-2 px-4 border rounded inline-block" for="thumb-upload">이미지 업로드</label>

        <button @click="removeImage" class="ml-2 bg-white py-2 px-4 border rounded inline-block">
          이미지 제거
        </button>
      </div>
      <div class="pb-44 rounded basis-80 bg-contain bg-center bg-no-repeat border border-dashed border-4" :style="{ backgroundImage: 'url(' + useImage(formData?.thumb, type) + ')' }"></div>
    </div>

    <div class="mb-5">
      <p class="text-lg font-bold mb-3">태그</p>
      <input 
        v-model="tagName"
        type="text"
        class="bg-white border rounded w-full p-2 px-3 mb-5" 
        placeholder="태그 입력 후 엔터를 눌러주세요"
        @keyup.enter="addTag(tagName)"
        required>
      
      <div class="flex gap-3 flex-wrap">
        <div class="bg-white py-2 px-4 border rounded inline-block flex items-center gap-x-2" v-for="(tag, index) in formData.tag">
          <span>#{{ tag.name }}</span>
          <font-awesome-icon @click="removeTag(index)" class="cursor-pointer" icon="fa-solid fa-xmark" />
        </div>
      </div>
    </div>
    <button v-if="post" @click="toggleType" class="border">글 종류: {{formData.type}}</button>
    <div class="mb-5" v-if="project">
      <p class="text-lg font-bold mb-3">외부 링크</p>
      <input 
        v-if="project"
        v-model="formData.homepage"
        type="text"
        class="border rounded w-full py-2 px-3 mb-3" 
        placeholder="홈페이지 링크를 입력해주세요"
        required>

      <input 
        v-if="project"
        v-model="formData.github"
        type="text"
        class="border rounded w-full py-2 px-3 mb-3" 
        placeholder="깃허브 링크를 입력해주세요"
        required>

      <input 
        v-if="project"
        v-model="formData.playstore"
        type="text"
        class="border rounded w-full py-2 px-3 mb-3" 
        placeholder="플레이스토어 링크를 입력해주세요"
        required>

      <input 
        v-if="project"
        v-model="formData.appstore"
        type="text"
        class="border rounded w-full py-2 px-3 mb-3" 
        placeholder="앱스토어 링크를 입력해주세요"
        required>

      <input 
        v-if="project"
        v-model="formData.member"
        type="text"
        class="border rounded w-full py-2 px-3 mb-3" 
        placeholder="멤버를 입력해주세요"
        required>

      <input 
        v-if="project"
        v-model="formData.gen"
        type="number"
        class="border rounded w-full py-2 px-3 mb-3" 
        placeholder="기수를 입력해주세요"
        required>
    </div>

    <client-only>
      <div v-if="editMode" class="flex justify-end ">
        <button @click="edit" class="bg-white py-2 px-4 border rounded inline-block">
          수정
        </button>
      </div>

      <div v-if="!editMode" class="flex justify-end ">
        <button @click="save" class="bg-white py-2 px-4 border rounded inline-block">
          등록
        </button>
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import _ from "lodash"
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import '@toast-ui/editor/dist/toastui-editor.css'


const props = defineProps({
  project: Object,
  post: Object,
  editMode: Boolean
})

let editor = null
let tagName = ref("")

const project = props.project
const post = props.post

const formData = project ? ref(_.cloneDeep(project)) : ref(_.cloneDeep(post))
const editMode = props.editMode
const type = "thumbs"

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

async function removeImage() {
	try {
		const response = await $api(`${import.meta.env.VITE_API_URL}/image/delete/${type}/${formData.value.thumb}`, {
      method: 'DELETE',
    });
		formData.value.thumb = null
	}	catch (error) {
		console.error(error)
	}
}

function addTag(name) {
  if(name.trim()){
    const filter = formData.value.tag.filter(tag => tag.name == name);

    if(filter.length == 0){
      formData.value.tag.push({
        name: name
      })
    }
  }

  tagName.value = ""
}

function removeTag(index) {
  if(index < formData.value.tag.length)
  formData.value.tag.splice(index, 1)
}

function toggleType() {
  formData.value.type = formData.value.type === "news" ? "free" : "news";
};

async function save() {

  try {
    formData.value.content = editor?.getMarkdown();
    let url = post ? '/post/new' : '/project/new'
    const result = await $api(url, {
      method: 'POST',
      body: formData.value
    })

    let forwardUrl = post ? `/blog/view/${result.id}` : `/project/view/${result.id}`
    useRouter().push({ path: forwardUrl })
  } catch (error) {
  } 
}

async function edit() {
  try {
    formData.value.content = editor?.getMarkdown();

    let url = post ? '/post/update' : '/project/update'
    const result = await $api(url, {
      method: 'put',
      body: formData.value
    })

    let forwardUrl = post ? `/blog/view/${useRoute().params.id}` : `/project/view/${useRoute().params.id}`
    useRouter().push({ path: forwardUrl })
  } catch (error) {
  }
}

onMounted(async () => {
  editor = await useEditor(formData.value.content)
})

</script>