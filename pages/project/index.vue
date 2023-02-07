<template>
	<NavBar></NavBar>
	
	<div class="container mx-auto pt-48">
		<div>
			<p class="font-bold text-5xl mb-9">PROJECT</p>
			<!-- <p class="text-end">Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br> Donec congue tincidunt massa, vel consequat ipsum pharetra nec. <br> Etiam vel congue urna, ut cursus nisi.</p> -->
		</div>
	</div>
	<div class="container mx-auto py-24">
		<div class="grid grid-cols-3 items-start gap-9">
			<div v-for="project in projectList" class="w-full">
				<nuxt-link :to="'/project/view/'+project.id">
					<!-- <div class="rounded-md w-full bg-gray-300 pb-[55%] mb-5"></div> -->
					<div class="text-left">
						<p class="max-h-16 text-ellipsis overflow-hidden font-medium text-2xl mb-2">{{ project.name }}</p>
						<p class="max-h-12 text-ellipsis overflow-hidden">{{ project.description }} </p>
					</div>
				</nuxt-link>
				<!-- <ul class="flex mt-5">
					<li v-for="tag in project.tag" class="rounded-md bg-red-100 text-red-900 text-sm px-3 py-1  mr-2">{{ tag }}</li>
				</ul> -->
			</div >
		</div>
	</div>

	<Footer></Footer>
</template>

<script>
import { useAuth } from "@/store"

export default {
	name: 'ProjectView',
	components: {},
	data: () => ({
		projectList: null,
	}),
	methods: {
    getProjectList() {
      $fetch(`${import.meta.env.VITE_API_URL}/project`, {
        method: 'GET',
        headers: {
          Authorization: useAuth().$state.accessToken
        }
      })
      .then((result) => {
          this.projectList = result
      })
      .catch((result) => {
      })
    }
	},
	computed: {
		tagList() {
			let tags = []
			this.projectList.forEach((project)=> {
				tags.push(...project.tag)
			})

			const set = new Set(tags)
			let uniqueTag = [...set]
			uniqueTag.sort()
			return uniqueTag
		}
	},
	mounted() {
    this.getProjectList()
  }
}
</script>
