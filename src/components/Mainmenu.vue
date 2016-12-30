
<template>
  <div class="main-menu">
     <ul class="nav nav-pills">
      <router-link role="presentation" tag="li" v-for="item in arrNav" v-if="item.auth || authenticated" :to="{ name: item.name }" exact>
        <a>{{ item.title }}</a>
      </router-link>
     </ul>
      <button  v-if="authenticated" class="btn btn-default log-btn" v-on:click="logout()">Déconnexion</button>
      <button  v-else class="btn btn-default log-btn" v-on:click="login()">Connexion</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import {router, AuthenticatedState} from '../main.js'

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
      },
      {
        'title': 'Mon compte',
        'id': '/myaccount',
        'name': 'account',
        'auth': false
      }],
      cur: ' '
    }
  },
  methods: {
    login() {
      router.push({path: '/login'})
    },
    logout() {
      firebase.auth().signOut().then(function() {
        AuthenticatedState.$emit('toggle', false)
        router.push({path: '/'})
      }, function(error) {
        console.log(error)
      })
    }
   },
  mounted: function () {
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .main-menu li, .main-menu router-link{
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
