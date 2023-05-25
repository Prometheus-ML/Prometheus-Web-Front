import { defineStore } from 'pinia';

export default defineStore('auth',  () => {
  let user = ref()
  function fetchUser() {
    $api('/user/my', {
      method: 'GET',
    })
    .then((result)=>{
      user.value = result
    })
    .catch(error => null)
  }

  return { user, fetchUser }
});