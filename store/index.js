import { defineStore } from 'pinia';
import jwt from "@/common/jwt"

export const useAuth = defineStore('auth', {
  namespaced: true,
  state: () => {
      return {
          accessToken: jwt.getToken(),
      }
  },
  getters: {},
  mutations: {},
  actions: {},
});