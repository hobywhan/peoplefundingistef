
<template>
  <div class="main-menu">
     <ul class="nav nav-pills">
      <li role="presentation" v-for="item in arrNav" v-link-active v-if="item.auth || authenticated">
        <a v-link="{ name: item.name, exact: true }">{{ item.title}}</a>
      </li>
     </ul>
      <button  v-if="authenticated" class="btn btn-default log-btn" v-on:click="logout()">Log Out</button>
      <button  v-else class="btn btn-default log-btn" v-on:click="login()">Log In</button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  props: ['authenticated'],
  data () {
    return {
      arrNav: [{
        'title': 'Accueil',
        'id': '/',
        'name': 'home',
        'auth': true
      },
      {
        'title': 'Liste des projets',
        'id': '/projectlist',
        'name': 'listProject',
        'auth': true
      },
      {
        'title': 'Mes projets',
        'id': '/myprojects',
        'name': 'userProject',
        'auth': false
      },
      {
        'title': 'Ajouter un projet',
        'id': '/enterproject',
        'name': 'newProject',
        'auth': false
      }],
      cur: ' '
    }
  },
  methods: {
    login() {
      this.$route.router.go({path: '/login'})
    },
    logout() {
      let _this = this
      firebase.auth().signOut().then(function() {
        _this.$route.router.go({path: '/', params: { authenticated: false }})
        window.location.reload()
      }, function(error) {
        console.log(error)
      })
    }
   },
  ready: function () {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .main-menu li{
    display: inline-block;
  }
  .nav-pills{
    display: inline-block;
  }
  .main-menu{
    margin-top: 20px;
  }
  .log-btn{
    display: inline-block;
    vertical-align: top;
    margin-left: 40px;
  }

</style>
