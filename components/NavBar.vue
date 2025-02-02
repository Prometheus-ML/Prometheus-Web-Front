<template>
  <nav v-if="route !== '/login' && route !== '/register'"
    class="px-2 sm:px-4 py-3 bg-opacity-70 w-full fixed z-50 ease-out transition-all drop-shadow-xl"
    :class="{ 'shadow-2xl shadow-white/30 bg-black' : (background || !fold)}"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="/" class="flex items-center font-bold text-xl">
        <span class="prometheus text-rose-700">P</span><span class="prometheus">ROMETHEUS</span>
      </a>
      <button
        @click="fold = !fold"
        type="button"
        class="inline-flex items-center p-2 ml-auto text-base rounded-lg md:hidden"
      >
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div class="w-full md:block md:w-auto" :class="{ hidden: fold }">
        <ul
          class="flex flex-col mb-2 md:mb-0 md:p-2 mt-2 md:flex-row md:space-x-6 md:mt-0 md:text-base font-medium md:border-0"
        >
          <li
            v-for="nav in navList"
            :key="nav.path"
          >
            <nuxt-link @click="fold=true" :to="nav.path" class="prometheus block text-xl md:text-sm lg:text-xl py-2 pr-6 pl-4 hover:opacity-80 md:p-0 hover:-translate-y-0.5 hover:scale-105 duration-200">{{
              nav.name
            }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div v-if="user">
        <!-- fold 상태에 따른 LOGOUT 버튼 -->
        <button 
          v-if="route == '/admin' || route == '/profile'" 
          @click="authStore.logout(); fold = true;"
          
          :class="fold ? 'hidden md:block py-2 pr-6 md:pr-4 pl-4 rounded-3xl bg-[#B91C1C] md:px-4 md:py-1' : 'ml-2 py-1 px-2 bg-[#B91C1C] text-white rounded'"
          class="hover:opacity-80 relative hover:-translate-y-0.5 hover:scale-105 duration-200 prometheus"> 
          LOGOUT
        </button>

        <!-- fold 상태에 따른 ADMIN 버튼 -->
        <button 
          v-else-if="user.grant === 'admin'" 
          @click="navigateTo('/admin');fold=true"
          :class="fold ? 'hidden md:block py-2 pr-6 md:pr-4 pl-4 rounded-3xl bg-[#ffffff] text-black md:px-4 md:py-1' : 'ml-2 py-1 px-2 bg-[#ffffff] text-black rounded'"
          class="hover:opacity-80 relative hover:-translate-y-0.5 hover:scale-105 duration-200 prometheus">
          ADMIN
        </button>

        <!-- fold 상태에 따른 PROFILE 버튼 -->
        <button 
          v-else 

          @click="navigateTo('/profile'); fold=true"
          :class="fold ? 'hidden md:block py-2 pr-6 md:pr-4 pl-4 rounded-3xl bg-[#ffffff] text-black md:px-4 md:py-1' : 'ml-2 py-1 px-2 bg-[#B91C1C] text-white rounded'"
          class="hover:opacity-80 relative hover:-translate-y-0.5 hover:scale-105 duration-200 prometheus">
          PROFILE
        </button>
      </div>

      <!-- 로그인 버튼 (user가 없는 경우) -->
      <div v-else :class="user ? 'hidden md:block' : 'block'">
        <button 

          @click="navigateTo('/login'); fold=true"
          :class="fold ? 'hidden md:block py-2 pr-6 md:pr-3 pl-3 rounded-3xl bg-[#B91C1C] md:px-4 md:py-1' : 'ml-2 py-1 px-2 bg-[#B91C1C] text-white rounded'"
          class="hover:opacity-80 relative hover:-translate-y-0.5 hover:scale-105 duration-200 prometheus">
          LOGIN
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, watchEffect } from 'vue';
import { useAuthStore } from '@/composables/useAuthStore';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);


const profileMenuOpen = ref(false)
const navList = [
  {
    path: "/about",
    name: "ABOUT US",
  },
  {
    path: "/project",
    name: "PROJECT",
  },
  {
    path: "/members",
    name: "MEMBERS",
  },
  {
    path: "/blog",
    name: "BLOG"
  },
]
let background = ref(false)
let fold = ref(true)


const handleScroll = () => {
	scrollPosition.value = window.scrollY * 0.001;
}

const scrollPosition = ref(0);
const showNav = ref(true);
const route = ref(null);


onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  watchEffect(() => {
    route.value = useRoute().path;
  });
});

onBeforeMount(async () => {
  document.addEventListener('mouseup', function(e) {
    var container = document.getElementById('profileMenu');
    if (!container?.contains(e.target)) {
      profileMenuOpen.value = false
    }
  })

  document.addEventListener("scroll", (e) => {
    if (document.scrollingElement.scrollTop > 5) {
      background.value = true
    } else {
      background.value = false
    }
  })

  window.addEventListener("resize", (e) => {
    fold.value = true
  })
})



</script>

<style>
.router-link-active {
  color: #b91c1c;
  font-weight: 800;
}

.prometheus {
  font-family: 'Prometheus', sans-serif;
}

.selected {
  color: #b91c1c;
}
</style>