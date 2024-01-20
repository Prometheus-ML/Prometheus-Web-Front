import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("auth", () => {
  let user = ref(null);
  let popup = ref(true);

  async function logout() {
    try {
      const URL = `${import.meta.env.VITE_API_URL}/auth/logout`;
      const response = await $fetch(URL, {
        method: "POST",
        credentials: "include",
      });
      if (response.message === "Success") {
        navigateTo("/login");

        user.value = null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function verify() {
    try {
      const URL = `${import.meta.env.VITE_API_URL}/auth/verify`;
      const response = await $fetch(URL, {
        method: "POST",
        credentials: "include",
      });
      user.value = response;
      console.log(user);
    } catch (error) {
      if (error.status == 401) console.log(error.status);
    }
    return user;
  }

  return { user, popup, verify, logout };
});
