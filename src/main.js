import Vue from 'vue'
import VueRouter from 'vue-router'
// import firebase from 'firebase'
import {fireInit} from './helpers/firebaseHelpers'
import Overview from './components/Overview.vue'
import ProjectList from './components/ProjectList.vue'
import MyProjects from './components/MyProjects.vue'
import EnterProject from './components/EnterProject.vue'
import ProjectShow from './components/ProjectShow.vue'
import Mainmenu from './components/Mainmenu.vue'
import Auth from './components/Auth.vue'
import TermsOfService from './components/TermsOfService.vue'
import VueFroala from 'vue-froala/vue-froala.es5'
import VueTinymce from 'vue-tinymce'
import VueHtml5Editor from 'vue-html5-editor'
import firebase from 'firebase'
import firebaseui from 'firebaseui'

Vue.use(VueRouter)
Vue.use(VueFroala)
Vue.use(VueTinymce)
Vue.use(VueHtml5Editor)

fireInit(fireStatus)
uifirebase = new firebaseui.auth.AuthUI(firebase.auth())

var authenticated = false
var uifirebase
// create App instance
const App = Vue.extend({
  data () {
    return {
      authenticated: authenticated,
      uifirebase: uifirebase
   }
  },
  template:
    '<div class="container">' +
      '<main-menu :authenticated="authenticated" :uifirebase="uifirebase"></main-menu>' +
      '<router-view :authenticated="authenticated" :uifirebase="uifirebase"></router-view>' + // <- nested outlet
    '</div>',
    components: {
      'main-menu': Mainmenu
    }
})
// create Router instance
var router = new VueRouter({linkActiveClass: 'active'})

// add your routes and their components
function setRouter() {
	router.map({
		 '/': {
	        component: Overview,
          name: 'home',
	        auth: false
	    },
	    '/enterproject': {
	        component: EnterProject,
          name: 'newProject',
	        auth: true
	    },
	    '/projectshow/:projectId': {
	        component: ProjectShow,
          name: 'showProject',
	        auth: true
	    },
	    '/projectlist': {
	        component: ProjectList,
          name: 'listProject',
	        auth: false
	    },
	    '/myprojects': {
	        component: MyProjects,
          name: 'userProject',
	        auth: true
	    },
	    '/login': {
	        component: Auth,
          name: 'login',
	        auth: false
	    },
	    '/terms': {
	        component: TermsOfService,
          name: 'terms',
	        auth: false
	    }
	})
}
// check if route requires authentication
router.beforeEach(function (transition) {
  if (transition.to.auth && !authenticated) {
    transition.redirect('/')
  } else {
    transition.next()
  }
})

function fireStatus(loggedIn, user) {
  if (loggedIn) {
    authenticated = true
  } else {
  	authenticated = false
  }
  // start app after we know login status
  setRouter()
  router.start(App, '#app')
}
// start authentication
