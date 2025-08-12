<template>
  <div class="space-y-4 bg-white border rounded-lg p-6">
    <input v-model="title" class="border rounded px-3 py-2 w-full" placeholder="제목 (필수)" />
    <textarea v-model="description" class="border rounded px-3 py-2 w-full" rows="6" placeholder="설명" />

    <div>
      <label class="block text-sm mb-1">키워드</label>
      <div class="flex flex-wrap gap-2 mb-2">
        <span v-for="(k, i) in keywordsArr" :key="k + i" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border">
          {{ k }}
          <button type="button" class="ml-1 text-xs" @click="removeKeyword(i)">✕</button>
        </span>
      </div>
      <input
        v-model="keywordInput"
        @keydown="onKeywordKeydown"
        class="border rounded px-3 py-2 w-full"
        placeholder="키워드를 입력하고 Enter로 추가"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <input v-model="start_date" type="date" class="border rounded px-3 py-2" placeholder="시작일(필수)" />
      <input v-model="end_date" type="date" class="border rounded px-3 py-2" placeholder="종료일" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <input v-model="github_url" class="border rounded px-3 py-2 w-full" placeholder="GitHub URL" />
      <input v-model="demo_url" class="border rounded px-3 py-2 w-full" placeholder="Demo URL" />
    </div>

    <div class="space-y-2">
      <input v-model="panel_url" type="hidden" />
      <div class="flex items-center space-x-3">
        <input type="file" accept="image/*" @change="onPanelFileChange" />
        <span v-if="uploading" class="text-sm text-gray-400">업로드 중...</span>
      </div>
      <div v-if="panel_url" class="mt-2">
        <img :src="panel_url" alt="panel" class="max-h-48 rounded border" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <input v-model.number="gen" class="border rounded px-3 py-2 w-full" placeholder="기수 (숫자)" />
      <select v-if="showStatus" v-model="status" class="border rounded px-3 py-2">
        <option value="active">진행중</option>
        <option value="completed">완료</option>
        <option value="paused">중지</option>
      </select>
    </div>

    <div class="flex justify-end space-x-2">
      <button class="px-4 py-2 rounded-md bg-blue-600 text-white" @click="submit">{{ mode === 'edit' ? '저장' : '생성' }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  mode: { type: String, default: 'create' }, // 'create' | 'edit'
  showStatus: { type: Boolean, default: false }
});

const emit = defineEmits(['submit']);

const title = ref('');
const description = ref('');
const keywordsArr = ref([]);
const keywordInput = ref('');
const start_date = ref('');
const end_date = ref('');
const github_url = ref('');
const demo_url = ref('');
const panel_url = ref('');
const gen = ref(undefined);
const status = ref('active');

const uploading = ref(false);

const applyInitial = (p) => {
  title.value = p?.title || '';
  description.value = p?.description || '';
  keywordsArr.value = Array.isArray(p?.keywords) ? [...p.keywords] : [];
  start_date.value = p?.start_date ? String(p.start_date).substring(0, 10) : '';
  end_date.value = p?.end_date ? String(p.end_date).substring(0, 10) : '';
  github_url.value = p?.github_url || '';
  demo_url.value = p?.demo_url || '';
  panel_url.value = p?.panel_url || '';
  gen.value = p?.gen ?? undefined;
  status.value = p?.status || 'active';
};

watch(() => props.initial, (nv) => applyInitial(nv), { immediate: true });

const addKeywordFromInput = () => {
  const raw = (keywordInput.value || '').split(',').map(s => s.trim()).filter(Boolean);
  for (const r of raw) {
    if (!keywordsArr.value.includes(r)) {
      keywordsArr.value.push(r);
    }
  }
  keywordInput.value = '';
};

const removeKeyword = (index) => {
  keywordsArr.value.splice(index, 1);
};

const onKeywordKeydown = (e) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    addKeywordFromInput();
  }
};

const buildProjectImageUrl = (name) => {
  const base = import.meta.env.VITE_API_URL || '';
  return name ? `${base}/image/project/${name}` : '';
};

const onPanelFileChange = async (e) => {
  const file = e?.target?.files?.[0];
  if (!file) return;
  try {
    uploading.value = true;
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/image/upload/project`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('업로드 실패');
    const data = await res.json();
    panel_url.value = buildProjectImageUrl(data.url || data.name || data.id);
  } catch (err) {
    alert('이미지 업로드 실패: ' + (err?.message || err));
  } finally {
    uploading.value = false;
  }
};

const submit = () => {
  if (!title.value || !start_date.value) {
    alert('제목과 시작일은 필수입니다.');
    return;
  }
  const payload = {
    title: title.value,
    description: description.value || undefined,
    keywords: keywordsArr.value.length ? keywordsArr.value : undefined,
    start_date: start_date.value,
    end_date: end_date.value || undefined,
    github_url: github_url.value || undefined,
    demo_url: demo_url.value || undefined,
    panel_url: panel_url.value || undefined,
    gen: typeof gen.value === 'number' ? gen.value : undefined,
    ...(props.showStatus ? { status: status.value } : {})
  };
  emit('submit', payload);
};
</script>

<style scoped>
</style>


