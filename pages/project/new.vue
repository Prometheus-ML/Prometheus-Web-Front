<template>
  <div class="container min-h-screen text-white mx-auto pt-40 pb-24">
    <p class="font-bold text-3xl md:text-5xl mb-14">게시글 등록</p>
    <div class="gap-2">
      <div class="md:grid grid-cols-2 gap-2 md:gap-6">
        <!-- 기본 정보 -->
        <div class="w-full flex flex-col gap-2">
          <label>Title</label>
          <input class="bg-neutral-500 py-1 px-3 w-full" v-model="formData.title" />
          <label>Category</label>
          <select
            class="bg-neutral-500 cursor-pointer px-3 rounded-none text-white py-1 focus:outline-none"
            v-model="formData.domain"
          >
            <option class="px-2 py-1">Project</option>
            <option class="px-2 py-1">Study</option>
          </select>

          <label>Content</label>
          <input class="bg-neutral-500 py-1 px-3" v-model="formData.content" />

          <label>Github</label>
          <input class="bg-neutral-500 py-1 px-3" v-model="formData.github" />

          <label>Notion</label>
          <input class="bg-neutral-500 py-1 px-3" v-model="formData.notion" />
          <label>Tags</label>
          <input
            v-model="tagName"
            type="text"
            class="bg-neutral-500 text-white w-full py-1 px-3"
            placeholder="태그 입력 후 엔터를 눌러주세요"
            @keyup.enter="addTag(tagName)"
          />
          <div class="flex gap-2 flex-wrap">
            <div
              class="bg-white text-black rounded-xl px-2 flex items-center"
              v-for="(tag, index) in formData.tags"
            >
              <span class="px-1"><strong class="font-semibold">#</strong>{{ tag }}</span>
              <font-awesome-icon
                @click="removeTag(index)"
                class="ml-1 cursor-pointer"
                icon="fa-solid fa-xmark"
              />
            </div>
          </div>

          <label>Description</label>
          <textarea class="bg-neutral-500 py-1 mb-2 w-full h-16" v-model="formData.description"></textarea>
        </div>

        <!-- 추가 파일 필드 -->
        <div>
          <!-- PDF 업로드 -->
          <label>Project Panel (PDF)</label>
          <input type="file" accept=".pdf" @change="cacheFile($event, 'panel')" />

          <!-- 이미지 업로드 -->
          <label>Project Thumb (Image)</label>
          <input type="file" accept="image/*" @change="cacheFile($event, 'thumb')" />

          <!-- 동영상 업로드 -->
          <label>Video URL (Video)</label>
          <input type="file" accept="video/*" @change="cacheFile($event, 'video')" />

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

const formData = ref({
  title: '',
  description: '',
  domain: '',
  github: '',
  content: '',
  notion: '',
  tags: [],
});


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

// 파일 캐시
const projectPanelCache = ref('');
const projectThumbCache = ref('');
const videoCache = ref('');
const fileCache = {
  panel: projectPanelCache,
  thumb: projectThumbCache,
  video: videoCache,
};

// 파일 업로드 처리
async function uploadFile(file, fileType) {
  const form = new FormData();
  form.append('file', file);
  form.append('fileType', fileType);

  try {
    const response = await $api('/file/upload-drive', {
      method: 'POST',
      body: form,
    });
    return response.file_url; // Drive에 업로드된 URL 반환
  } catch (error) {
    console.error(`Failed to upload ${fileType}:`, error);
    return null;
  }
}

// 파일 캐시
function cacheFile(event, type) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    fileCache[type].value = reader.result; // 미리보기 캐시
  };
  reader.readAsDataURL(file);
}

// 게시글 제출
async function submitPost() {
  const postData = {
    ...formData.value,
    project_panel: null,
    project_thumb: null,
    videoURL: null,
  };

  try {
    // 파일 업로드
    if (projectPanelCache.value) {
      const panelURL = await uploadFile(projectPanelCache.value, 'panel');
      postData.project_panel = panelURL;
    }
    if (projectThumbCache.value) {
      const thumbURL = await uploadFile(projectThumbCache.value, 'thumb');
      postData.project_thumb = thumbURL;
    }
    if (videoCache.value) {
      const videoURL = await uploadFile(videoCache.value, 'video');
      postData.videoURL = videoURL;
    }

    // 게시글 전송
    const response = await $api('/post/new', {
      method: 'POST',
      body: JSON.stringify(postData),
    });

    console.log('게시글 업로드 성공:', response);
  } catch (error) {
    console.error('게시글 업로드 실패:', error);
  }
}
</script>
