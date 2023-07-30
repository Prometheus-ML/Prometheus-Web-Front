import { defineStore } from 'pinia';
import axios from 'axios'

export default defineStore('auth',  () => {
  let user = ref(null)
	function setAccessToken(token) {
		localStorage.setItem('accessToken', token)
	}
	function getAccessToken() {
		return localStorage.getItem('accessToken')
	}
	function deleteAccessToken() {
		localStorage.removeItem('accessToken')
	}
	
	async function logout() {
		try {
			const URL = `${import.meta.env.VITE_API_URL}/auth/logout`
			const response = await $fetch(URL, {
				method: "POST",
				credentials: 'include',
			})
			if (response.message === "Success") {
				navigateTo("/login")
				deleteAccessToken()
				user.value = null
			}
		} catch (error) {
			console.log(error)
			deleteAccessToken()
		}
	};
	
	async function checkAuth() {
		try {
			const accessToken = getAccessToken()
			const URL = `${import.meta.env.VITE_API_URL}/auth/checkAuth`
			const response = await $fetch(URL, {
				method: 'POST',
				body : { accessToken : accessToken},
				credentials : 'include',
			})
			user.value = response.username
			console.log(user.value)
			if(response.isValid) {
				//
			} else {
				if(response.newAccessToken)
					setAccessToken(response.newAccessToken)
				else {
					logout()
				}
			}
		} catch(error) {
			console.log(error)
		}
		return user
	}
	

	
  return { user, deleteAccessToken, getAccessToken, setAccessToken, checkAuth, logout }
})