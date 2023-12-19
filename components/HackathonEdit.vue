<template>
  <div v-if="post" class="absolute w-[100%] h-[92%] overflow-y-scroll">
    <Error @remove="errorMessage = null" class="absolute w-[80%] h-[30%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-rose-200 z-10 cursor-pointer opacity-100"  v-if="errorMessage" :errorMessage="errorMessage"/>
    <div class="mb-14 container mx-auto" :class="{'opacity-10' : errorMessage }">
      <div class="p-2 md:grid md:grid-cols-2 gap-1 place-items-center justify-between">
        <div class="cursor-pointer rounded-full flex items-center text-white mt-1">
          <div
            @click="post.done = false"
            :class="{ 'hover:opacity-50 text-neutral-700 bg-neutral-800': post.done, 'bg-rose-500': !post.done }"
            class="shadow-2xl rounded-l-full py-1 px-5 font-bold text-xs md:text-lg"
          >
            모집중
          </div>  
          <div
            @click="post.done = true"
            :class="{ 'hover:opacity-50 text-neutral-500 bg-neutral-800 ': !post.done, 'bg-neutral-500': post.done }"
            class="shadow-2xl rounded-r-full py-1 px-5 font-bold text-xs md:text-lg mr-2"
          >        
            모집완료
          </div>
        </div>
        <div class="flex place-items-center mt-1">
          <p class="text-sm md:text-2xl font-bold mr-2">제목</p>
          <input 
            v-model="post.title"
            type="text"
            class="w-full border rounded text-black bg-netural-500 py-1 px-2" 
            placeholder="1-20자"
            maxlength="20"
            required
          >
        </div>
      </div>

      <div class="border-white border-b p-1"></div>
      <div class="grid grid-cols-4">
        <!-- 모집 역할 -->
        <div class="text-sm md:text-2xl font-bold px-1 rounded-b justify-center items-center flex my-1 py-4 col-span-1">
          <p class="mb-2">모집 역할</p>
        </div>
        <div class="flex flex-col grid grid-cols-2 md:grid-cols-3 mt-2 col-span-3 gap-x-2">
          <div v-for="(role, index) in roles" :key="index" class="mb-2">
            <label class="text-sm md:text-xl font-semibold flex items-center">
              <input
                type="checkbox"
                v-model="post.h_tag"
                :value="role"
                class="mr-2"
              />
              {{ role.name }}
            </label>
          </div>
        </div>
        
        
       


        <!-- 모집 인원 -->
        <div class="text-sm md:text-2xl font-bold px-1 rounded justify-center items-center flex my-1 py-4 col-span-1">
          <p class="mb-2">모집 인원</p>
        </div>
        <div class="col-span-1 my-4 flex flex-row">
          <input 
          v-model="post.personnel"
          type="number"
          class="border rounded text-black md:py-1 bg-netural-500 mr-1 w-16 px-1" 
          placeholder="1-4명"
          min="1"
          max="4"
          required>
        </div>
        
        <div class="col-span-2 my-4"></div>
        <!-- 연락 방법 -->
        <div class="text-sm md:text-2xl font-bold px-1 rounded justify-center items-center flex my-1 py-4 col-span-1">
          <p class="mb-2">연락 방법</p>
        </div>
        <input 
          v-model="post.contact"
          type="text"
          class="border rounded text-black md:py-1 bg-netural-500 col-span-3 my-4 px-1" 
          placeholder="1-50자 (메일, 오픈챗 주소 등)"
          maxlength="50"
          required>

        <!-- 상세 내용 -->
        <div class="text-sm md:text-2xl font-bold px-1 rounded-t justify-center items-center flex my-1 py-4 col-span-1">
          <p class="mb-2">상세 내용</p>
        </div>
        <div class="col-span-3 py-4 mb-5">
          <div class="editor-container rounded">
            <div id="editor" class="bg-white"></div>
          </div>
        </div>
      </div>
      <div class="border-white border-t p-1"></div>
      <!-- 전화번호 및 인증번호란 -->
      <div class="grid grid-cols-3 md:grid-cols-6 gap-x-2">
        <div class="text-sm md:text-2xl font-bold px-1 py-1 md:col-span-2">
          <p class="mb-2">전화번호</p>
        </div>
        <div class="flex flex-col py-1 col-span-2 md:col-span-4">
          <label class="align-items-center relative mb-3">
            <input 
              v-model="tel"
              type="text"
              class="w-full border rounded md:py-1 text-black px-3" 
              placeholder="- 제외"
              maxlength="11"
              required
            >
            <button v-if="!editMode" @click="sendCode(tel)" class="hover:opacity-60 absolute top-1/2 transform -translate-y-1/2 right-1 px-1 rounded bg-black text-sm text-white border">전송</button>
          </label>
          
         
        </div>
        <div v-if="!editMode" class="text-sm md:text-2xl font-bold px-1 py-1 md:col-span-2">
          <p class="mb-2">인증번호</p>
        </div>
        <div v-if="!editMode" class="col-span-2 md:col-span-4">
          <div class="flex flex-col py-1 ">
            <label class="align-items-center relative mb-3">
              <p v-if="verifyTimer !== -1" class="absolute -bottom-5">남은 시간 [{{ Math.floor(verifyTimer / 60) }} : {{ verifyTimer % 60 }}]</p>
              <input 
                v-model="code"
                type="text"
                class="w-full border rounded md:py-1 text-black px-3" 
                placeholder="6자리"
                maxlength="6"
                required>
              <button v-if="!isVerified" @click="verifyCode(code)" class="hover:opacity-60 absolute top-1/2 transform -translate-y-1/2 right-1 px-1 rounded bg-black text-sm text-white border">인증</button>
              <div v-if="isVerified" class="opacity-70 absolute top-1/2 transform -translate-y-1/2 right-1 px-1 rounded bg-black text-sm text-white border">완료</div>
            </label>
          </div>
        </div>
 
        <div class="text-sm md:text-2xl font-bold px-1 py-1 md:col-span-2">
          <p class="mb-2">비밀번호</p>
        </div>
        <div class="flex flex-col py-1 col-span-2 md:col-span-4">
          <label class="align-items-center relative mb-3">
            <input 
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full border rounded md:py-1 text-black px-3" 
              placeholder="1-10자"
              maxlength="10"
              required
            >
            <div class="text-black cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-1 px-1 ">
              <font-awesome-icon v-if="!showPassword" @click="showPassword = !showPassword" icon="fa-solid fa-eye-slash" />
              <font-awesome-icon v-if="showPassword" @click="showPassword = !showPassword" icon="fa-solid fa-eye" />
            </div>
          </label>
        </div>
      </div>
      
      <div class="mt-1 text-xs md:text-base text-black">
        <client-only>
          <button v-if="editMode" @click="edit" class="bg-neutral-100 py-1 px-3 border rounded mr-2">
            수정
          </button>
          <button v-if="editMode" @click="deletePost" class="bg-neutral-100 py-1 px-3 border rounded mr-2">
            삭제
          </button>
          <button v-if="!editMode" @click="save" class="bg-neutral-100 py-1 px-3 border rounded mr-2">
            등록
          </button>
          <button v-if="editMode && user" @click="deleteByAdmin" class="bg-neutral-100 py-1 px-3 border rounded mr-2">
            삭제(관리자)
          </button>
        </client-only>
      </div>

    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import _ from "lodash"
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import '@toast-ui/editor/dist/toastui-editor.css'
const { user } = useAuthStore();


const props = defineProps({
  post: Object,
  id: Number,
  editMode: Boolean,
})

const emits = defineEmits(['closePost']);

let editor = null

const post = ref({h_tag: []})
const editMode = props.editMode


const tel = ref()
const password = ref()
const errorMessage = ref()
const verifyTimer = ref(-1)
const code = ref()
const isVerified = ref(false)
const showPassword = ref(false);

const roles = [
  { name: '프론트엔드' },
  { name: '백엔드' },
  { name: 'AI' },
  { name: 'PM' },
  { name: '디자이너' },
  { name: '기타' },
];


function checkProperties () {
  if (!tel.value || !password.value || tel.value.length !== 11 || password.value.length == 0) {
    errorMessage.value  = "비밀번호 및 전화번호를 올바르게 입력하세요."
    return false;
  }
  if (!post.value.title || post.value.title.length === 0 || post.value.title.length > 20) {
    errorMessage.value = "제목을 20자 내로 입력하세요."
    return false;
  }
  if(!post.value.h_tag || post.value.h_tag.length == 0) {
    errorMessage.value = "모집 역할을 최소 하나 선택해주세요."
    return false;
  }
  if(!post.value.personnel || post.value.personnel == 0 || post.value.personnel > 4) {
    errorMessage.value = "모집 인원을 1~4명으로 설정해주세요."
    return false;
  }
  if(!post.value.contact || post.value.contact.length === 0 || post.value.contact.length > 50) {
    errorMessage.value = "연락 방법을 50자 내로 입력하세요."
    return false;
  }
  if(!post.value.content || post.value.content.length === 0 ) {
    errorMessage.value = "상세 내용을 적어주세요."
    return false;
  }
  return true;
}

async function save() {
  try {
    post.value.content = editor?.getMarkdown();
    post.value.tel = tel.value;
    post.value.password = password.value;
    post.value.done = false;
    if (!checkProperties()) return;
    post.value.h_tag.sort((a, b) => roles.findIndex(role => role.name === a.name) - roles.findIndex(role => role.name === b.name));
    
    const result = await $api(`/hackathon/new?tel=${tel.value}&password=${password.value}`, {
      method: 'POST',
      body: post.value
    })
    emits('closePost');
  } catch (error) {
    console.log(error)
    if(error.status == 401) errorMessage.value = "전화번호를 인증해주신 후에 글을 등록해주세요."
    else if(error.status == 400) errorMessage.value = "해당 전화번호로 등록된 글이 이미 존재합니다."
  } 
}

async function edit() {
  try {
    post.value.content = editor?.getMarkdown();
    if (!checkProperties()) return;
    post.value.h_tag.sort((a, b) => roles.findIndex(role => role.name === a.name) - roles.findIndex(role => role.name === b.name));
    
    const response = await $api(`/hackathon/update?tel=${tel.value}&password=${password.value}`, {
      method: 'PUT',
      body: post.value
    })
    
    emits('closePost');
  } catch (error) {
    console.log(error)
    if(error.status == 401) {
      errorMessage.value = "게시글의 전화번호와 비밀번호를 확인해주세요."
    }
  }
}

const deletePost = async () => {
  try {
    const response = await $api(`/hackathon/delete/${props?.id}?tel=${tel.value}&password=${password.value}`, {
      method: 'DELETE',
    })
    emits('closePost');

  } catch (error) {
    if(error.status == 401) {
      errorMessage.value = "게시글의 전화번호와 비밀번호를 확인해주세요."
    }
  }
}

const deleteByAdmin = async () => {
  try {
    const response = await $api(`/hackathon/delete-by-admin/${props?.id}`, {
      method: 'DELETE',
    })
    emits('closePost');

  } catch (error) {
    if(error.status == 401) {
      errorMessage.value = "관리자 권한이 없습니다."
    }
  }
}



const getPost = async () => {
  try {
    const response = await $api(`/hackathon/${props?.id}`, {
      method: 'GET',
    })
    post.value = response;
  } catch (error){
  }
}


async function sendCode(telStr){
  if (!telStr || telStr.length !== 11) { 
    errorMessage.value = "올바른 전화번호 형식을 지켜주세요."
    return;
  }
  try {
    const response = await $api(`/hackathon/send-verification-code?tel=${tel.value}`, {
      method: 'POST',
    })
    verifyTimer.value = 180;
    const timer = setInterval(() => {
      if (verifyTimer.value > 0) {
        verifyTimer.value--;
      } else {
        clearInterval(timer.value);
      }
    }, 1000);

  } catch (error){
    if(error.status == 400) errorMessage.value="일일 인증 횟수 제한을 초과했습니다 (5/5)."
    if(error.status == 500) errorMessage.value="알 수 없는 오류가 발생했습니다."
  }
}

async function verifyCode(codeStr){
  const num = Number(codeStr)
  try {
    const response = await $api(`/hackathon/verify-code?tel=${tel.value}&code=${num}`, {
      method: 'POST',
    })
    isVerified.value = true;
  } catch (error){
    if(error.status == 400) errorMessage.value="인증에 실패하였습니다."

  }
}




onMounted(async () => {
  if(props.id) {
    await getPost();
    editor = await useHackathonEditor(post.value.content)
  } else {
    editor = await useHackathonEditor('')
  }
})

</script>

<style>


</style>
