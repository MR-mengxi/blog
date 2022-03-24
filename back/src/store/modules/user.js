import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    user: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USER: (state, payload) => {
    state.user = payload;
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(res => {
        const { data } = res;
        if (data) {
          commit('SET_USER', data);
          resolve();
        } else {
          reject(res)
        }
      }).catch(error => {
        reject(error);
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (res instanceof Error) {
          reject("登录已过期");
        } else {
          commit('SET_USER', res.data);
          resolve()
        }
      })

    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken();
      resetRouter();
      commit("RESET_STATE");
      resolve();
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

