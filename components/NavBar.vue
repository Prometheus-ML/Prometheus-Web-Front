<template>
  <nav
    class="border-gray-200 px-2 sm:px-4 py-2.5 bg-transparent w-full fixed z-50 ease-out transition-all drop-shadow-xl"
    :class="{ '!bg-gray-50': background || !fold }"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="/" class="flex items-center font-bold text-xl text-rose-700">
        PROMETHEUS
      </a>
      <button
        @click="fold = !fold"
        type="button"
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
          class="flex flex-col md:p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-base font-medium md:border-0"
        >
          <li
            v-for="nav in navList"
            :key="nav.path"
          >
            <nuxt-link v-if="!nav.subNav" :to="nav.path" class="block py-2 pr-4 pl-4 md:p-0 hover:-translate-y-0.5 hover:scale-110 duration-200">{{
              nav.name
            }}</nuxt-link>
						<div v-if="nav.subNav" @mouseenter="nav.subNavOpen = true" @mouseleave="nav.subNavOpen = false "
							class="relative block py-2 pr-4 pl-4 md:p-0 hover:-translate-y-0.5 hover:scale-110 duration-200"
						>
							<a>
								{{ nav.name }}
							</a>
							<div
								v-if="nav.subNavOpen"
								@mouseenter="nav.subNavOpen = true"
								@mouseleave="nav.subNavOpen = false"
								class="absolute border right-0 w-32 font-normal rounded-lg z-100 bg-white"
							>
								<div v-for="nav in nav.subNav"
										 :key="nav.path"
								>
									<div class="py-2">
										<nuxt-link :to="nav.path" class="block px-3 py-2 text-sm">{{ nav.name }}</nuxt-link>
									</div>
								</div>
							</div>
						</div>
						
          </li>
          <!-- <div v-if="user" class="block py-2 pr-4 pl-4 md:p-0 relative hover:-translate-y-0.5 hover:scale-105 duration-200">
						<button @click="profileMenuOpen = !profileMenuOpen">
							{{ user }}
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
						<nuxt-link to="/login">로그인</nuxt-link>
					</div> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)


const profileMenuOpen = ref(false)
const navList = ref([
  {
    path: "/",
    name: "홈",
		subNav: null,
		subNavOpen: false
  },
  {
    path: "/tmember",
    name: "소개",
		subNav: [
			{
				path: "/tmember",
				name: "동아리",
			},
			{
				path: "/tmember/executives",
				name: "멤버",
			}
		],
		subNavOpen: false
  },
  {
    path: "/tproject",
    name: "프로젝트",
		subNav: null,
		subNavOpen: false
  },
  {
    path: "/tblog",
    name: "블로그",
		subNav: [
			{
				path: "/tblog",
				name: "소식",
			},
			{
				path: "/sponsor",
				name: "후원사",
			},
		],
		subNavOpen: false
  },
  {
    path: "/hackathon",
    name: "해커톤",
		subNav: null,
		subNavOpen: false
  },
	// {
	// path: "/hackathon",
	// name: "해커톤",
	// },
	// {
	// path: "/support",
	// name: "후원",
	// }
])

let background = ref(false)
let fold = ref(true)

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
/* .router-link-active {
  color: #b91c1c;
} */
</style>