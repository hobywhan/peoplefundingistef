import Overview from './components/Overview.vue'
import ProjectList from './components/ProjectList.vue'
import MyProjects from './components/MyProjects.vue'
import EnterProject from './components/EnterProject.vue'
import EditProject from './components/EditProject.vue'
import ProjectShow from './components/ProjectShow.vue'
import MyAccount from './components/MyAccount.vue'
import EditAccount from './components/EditAccount.vue'
import Auth from './components/Auth.vue'
import TermsOfService from './components/TermsOfService.vue'
import CategoryList from './components/CategoryList.vue'
import TagList from './components/TagList.vue'
import Payment from './components/Payment.vue'

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
     path: '/editproject/:projectId',
     component: EditProject,
     name: 'editProject',
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
     path: '/editaccount',
     component: EditAccount,
     name: 'editAccount',
     meta: {
       auth: true
     }
 },
 {
     path: '/categorylist',
     component: CategoryList,
     name: 'listCategory',
     meta: {
       auth: true
     }
 },
 {
     path: '/taglist',
     component: TagList,
     name: 'listTag',
     meta: {
       auth: true
     }
 },
 {
     path: '/payment',
     component: Payment,
     name: 'payment',
     meta: {
       auth: false
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
