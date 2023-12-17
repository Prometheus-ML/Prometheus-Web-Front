<template>
  <div v-if="errorMessage" class="flex place-items-center justify-center flex-col">
    <svg width="64" height="64" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#c11a1a" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm-1-4h2V7h-2v6Zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"/>
    </svg>   
    <p class="text-lg font-semibold text-red-600 mb-3">{{ errorMessage }}</p>
    <button @click="clickEvent()" class="hover:opacity-60 bg-neutral-200 shadow-2xl border border-black text-black px-4 py-1 rounded-lg">확인</button>
  </div>
</template>

<script setup>
const emits  = defineEmits('remove');

const props = defineProps({
  errorMessage: String,
})

function clickEvent() {
  emits('remove')
}

</script>