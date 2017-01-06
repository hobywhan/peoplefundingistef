import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
// import firebase from 'firebase'
import {fireInit} from './helpers/firebaseHelpers'
import Mainmenu from './components/Mainmenu.vue'
// import VueFroala from 'vue-froala/vue-froala.es5'
// import VueTinymce from 'vue-tinymce/src/vue-tinymce'
// import VueHtml5Editor from 'vue-html5-editor'
// import firebase from 'firebase'
// import firebaseui from 'firebaseui'
import Loader from './components/Loader.vue'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'

function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
}
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}
Vue.use(VueNotifications, options)

Vue.use(VueRouter)
// Vue.use(VueFroala)
// Vue.use(VueTinymce)
// Vue.use(VueHtml5Editor)

// fireInit()
//
// var uifirebase = new firebaseui.auth.AuthUI(firebase.auth())

export const LoadingState = new Vue()
export const AuthenticatedState = new Vue()

import routes from './routes'
export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

export const uifirebase = fireInit()

export const App = new Vue({
  router,
  components: {
    'main-menu': Mainmenu,
    'loader': Loader
  },
  data(){
    return {
      isLoading: true,
      authenticated: false
    }
  },
  template:
  '<div class="container">' +
    '<main-menu :authenticated="authenticated"></main-menu>' +
    '<loader v-show="isLoading"></loader>' +
    '<router-view :authenticated="authenticated" :isLoading="isLoading"></router-view>' +
  '</div>',
  created(){
    LoadingState.$on('toggle', (isLoading) => {
      this.isLoading = isLoading
    })
    AuthenticatedState.$on('toggle', (authenticated) => {
      this.authenticated = authenticated
    })
  },
  mounted: function() {
    miniToastr.init()
  	// LoadingState.$emit('toggle', true)
  }
}).$mount('#app')

router.beforeEach((route, redirect, next) => {
  if (route.meta.auth && !App.authenticated) {
    next('/')
  } else {
    next()
  }
  return next()
})
