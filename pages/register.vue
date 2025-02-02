<template>
	<div class="text-white bg-black relative w-screen h-screen overflow-hidden detail">
    <img src="@/assets/design/login.png" alt="login" class="object-cover w-full h-full">
    <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-[50%] md:top-[55%] left-[50%] drop-shadow-2xl w-[70%] md:w-[50%] lg:w-[25%] rounded-xl bg-opacity-5 bg-white">
			<div class="px-5 py-7">
				<label 
					:class="{ 'text-red-500': !isUsernameValid }"
					class="pb-1 block font-normal detail text-2xs md:text-base"
					>User Name <span class="text-sm text-red-600">*</span></label
				>
				<p v-if="!isUsernameValid" class="text-2xs md:text-sm text-red-500">
						영문 또는 영문+숫자로 구성되어야 합니다. (4-16자)
				</p>
				<input
					v-model="username"
					type="text"
					id="username"
					placeholder="영문 또는 영문+숫자 (4-16자)"
					:class="{ 'border-red-500': !isUsernameValid }"
					class="rounded bg-neutral-300 font-normal detail bg-opacity-20 px-3 py-2 mt-1 mb-5 text-sm w-full"
				/>
									
				<label 
						:class="{ 'text-red-500': !isEmailValid }"
						class="pb-1 block font-normal detail text-2xs md:text-base"
					>E-mail <span class="text-sm text-red-600">*</span></label
				>
				<p v-if="!isEmailValid" class="text-2xs md:text-sm text-red-500">
						이메일 형식에 맞게 입력바랍니다.
				</p>
				<input
					v-model="email"
					type="text"
					id="email"
					placeholder="예) test@example.com"
					:class="{ 'border-red-500': !isEmailValid }"
					class="rounded bg-neutral-300 font-normal detail bg-opacity-20 px-3 py-2 mt-1 mb-5 text-sm w-full"
				/>
				<label 
					:class="{ 'text-red-500': !isPasswordValid }"
					class="pb-1 block font-normal detail text-2xs md:text-base"
					>Password <span class="text-sm text-red-600">*</span></label
				>
				<p v-if="!isPasswordValid" class="text-2xs md:text-sm text-red-500">
						영문, 숫자, 특수문자를 조합해주세요. (8-32자)
				</p>
				<input
					v-model="password"
					type="password"
					id="password"
					placeholder="영문, 숫자, 특수문자 조합 (8-32자)"
					:class="{ 'border-red-500': !isPasswordValid }"
					class="rounded bg-neutral-300 font-normal detail bg-opacity-20 px-3 py-2 mt-1 mb-5 text-sm w-full"
				/>
				
				<label 
						:class="{ 'text-red-500': !isConfirmPasswordValid }"
						class="pb-1 block font-normal detail text-2xs md:text-base"
					>Password Check <span class="text-sm text-red-600">*</span></label
				>
				<p v-if="!isConfirmPasswordValid" class="text-2xs md:text-sm text-red-500">
						비밀번호가 일치하지 않습니다.
				</p>
				<input
					v-model="confirmPassword"
					type="password"
					id="confirmPassword"
					:class="{ 'border-red-500': !isConfirmPasswordValid }"
					class="rounded bg-neutral-300 font-normal detail bg-opacity-20 px-3 py-2 mt-1 mb-5 text-sm w-full"
				/>
				<div class="relative z-10">
					<button
						@click="submitLogin"
						type="button"
						class="transition duration-200 bg-red-600 hover:opacity-70 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md detail font-normal text-center inline-block mb-3"						>
						<span class="inline-block mr-2 text-2xs md:text-base">Register</span>
					</button>
				</div>
				<div v-if="alertMessage" class="fixed top-4 right-4 z-50 bg-red-500 text-white py-2 px-4 rounded">
					{{ alertMessage }}
					<button @click="closeAlert" class="ml-2 text-white hover:text-gray-100 focus:outline-none">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
							<path
								fill-rule="evenodd"
								d="M17.707 3.293a1 1 0 0 0-1.414 0L10 8.586 4.707 3.293a1 1 0 0 0-1.414 1.414L8.586 10l-5.293 5.293a1 1 0 0 0 1.414 1.414L10 11.414l5.293 5.293a1 1 0 0 0 1.414-1.414L11.414 10l5.293-5.293a1 1 0 0 0 0-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
        </div>
			</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  components: {},
  data: () => ({
		registerKey: '',
    username: '',
    password: '',
		confirmPassword: '',
		email: '',
		registerKey: '',
		computeFlag: {
			username: false,
			password: false,
			confirmPassword: false,
			email: false,
		},
		alertMessage: '',
	}),
	computed: {
		isUsernameValid() {
			const validateUsername = /^(?=.*[a-zA-Z])(?=.*\d)?[a-zA-Z0-9]{4,16}$/;
			if(this.username) this.computeFlag.username = true;
			return !this.computeFlag.username || validateUsername.test(this.username) 
		},
		isPasswordValid() {
			const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,32}$/;
			if(this.password) this.computeFlag.password = true;
			return !this.computeFlag.password || validatePassword.test(this.password) 
		},
		isEmailValid() {
			const validateEmail =  /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
			if(this.email) this.computeFlag.email = true;
			return !this.computeFlag.email || validateEmail.test(this.email) 
		},
		isConfirmPasswordValid() {
			if(this.confirmPassword) this.computeFlag.confirmPassword = true;
			return !this.computeFlag.confirmPassword || this.confirmPassword === this.password;
		}
	},
  methods: {
		closeAlert() {
			this.alertMessage = '';
		},
    submitLogin() {
			this.computeFlag.username = true;
			this.computeFlag.password = true;
			this.computeFlag.confirmPassword = true;
			this.computeFlag.email = true;

			if(!this.isConfirmPasswordValid || !this.isPasswordValid || !this.isEmailValid || !this.isUsernameValid)
			{
				const target = document.querySelector('#username');
				target.scrollIntoView({ behavior: 'smooth', block: 'center' })
				return;
			}
			
			
      $fetch(`${import.meta.env.VITE_API_URL}/auth/register?registerKey=${this.registerKey}`, {
        method: "POST",
        body: {
          username: this.username,
          password: this.password,
					email: this.email,
        },
        credentials: 'include'
      })
        .then((result) => {
					console.log(result);
          useRouter().push({ path: "/login" });
        })
        .catch((error) => {
					console.log(error);
					this.alertMessage = error.detail;
					console.log(this.alertMessage);
			});
    },

  },
};
</script>

<style scoped>

.detail {
  font-family: 'Detail', sans-serif;
}
</style>