import { defineStore } from 'pinia';
import axios from 'axios'
import jwt from "@/common/jwt";

export const useAuth = defineStore('auth', {
  namespaced: true,
  state: () => {
      return {
          accessToken: getAccessToken()
      }
  },
  getters: {},
  actions: {},
	
  });