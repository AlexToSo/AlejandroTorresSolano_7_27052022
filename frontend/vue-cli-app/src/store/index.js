import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuth: false,
    token: "",
    user_id: 0
  },

  getters: {
  },

  mutations: {
    SAVE_AUTH(state, [token, user_id]) {
      state.token = token;
      state.user_id = user_id;
      state.isAuth = true;
    }
  },

  actions: {
    // Dois-je gérer la fonctionnalité de log out automatique après un certain temps?
    // Oui, je dois lire a chaque requete post la réponse pour voir s'il y a une erreur 401, et dans ce cas la, faire appel a onLogout
    onLogout(context) {
      context.state.token = "";
      context.state.user_id = 0;
      context.state.isAuth = false;
    },
  },

  modules: {
  }
})
