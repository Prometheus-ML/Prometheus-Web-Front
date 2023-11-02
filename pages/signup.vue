<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <div class="bg-white shadow w-full rounded divide-y divide-gray-200">
        <div class="px-5 py-7">
          <label 
						:class="{ 'text-red-500': !isUsernameValid }"
						class="font-semibold text-sm text-gray-600 pb-1 block"
            >유저이름 <span class="text-sm text-red-600">*</span></label
          >
					<p v-if="!isUsernameValid" class="text-sm text-red-500">
							영문 또는 영문+숫자로 구성되어야 합니다. (4-16자)
					</p>
          <input
            v-model="username"
            type="text"
						id="username"
						placeholder="영문 또는 영문+숫자 (4-16자)"
					 :class="{ 'border-red-500': !isUsernameValid }"
            class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full"
          />
										
					<label 
						 :class="{ 'text-red-500': !isEmailValid }"
						 class="font-semibold text-sm text-gray-600 pb-1 block"
            >이메일 <span class="text-sm text-red-600">*</span></label
          >
					<p v-if="!isEmailValid" class="text-sm text-red-500">
							이메일 형식에 맞게 입력바랍니다.
					</p>
          <input
            v-model="email"
            type="text"
					  id="email"
					  placeholder="예) test@example.com"
					  :class="{ 'border-red-500': !isEmailValid }"
            class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full"
          />
					<label 
						:class="{ 'text-red-500': !isPasswordValid }"
						class="font-semibold text-sm text-gray-600 pb-1 block"
            >비밀번호 <span class="text-sm text-red-600">*</span></label
          >
					<p v-if="!isPasswordValid" class="text-sm text-red-500">
							영문, 숫자, 특수문자를 조합해주세요. (8-32자)
					</p>
          <input
            v-model="password"
            type="password"
					  id="password"
						placeholder="영문, 숫자, 특수문자 조합 (8-32자)"
						:class="{ 'border-red-500': !isPasswordValid }"
            class="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full"
          />
					
          <label 
						 :class="{ 'text-red-500': !isConfirmPasswordValid }"
						 class="font-semibold text-sm text-gray-600 pb-1 block"
            >비밀번호 확인 <span class="text-sm text-red-600">*</span></label
          >
					<p v-if="!isConfirmPasswordValid" class="text-sm text-red-500">
							비밀번호가 일치하지 않습니다.
					</p>
          <input
            v-model="confirmPassword"
            type="password"
					  id="confirmPassword"
						:class="{ 'border-red-500': !isConfirmPasswordValid }"
            class="border rounded px-3 py-2 mt-1 mb-10 text-sm w-full"
          />					
					<div class="relative z-10">
						<button
							@click="submitLogin"
							type="button"
							class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
							>
							<span class="inline-block mr-2">회원가입</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								class="w-4 h-4 inline-block"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const registerKey = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const email = ref('');
const alertMessage = ref('');
const computeFlag = {
  username: ref(false),
  password: ref(false),
  confirmPassword: ref(false),
  email: ref(false),
};

const isUsernameValid = computed(() => {
  const validateUsername = /^(?=.*[a-zA-Z])(?=.*\d)?[a-zA-Z0-9]{4,16}$/;
  return !computeFlag.username.value || validateUsername.test(username.value);
});

const isPasswordValid = computed(() => {
  const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,32}$/;
  return !computeFlag.password.value || validatePassword.test(password.value);
});

const isEmailValid = computed(() => {
  const validateEmail = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
  return !computeFlag.email.value || validateEmail.test(email.value);
});

const isConfirmPasswordValid = computed(() => {
  return !computeFlag.confirmPassword.value || confirmPassword.value === password.value;
});

const closeAlert = () => {
  alertMessage.value = '';
};

const submitLogin = () => {
  computeFlag.username.value = true;
  computeFlag.password.value = true;
  computeFlag.confirmPassword.value = true;
  computeFlag.email.value = true;

  if (!isConfirmPasswordValid.value || !isPasswordValid.value || !isEmailValid.value || !isUsernameValid.value) {
    const target = document.querySelector('#username');
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  $fetch(`${import.meta.env.VITE_API_URL}/auth/register?registerKey=${registerKey.value}`, {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
      email: email.value,
    },
    credentials: 'include',
  })
    .then((result) => {
      console.log(result);
      useRouter().push({ path: '/login' });
    })
    .catch((error) => {
      console.log(error);
      alertMessage.value = error.detail;
      console.log(alertMessage.value);
    });
};
</script>