<template>
  <div v-if="popup" class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Popup Container -->
    <div class="absolute top-1/4 left-1/4 md:left-1/4 lg:w-1/4 w-[40%] bg-white border rounded p-8">
      <!-- Close Button -->
      <button @click="closePopup" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Popup Content -->
      <div>
        <img src="@/assets/images/codeit/11.png" class="object-cover mb-4">

        <!-- 다시 보지 않기 체크박스 -->
        <label class="flex items-center space-x-2">
          <input @click="closeEverPopup" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600">
          <span class="text-gray-700">다시 보지 않기</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
const popup = ref(true);

function closePopup() {
  popup.value = false;
}

function closeEverPopup() {
  window.localStorage.setItem('popup', true);
  popup.value = false;
}

onMounted(() => {
  if (window.localStorage.getItem('popup')) popup.value = false;
});
</script>