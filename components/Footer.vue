<template>
  <div v-if="showFoot" class="bg-neutral-black text-slate-200">
    <div class="container detail py-5 mx-auto text-center">
      <!-- Community Section -->
      <div class="mb-2 flex justify-center items-center">
        <a class="mx-3 md:text-3xl" href="https://github.com/orgs/Prometheus-AI-Project/dashboard" target="_blank">
          <font-awesome-icon icon="fa-brands fa-github" />
        </a>
        <a class="mx-3 md:text-3xl" href="https://discord.gg/JBZEXXTfkE" target="_blank">
          <font-awesome-icon :icon="['fab', 'discord']" />
        </a>
        <a class="mx-3 md:text-3xl" href="https://www.instagram.com/prometheus_ai_/" target="_blank">
          <font-awesome-icon :icon="['fa-brands', 'fa-instagram']" />
        </a>
        <a class="mx-3 text-3xl" href="https://pf.kakao.com/_erQxnG" target="_blank">
          <img src="@/assets/kakao_dark.png" alt="kakao" class="h-4 w-4 md:h-8 md:w-8" />

        </a>
        <a class="mx-3 text-3xl" href="mailto:prometheus0513@gmail.com" target="_blank">
          <img src="@/assets/gmail_dark.png" alt="gmail" class="h-4 w-4 md:h-9 md:w-9" />

        </a>

      </div>

      <p class="text-xs md:text-base my-2 md:my-4" :class="{ 'text-slate-200': route == '/hackathon' }">© Prometheus 2024. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';


const route = ref()
const showFoot = ref(true)

onMounted(() => {
  watchEffect(() => {
    route.value = useRoute().path
    if(route.value == '/auth/login' || route.value == '/register') {
      showFoot.value = false;
    } else {
      showFoot.value = true;
    }
  });
});

// Add any additional setup logic if needed
</script>
