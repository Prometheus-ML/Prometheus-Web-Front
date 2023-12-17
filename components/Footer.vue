<template>
  <div :class="{ 'bg-slate-200' : route !== '/hackathon', 'bg-neutral-900': route === '/hackathon' }">
    <div class="container py-7 mx-auto text-center">
      <!-- Community Section -->
      <div class="mb-2 flex justify-center items-center">
        <a class="mx-3 text-3xl" :class="{ 'text-slate-200': route === '/hackathon' }" href="https://github.com/Prometheus-ML" target="_blank">
          <font-awesome-icon icon="fa-brands fa-github" />
        </a>
        <a class="mx-3 text-3xl" :class="{ 'text-slate-200': route === '/hackathon' }" href="https://www.instagram.com/prometheus_ai_/" target="_blank">
          <font-awesome-icon :icon="['fa-brands', 'fa-instagram']" />
        </a>
        <a class="mx-3 text-3xl" :class="{ 'text-slate-200': route === '/hackathon' }" href="https://discord.gg/S3WNhcE7Sf" target="_blank">
          <font-awesome-icon :icon="['fab', 'discord']" />
        </a>
        <a class="mx-3 text-3xl" :class="{ 'text-slate-200': route === '/hackathon' }" href="mailto:prometheus0513@gmail.com" target="_blank">
          <img v-if="route === '/hackathon'" src="@/assets/gmail_dark.png" alt="gmail" class="h-9 w-9" />
          <img v-else src="@/assets/gmail.png" alt="gmail" class="h-9 w-9" />
        </a>
        <a class="mx-3 text-3xl" :class="{ 'text-slate-200': route === '/hackathon' }" href="https://open.kakao.com/o/gT46CeMf" target="_blank">
          <img v-if="route === '/hackathon'" src="@/assets/kakao_dark.png" alt="kakao" class="h-8 w-8" />
          <img v-else src="@/assets/kakao.png" alt="kakao" class="h-8 w-8" />
        </a>
      </div>

      <p class="mt-4" :class="{ 'text-slate-200': route == '/hackathon' }">© Prometheus 2023. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';


const route = ref()

onMounted(() => {
  watchEffect(() => {
    route.value = useRoute().path
    console.log(route.value)
  });
});

// Add any additional setup logic if needed
</script>
