<template>
  <div class="bg-neutral-900 text-slate-200">
    <div class="container py-7 mx-auto  text-center">
      <!-- Community Section -->
      <div class="mb-2 flex justify-center items-center">
        <a class="mx-3 text-3xl" href="https://github.com/orgs/Prometheus-AI-Project/dashboard" target="_blank">
          <font-awesome-icon icon="fa-brands fa-github" />
        </a>
        <a class="mx-3 text-3xl" href="https://www.instagram.com/prometheus_ai_/" target="_blank">
          <font-awesome-icon :icon="['fa-brands', 'fa-instagram']" />
        </a>
        <a class="mx-3 text-3xl" href="https://discord.gg/JBZEXXTfkE" target="_blank">
          <font-awesome-icon :icon="['fab', 'discord']" />
        </a>
        <a class="mx-3 text-3xl" href="mailto:prometheus0513@gmail.com" target="_blank">
          <img src="@/assets/gmail_dark.png" alt="gmail" class="h-9 w-9" />

        </a>
        <a class="mx-3 text-3xl" href="https://pf.kakao.com/_erQxnG" target="_blank">
          <img src="@/assets/kakao_dark.png" alt="kakao" class="h-8 w-8" />

        </a>
      </div>

      <p class="mt-4" :class="{ 'text-slate-200': route == '/hackathon' }">© Prometheus 2024. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';


const route = ref()

onMounted(() => {
  watchEffect(() => {
    route.value = useRoute().path
  });
});

// Add any additional setup logic if needed
</script>
