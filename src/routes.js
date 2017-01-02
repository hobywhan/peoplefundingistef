import Overview from './components/Overview.vue'
import ProjectList from './components/ProjectList.vue'
import MyProjects from './components/MyProjects.vue'
import EnterProject from './components/EnterProject.vue'
import ProjectShow from './components/ProjectShow.vue'
import MyAccount from './components/MyAccount.vue'
import Auth from './components/Auth.vue'
import TermsOfService from './components/TermsOfService.vue'

const routes = [
 {
     path: '/',
     component: Overview,
     name: 'home',
     meta: {
       auth: false
     }
 },
 {
     path: '/enterproject',
     component: EnterProject,
     name: 'newProject',
     meta: {
       auth: true
     }
 },
 {
     path: '/projectshow/:projectId',
     component: ProjectShow,
     name: 'showProject',
     meta: {
       auth: false
     }
 },
 {
     path: '/projectlist',
     component: ProjectList,
     name: 'listProject',
     meta: {
       auth: false
     }
 },
 {
     path: '/myprojects',
     component: MyProjects,
     name: 'userProject',
     meta: {
       auth: true
     }
 },
 {
     path: '/myaccount',
     component: MyAccount,
     name: 'account',
     meta: {
       auth: true
     }
 },
 {
     path: '/login',
     component: Auth,
     name: 'login',
     meta: {
       auth: false
     }
 },
 {
     path: '/terms',
     component: TermsOfService,
     name: 'terms',
     meta: {
       auth: false
     }
 }]

export default routes
