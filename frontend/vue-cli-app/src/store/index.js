import { createStore } from 'vuex'
import router from '@/router'

export default createStore({
  state: {
    isAuth: false,
  },

  getters: {
  },

  mutations: {
  },

  actions: {
    onLogin(context) {
      context.state.isAuth = true;
      router.push('posts');
    },

    onLogout(context) {
      context.state.isAuth = false;
    },

    // onSignup(context, email, password) {
    //   try {
    //     let response = await fetch('http://localhost:3000/api/auth/signup', {
    //       method: 'POST',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ email, password })
    //     })
    //     if (response.ok) {
    //       return response.json()
    //     }
    //   }
    //   catch (err) {
    //     console.log('Erreur ' + err)
    //   }
    // }
  },

  modules: {
  }
})
