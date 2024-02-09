<template>
  <nav
    class="px-2 sm:px-4 py-2.5 bg-transparent w-full fixed z-50 ease-out transition-all drop-shadow-xl"
    :class="{ 'border-white border-b !bg-black' : (background || !fold)}"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="/" class="flex font-sans items-center font-bold text-xl">
        <span class="text-rose-700">P</span><span :class="{'text-white': (!background && fold) && darkNav !== 'false' || darkNav === 'all'}">ROMETHEUS</span>
      </a>
      <button
        @click="fold = !fold"
        type="button"
        :class="{ 'text-white' :  (!background && fold) && darkNav !== 'false' || darkNav === 'all' }"
        class="inline-flex items-center p-2 ml-3 text-base rounded-lg md:hidden"
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
          class="flex flex-col md:p-2 mt-2 md:flex-row md:space-x-8 md:mt-0 md:text-base font-medium md:border-0"
        >
          <li
            v-for="nav in navList"
            :key="nav.path"
          >
            <nuxt-link :to="nav.path" class="block py-2 pr-4 pl-4 md:p-0 hover:-translate-y-0.5 hover:scale-105 duration-200">{{
              nav.name
            }}</nuxt-link>
          </li>
        </ul>
      </div>
      <!-- <div v-if="user" class="block py-2 pr-4 pl-4 md:p-0 relative hover:-translate-y-0.5 hover:scale-105 duration-200">
        <button @click="profileMenuOpen = !profileMenuOpen">
          {{ user.username }}
        </button>
        <div
          id="profileMenu"
          v-show="profileMenuOpen"
          @mouseenter="profileMenuOpen = true"
          @mouseleave="profileMenuOpen = false"
          class="absolute border right-0 mt-5 w-48 font-normal rounded-lg z-100 bg-white"
        >
          <div class="py-2">
            <nuxt-link to="/profile" class="block px-3 py-2">프로필 관리</nuxt-link>
          </div>
          <div class="py-2">
            <nuxt-link to="/admin" class="block px-3 py-2">관리자 페이지</nuxt-link>
          </div>
          <hr>
          <div class="py-2">
            <button class="block px-3 py-2" @click="authStore.logout">로그아웃</button>
          </div>
        </div>
      </div>
      <div v-else class="block py-2 pr-4 pl-4 md:p-0 relative hover:-translate-y-0.5 hover:scale-105 duration-200">
        <nuxt-link to="/signin">로그인</nuxt-link>
      </div> -->
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)
	
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
    path: "/blog",
    name: "BLOG",
  },
  {
    path: "/hackathon",
    name: "HACKATHON"
  },
  {
    path: "/recruit",
    name: "RECRUIT"
  },
]
let background = ref(false)
let fold = ref(true)

const darkNav = ref(false);
const handleScroll = () => {
	scrollPosition.value = window.scrollY * 0.001;
}

const scrollPosition = ref(0);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  watch(() => {
    const currentNav = navList.find(nav => nav.path == useRoute().path);
    if(currentNav) darkNav.value = currentNav.dark;
    else if (useRoute().path == '/') darkNav.value = 'true'
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
</style>